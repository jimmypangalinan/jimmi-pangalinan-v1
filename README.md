# Jimmi Pangalinan — DevOps Engineer Portfolio

Personal portfolio built with React 19, TanStack Start, Vite, and Tailwind CSS.
The source runs independently with standard open-source tooling.

## Run locally

Requirements:

- Node.js 22 or newer
- npm 10 or newer

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production check

```sh
npm run build
npm run preview
```

Vite prints the preview URL in the terminal. Use `Ctrl+C` to stop either server.

Before deploying, copy `.env.example` to `.env` and set `VITE_SITE_URL` to the
final HTTPS origin so social preview links point to the deployed site.

## Main files

- `src/routes/index.tsx` — page layout and section navigation
- `src/components/portfolio/` — profile card and portfolio sections
- `src/lib/portfolio-data.ts` — portfolio content and links
- `src/styles.css` — visual system and responsive layout
- `public/jimmi.png` — local profile photo

## Customize

Update personal content in `src/lib/portfolio-data.ts`. Replace
`public/jimmi.png` with another image using the same filename to change the
profile photo without touching the component code.
