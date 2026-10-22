# KAI Level 1 · Morning Study Guide

A free classmate study companion for 22 October–18 December 2026.

Public site: https://xombie2000.github.io/kai-morning-videos/

## Website

`index.html` is self-contained: no frameworks, remote fonts, analytics, accounts, ads, or runtime dependencies. It includes all 40 lessons in static HTML, so dates, assignments, and video links survive JavaScript failure. Videos open externally and may have their own ads or policies.

Search dates, Japanese grammar, or lesson numbers. Combine Upcoming, Unwatched, and Test days. Today uses Asia/Tokyo and jumps to the next class on non-class days, or the final day after the term. Reset filters does not erase watched progress. Progress is browser-local, keyed by date, and compatible with the original HTML’s storage key. Light/dark/system themes are saved separately.

The schedule is taken from the provided Downloads/index.html, not reconstructed from a calendar. `schedule-original.json` preserves that input; `schedule.json` adds selected resources and coverage notes. The 11 test markers exclude review-only days and the kanji contest. KAI teacher instructions and materials remain authoritative.

## Maintain

- Edit `schedule.json`, `scripts/style.css`, or `scripts/app.js`.
- Run `npm run build` (Python 3) to regenerate the committed `index.html`.
- Run `npm run preview` and open http://127.0.0.1:8765.
- Testing only: `npm ci` and `npx playwright install chromium webkit firefox`.
- `npm test` runs Chrome for Testing and WebKit iPhone/iPad checks against the preview server.
- `npm run test:firefox` runs the optional Firefox suite where the Playwright Firefox runtime is supported. On the authoring Mac it could not launch; installed Firefox was tested manually instead.
- `BASE_URL=https://xombie2000.github.io/kai-morning-videos/ npm test` tests the published page.
- `npm run verify:videos` refreshes YouTube metadata. Watch-page availability results from publication are recorded in `video-audit.json`.

GitHub Pages publishes the root of `main`. `.nojekyll` keeps this a static site. No build service or paid hosting is required.

See [video audit](VIDEO_AUDIT.md) and [test report](TEST_REPORT.md) for verification and limitations.
