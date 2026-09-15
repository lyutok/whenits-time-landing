# WhenItsTime

A day-to-night landing page for WhenItsTime, an iOS app that helps people find the right moment to connect across time zones.

The page presents the app through a cinematic scroll story, moving from morning to night while showcasing real WhenItsTime screenshots.

## Tech stack

- React 19
- TanStack Start and TanStack Router
- Vite
- Tailwind CSS v4
- TypeScript
- Lucide React

## Development

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Create a production build:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

Run lint checks:

```sh
npm run lint
```

## Project structure

- `src/routes/index.tsx` contains the landing page sections and content.
- `src/styles.css` contains the visual system, responsive layout, and animations.
- `src/assets/` contains the app icon and real app screenshots used on the page.
- `src/routes/app.tsx` contains the interactive app experience linked from the landing page.

## App Store link

The App Store URL is defined once as `APP_STORE_URL` in `src/routes/index.tsx`. Replace it with the published WhenItsTime listing when available.
