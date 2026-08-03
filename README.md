# 99 Allahovih lijepih imena

A small offline-friendly app for learning the 99 names — browse them, read the
background, practise a slice at a time, and test yourself. Bosnian UI.

Next.js (pages router) exported to static HTML, styled with
[PaperCSS](https://getpapercss.com/) plus styled-components. Mobile is the
primary target size. No backend: the 99 names ship as JSON and your progress
lives in `localStorage`.

## Scripts

| Command             | What it does                               |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Dev server on http://localhost:3000        |
| `npm run build`     | Static export into `out/`                  |
| `npm test`          | Unit tests (`node --test`, no framework)   |
| `npm run lint`      | ESLint (flat config, `eslint-config-next`) |
| `npm run typecheck` | `tsc --noEmit`                             |
| `npm run format`    | Prettier over `src`                        |

## Deploying

`npm run build` writes a fully static `out/` — drop it on any static host. There
is no server, so a plain file server works, as long as it maps `/lista-imena`
to `lista-imena.html` (most hosts do this by default).

## Layout

```
src/
  pages/           routes; each one is a thin wrapper around a component
  Components/
    Layout.tsx     back button + per-route title, wraps every page
    Selects.tsx    the "how many / which names" dropdowns, shared by
                   nauci-imena and testiraj-se, with their localStorage state
    ranges.ts      splits 99 names into pages  (unit tested)
    learned.ts     the learned-names map, parsed once and cached
    ListaImena/    the collapsible name row, reused everywhere a name appears
    TestirajSe/    quiz flow and the answer modal
  data/names.json  the 99 names
```

## Notes for future changes

- **PaperCSS hides form controls with `display: none`.** That drops them out of
  the tab order. The collapsible toggle and the learn tick are deliberately
  clipped instead of hidden so they stay keyboard-reachable — see `srOnly` in
  `ListaImena/Components.tsx`. Don't "simplify" that back to `display: none`.
- **Headings.** PaperCSS pins `h1` at a fixed 80px, which eats two thirds of a
  phone screen. `Title.tsx` overrides it with `clamp()`.
- **The name row is shared.** `ListaImena/Components.tsx` renders the row on the
  list, the practice screen, the quiz modal and the results — `showCheckbox` and
  `isOpen` are the only knobs. Changing it affects all four.
- **Check a phone size before shipping layout changes.** 375x667 is the tight
  case; the title, the back button and the answer modal all had to be tuned for
  it. Browser devtools device mode is enough.
