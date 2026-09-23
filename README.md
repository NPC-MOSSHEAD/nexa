# NEXA / SIGNAL MATTER

A premium creative-technology agency experience built with Next.js, React, TypeScript, Tailwind CSS, GSAP, Lenis, Three.js, and React Three Fiber.

## Run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Production

```bash
npm run build
npm start
```

## Creative system

The site uses one persistent WebGL "Signal Matter" object that changes state across the page instead of loading unrelated 3D scenes per section. Sections set scene states through a small React context. Heavy visual behavior degrades on low-end hardware and motion is reduced when `prefers-reduced-motion` is enabled.

## Replace demo content

- Brand name and nav: `components/Navigation.tsx`
- Project data: `content/projects.ts`
- Main homepage sections: `sections/*`
- WebGL material + geometry: `webgl/SignalField.tsx`
- Global design tokens: `app/globals.css`
