import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { imageUrl } from '@/lib/image';

const RIPPLE = {
  maxDisplacement: 0.01,
  rippleRadius: 0.12,
  decaySeconds: 3,
  rippleSpeed: 0.16,
  rippleSlots: 8,
  pointerLerp: 0.14,
  chromaticAberration: 0.0012,
  maxPixelRatio: 1.5,
  moveSpawnIntervalMs: 180,
  moveStrength: 0.35,
  clickStrength: 0.8,
  autoRippleIntervalMs: 7000,
  textureWidth: 1600,
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform float uImageAspect;
  uniform float uTime;
  uniform vec4 uRipples[${RIPPLE.rippleSlots}];
  uniform float uAmplitude;
  uniform float uRadius;
  uniform float uDecay;
  uniform float uSpeed;
  uniform float uAberration;
  varying vec2 vUv;

  vec2 coverUv(vec2 uv) {
    float screenAspect = uResolution.x / uResolution.y;
    vec2 scale = screenAspect > uImageAspect
      ? vec2(1.0, uImageAspect / screenAspect)
      : vec2(screenAspect / uImageAspect, 1.0);
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2 displacement = vec2(0.0);

    for (int i = 0; i < ${RIPPLE.rippleSlots}; i++) {
      vec4 ripple = uRipples[i];
      float age = uTime - ripple.z;
      if (ripple.w <= 0.0 || age < 0.0 || age > uDecay) continue;
      vec2 delta = (vUv - ripple.xy) * vec2(aspect, 1.0);
      float dist = length(delta);
      vec2 dir = delta / max(dist, 0.0001);
      float ring = (dist - uSpeed * age) / uRadius;
      float envelope = exp(-ring * ring * 2.0) * (1.0 - smoothstep(0.0, uDecay, age));
      displacement += dir * sin(ring * 6.2831853) * envelope * ripple.w;
    }

    vec2 glass = vec2(
      sin(vUv.y * 180.0 + sin(vUv.x * 90.0)),
      cos(vUv.x * 150.0 + vUv.y * 60.0)
    ) * 0.012;

    vec2 offset = (displacement + glass) * uAmplitude;
    vec2 spread = offset * uAberration * 40.0;
    float r = texture2D(uTexture, coverUv(vUv + offset + spread)).r;
    float g = texture2D(uTexture, coverUv(vUv + offset)).g;
    float b = texture2D(uTexture, coverUv(vUv + offset - spread)).b;
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

interface HeroRippleCanvasProps {
  src: string;
  onReady: () => void;
  className?: string;
}

export default function HeroRippleCanvas({ src, onReady, className }: HeroRippleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'low-power' });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const ripples = Array.from({ length: RIPPLE.rippleSlots }, () => new THREE.Vector4(0, 0, -100, 0));
    const uniforms = {
      uTexture: { value: null as THREE.Texture | null },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uImageAspect: { value: 1.5 },
      uTime: { value: 0 },
      uRipples: { value: ripples },
      uAmplitude: { value: RIPPLE.maxDisplacement },
      uRadius: { value: RIPPLE.rippleRadius },
      uDecay: { value: RIPPLE.decaySeconds },
      uSpeed: { value: RIPPLE.rippleSpeed },
      uAberration: { value: RIPPLE.chromaticAberration },
    };
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    scene.add(new THREE.Mesh(geometry, material));

    const start = performance.now();
    const pointerTarget = new THREE.Vector2(0.5, 0.5);
    const pointerSmoothed = new THREE.Vector2(0.5, 0.5);
    let pointerMoved = false;
    let lastMoveSpawn = 0;
    let nextSlot = 0;
    let frameId = 0;
    let inView = true;
    let texture: THREE.Texture | null = null;
    let disposed = false;

    const elapsed = () => (performance.now() - start) / 1000;

    const spawn = (x: number, y: number, strength: number) => {
      ripples[nextSlot].set(x, y, elapsed(), strength);
      nextSlot = (nextSlot + 1) % RIPPLE.rippleSlots;
    };

    const toUv = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return new THREE.Vector2(
        (event.clientX - rect.left) / rect.width,
        1 - (event.clientY - rect.top) / rect.height,
      );
    };

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, RIPPLE.maxPixelRatio));
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
    };

    const shouldRun = () => inView && !document.hidden && texture !== null && !disposed;

    const frame = () => {
      frameId = 0;
      if (!shouldRun()) return;
      pointerSmoothed.lerp(pointerTarget, RIPPLE.pointerLerp);
      if (pointerMoved && performance.now() - lastMoveSpawn > RIPPLE.moveSpawnIntervalMs) {
        spawn(pointerSmoothed.x, pointerSmoothed.y, RIPPLE.moveStrength);
        lastMoveSpawn = performance.now();
        pointerMoved = false;
      }
      uniforms.uTime.value = elapsed();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(frame);
    };

    const requestFrame = () => {
      if (!frameId && shouldRun()) frameId = requestAnimationFrame(frame);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerTarget.copy(toUv(event));
      pointerMoved = true;
      requestFrame();
    };

    const onPointerDown = (event: PointerEvent) => {
      const point = toUv(event);
      spawn(point.x, point.y, RIPPLE.clickStrength);
      requestFrame();
    };

    const autoTimer = window.matchMedia('(pointer: coarse)').matches
      ? window.setInterval(() => {
          spawn(0.3 + Math.random() * 0.4, 0.35 + Math.random() * 0.3, 0.6);
          requestFrame();
        }, RIPPLE.autoRippleIntervalMs)
      : undefined;

    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      requestFrame();
    });
    intersection.observe(canvas);

    const onVisibilityChange = () => requestFrame();
    document.addEventListener('visibilitychange', onVisibilityChange);

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(canvas);

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerdown', onPointerDown);

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    loader.load(imageUrl(src, RIPPLE.textureWidth), (loaded) => {
      if (disposed) {
        loaded.dispose();
        return;
      }
      loaded.colorSpace = THREE.SRGBColorSpace;
      texture = loaded;
      uniforms.uTexture.value = loaded;
      const image = loaded.image as HTMLImageElement;
      if (image.width && image.height) uniforms.uImageAspect.value = image.width / image.height;
      resize();
      frame();
      onReadyRef.current();
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      if (autoTimer !== undefined) window.clearInterval(autoTimer);
      intersection.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerdown', onPointerDown);
      texture?.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [src]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
