# AUREL ESTATES

A luxury real-estate website for AUREL ESTATES, "Step Inside Extraordinary." It features a residence collection, room-by-room residence tours, a private viewing request form, and a softly animated hero.

## Setup

Requirements: Node.js 18 or newer.

```bash
npm install
npm run dev
```

Other scripts:

- `npm run build` creates a production build in `dist/`.
- `npm run preview` serves the production build locally.
- `npx tsc --noEmit -p tsconfig.app.json` runs the strict type check.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `VITE_FORM_ENDPOINT` | Optional. The URL that private viewing requests are POSTed to as JSON. |

Without `VITE_FORM_ENDPOINT`, the form runs in demo mode. It validates the inquiry, shows a clear message that nothing was sent, and offers an "Open in email app" link that pre-fills an email. The site never claims an email was sent unless the endpoint returns a successful response.

Create a `.env` file in the project root to set it:

```bash
VITE_FORM_ENDPOINT=https://your-form-service.example/inquiries
```

Restart the dev server after changing it, because Vite reads environment variables at startup.

## Project structure

- `src/data/` holds all content: `properties.ts`, `rooms.ts`, `locations.ts`, `details.ts`, and the derived `credits.ts`.
- `src/components/home/` holds the home page sections: hero, residences, philosophy, details gallery, locations, and private viewing.
- `src/components/residence/` holds the residence tour: room stage, room selector, and page layout.
- `src/components/layout/` holds the header, mobile menu, footer, and wordmark.
- `src/lib/` holds shared helpers for motion, formatting, images, navigation, and the inquiry form.
- `src/pages/` holds the three routes: home, residence, and not found.

## Images

Every image is described by an object with `src`, `alt`, `width`, `height`, `focalPoint`, and `photographer`. Components never hard-code image URLs.

Today all images are Pexels photos referenced by ID through `pexelsImage()` in `src/lib/image.ts`. Each one is served in three widths (640, 1024, and 1600) through `srcset`, and the focal point positions the crop on small screens. Credits are listed in `CREDITS.md` and in the site footer.

To use a local file instead, place it in `public/assets/` and add a helper for it in `src/lib/image.ts`. `imageUrl()` currently appends Pexels size parameters, so local files need a branch that returns the path unchanged.

## Adding a property

1. Add the cover image with `pexelsImage()` in `src/data/properties.ts`, or a new `rooms` array in `src/data/rooms.ts` for that property.
2. Append a new object to the `properties` array with a unique `slug`, name, location, region, style, price, bedrooms, bathrooms, square feet, summary, `cardImage`, and `rooms`.
3. Add a matching entry to `locations` in `src/data/locations.ts` if it should appear in the Locations section.
4. Update `CREDITS.md` with the new photographer and photo ID.

The property appears in the residences grid and at `/residence/<slug>`.

## Adding a room

Add an object to the property's `rooms` array in `src/data/rooms.ts`:

- `id` must be unique within the property and is used in `?room=` URLs.
- `title`, `description`, and `image` describe the room.
- `hotspots` is an optional list of 1 to 3 items. Each has `x` and `y` as percentages, `targetRoom` as another room `id` in the same property, and a `label`.

The Aurelia Residence has 11 rooms. Other properties have 5 to 6.

## Motion and performance

- All motion uses one easing curve and respects the system "reduce motion" setting. When it is on, the hero drift and the shader are turned off.
- The hero shader (Three.js) is loaded only when the hero is displayed, so it stays out of the main bundle. If WebGL is unavailable or fails to start, the static hero photo is shown.
- The shader pauses when the hero is off-screen or the browser tab is hidden. Its resources are released on unmount.
- The shader tuning constants are at the top of `src/components/home/HeroRippleCanvas.tsx` (displacement, ripple radius, decay, and pixel-ratio cap).
- GSAP is not used. Framer Motion covers every animation need, so an extra animation library would only add weight.

## Credits

Photography by Pexels photographers. See `CREDITS.md` for the full list and photo IDs.

All residences, locations, names, and contact details are fictional. This is a demonstration site.
