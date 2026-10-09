# Living Canopy 🌳

> A cut tree pays once. A living tree pays every month.

An Expo (React Native + TypeScript) prototype where people subscribe to adopt a real Amazon tree. Local communities
harvest from it and send finished products every month, and they only earn while the tree stays standing.

Mock data only, no backend. Runs in **Expo Go** (Expo SDK 57).

## Run it

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS).

## Screens

| Route | Screen |
| --- | --- |
| `/` (tab) | **Home**: hero, how it works, Adopt / My Trees buttons |
| `/adopt` (tab) | **Choose a Tree**: tree cards with price, community and all products |
| `/subscribe/[id]` | **Subscription details**: what's included, açaí-seed packaging, money split, name your tree, terms checkbox, Subscribe |
| `/terms` | **Terms of Agreement** (modal) |
| `/my-trees` (tab) | **My Trees**: adopted trees with inline rename and alive status |
| `/tree/[id]` | **Tree detail**: satellite map with pulsing marker, age/height/carbon, sensor alerts, rename |

## Project layout

```
src/
  app/                Expo Router routes
    (tabs)/           Bottom tabs: Home, Adopt, My Trees
    subscribe/[id].tsx
    tree/[id].tsx
    terms.tsx
  components/         UI pieces (cards, buttons, map, pulsing dot, editable name)
  context/            In-memory adopted-trees state (resets on reload)
  data/trees.ts       Tree types, mock adopted trees, sensor alerts, money split
  theme/              Colours, radii, spacing
```

The satellite map uses `react-native-maps` with `mapType="satellite"`, which is bundled in Expo Go. On web a placeholder
is shown instead (`TreeMap.web.tsx`), because `react-native-maps` has no web support.

## Checks

```bash
npm run typecheck
```
