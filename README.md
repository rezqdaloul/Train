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
(for example `training-v15` -> `training-v16`) so phones pick up the new version instead of the cached one.

## Two devices

Nothing syncs automatically — a web app cannot sync without a server. Use
More -> Settings -> Backup on the device you have been using, send the file to the other device,
and Restore there.

When the profile already exists on the target device, the app offers **Merge** rather than
overwrite: completed sessions are combined, the higher step/water/sleep figure wins for a
shared day, the fuller set record wins, and the newer weigh-in wins a same-day clash. So
you can log on both devices and lose nothing.

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

Nothing syncs between devices. Use **More → Settings → Backup** to save a file you can restore on
a new phone.

## Activity

Apple Health has no web API, so no web app can read a Xiaomi band directly.
Enter them on the Daily tab -> Activity, by hand or with Band photo, which reads steps, calories and the date from a photo of the band.

A day where you only walk still counts. Hit your step goal and the day counts toward your
week, your streak and the month calendar, whether or not you trained.

Active calories are shown for reference only. They are deliberately not added to your food
target, because wrist trackers overestimate burn and the target already assumes you train.

## Weekly check-in

The calorie target starts as an estimate. Once you have at least four weigh-ins spanning
twelve days, the Progress tab fits a trend line through them, compares your measured rate
of loss against the target rate, and offers an adjustment.

Guard rails: maximum 120 kcal per adjustment, never more than 500 kcal away from the
calculated target, never below a safe intake floor, one adjustment per week, and it always
asks before changing anything.

## Sleep

Logged on the Today tab alongside steps. The weekly average appears on Progress, and the
app flags an average under 7 hours, because short sleep in a deficit shifts more of the
loss from fat to muscle.

## Daily tracker

Every day can carry a status: Trained, Trained elsewhere, Other activity (with the activity
and minutes), Rest day, or Off. Leave it alone and the app infers the day from your ticks
and steps. Tap any past day in the month calendar to correct it.

Rest and Off pause your streak rather than breaking it, and come out of the week's target,
so three sick days means "3 of 4" rather than "3 of 7". Other activity counts as an active
day, not a lifting day.

## Set logging

Each set records weight and reps, prefilled from last session. When every set hits the top
of the rep range, the app offers the next weight — 5 kg on lower body, 2.5 kg upper.

## Substitutions

Machine taken or a movement hurts: tap Swap on any main lift for two alternatives with
photos and cues. Use today, or use from now on. Swaps show a badge on the exercise row.

## Water

3 litre default goal, logged in taps on the Today tab. Deliberately excluded from the
streak and week score — it is a habit to keep, not another thing to fail at.

## Body scans

The Body tab imports the PDF report from the smart scale. Everything happens on the phone:
the app finds the three page images inside the PDF, reads about 40 values from their fixed
positions with built-in glyph templates (no OCR service, no network), reads the ticked
assessment boxes and the highlighted body type, and then cross-checks the numbers with 15
relationships the report itself obeys (water + protein + bone + fat = weight, and so on).
You review every value before it is saved. The PDF is not stored, and the name printed on
it is never read.

Tabs: Snapshot (latest vs previous or first scan), Trends (any metric, healthy range, drag
to read a point), Projection (deficit, extra cardio and strength sessions -> pace, milestone
dates and body composition on any date), Segments (muscle and fat by limb, balance, body
type, the scale's assessments).

## Security

- Content Security Policy: scripts run only if their SHA-256 hash matches; no external
  scripts, styles, fonts, frames, objects or form posts are allowed. The font is embedded,
  so the app makes no third-party requests at all.
- The app refuses to run inside another site's frame.
- Every value loaded from storage or a backup file is validated field by field before use,
  and everything shown on screen is escaped, so a tampered backup cannot inject code.
- Backups can be locked with a password: AES-256-GCM, key derived with PBKDF2-SHA-256
  (310,000 iterations). Forget the password and the backup cannot be opened.
- The service worker only caches this app's own files, never touches other sites' requests,
  and only deletes its own old caches.
- Data stays in this browser's storage on the device. On GitHub Pages every repository of
  one account shares the origin `<username>.github.io`, so any other page you publish on
  that same account could read this app's storage. Keep only trusted pages there, or give
  the app its own account or custom domain.

## Band photos

On the Daily tab, tap Band photo and take or pick a photo of the Mi Band's watch face. The
app finds the big clock digits, uses them to straighten and scale the photo, then reads the
steps, the calories and the date shown on the screen. You check the numbers before saving.
The date decides which day they go to, so a photo from yesterday fills in yesterday. If a
day already has higher numbers, the app offers to keep the higher ones. The photo is read
on the phone and not stored. It reads two watch faces: the tall face with the hours stacked over the
minutes, and the face with a 15:07-style clock and boxed steps/date/calories. Any other
face needs the numbers typed in. Blurry or angled photos are flagged so you check every value.
