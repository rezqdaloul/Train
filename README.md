# Rezq Training — installable PWA

A single self-contained training app. All exercise photos are embedded in `index.html`,
so once it's cached it works completely offline.

## Deploy on GitHub Pages (about 3 minutes)

1. Create a new repo, e.g. `training`.
2. Upload these five files to the repo root: `index.html`, `manifest.json`, `sw.js`,
   `icon-192.png`, `icon-512.png`.
3. Settings -> Pages -> Source: *Deploy from a branch* -> Branch: `main`, folder `/ (root)` -> Save.
4. Wait a minute, then open `https://<your-username>.github.io/training/` on your phone.

HTTPS is required for service workers. GitHub Pages gives you that automatically.

## Install on your phone

- **iPhone (Safari):** Share -> Add to Home Screen. Launches full-screen, no browser bars.
- **Android (Chrome):** menu -> Install app.

## Updating

When you want changes, replace `index.html` and bump the cache name in `sw.js`
(`training-v1` -> `training-v2`) so phones pick up the new version instead of the cached one.

## Your data

Sets, sessions and measurements are stored in the browser's `localStorage` on that device.
They persist across launches, do not sync between devices, and are cleared if you clear site data.

## Credits

Exercise photographs: [Free Exercise DB](https://github.com/yuhonas/free-exercise-db) — public domain (Unlicense).

## Profiles

Each person who opens the app gets their own profile. Data is stored per device in the
browser, so a friend using your link on their phone never sees your progress. Several
people can also share one device — tap the avatar in the top right to switch.

Progress that existed before profiles were added is migrated automatically into the
owner's profile on first launch.

Nothing syncs between devices. Use **Progress → Backup** to save a file you can restore on
a new phone.
