# Verification — 22 October 2026

## Automated local tests

30/30 passed: 10 cases each in Chrome for Testing 156, WebKit 27.2 at iPhone 13 size (390×664 CSS viewport in the Playwright device preset), and WebKit at iPad (gen 7) size (810×1080). Viewport details are defined by the installed Playwright presets in `playwright.config.js`.

- Exactly 40 unique dates in chronological order; every date and assignment matches the input snapshot.
- Exactly 11 test days; November 12 review and November 20 kanji contest excluded.
- Search: ISO and numeric dates, month names, Japanese grammar, lesson numbers, full-width text, no-results state, and reset.
- JST Today tested while the browser uses America/Los_Angeles, including midnight differences, weekends, before the term, and after the term.
- Upcoming, Unwatched, Test days, combined filters, and clearing filters via Today.
- Watched state saved through reload; unchecking also persists; Reset preserves progress.
- System/light/dark themes and saved theme preference.
- All 40 cards and video links visible with JavaScript disabled.
- Malformed or denied browser storage does not break search or checkboxes; a storage warning appears.
- No horizontal overflow at the tested sizes; primary controls and video buttons have at least 44px touch height.
- No page JavaScript errors or third-party requests during page use.
- A video button opens the correct URL in a new tab. This interaction test intercepts the destination; independent video metadata and player-status checks cover actual URL availability.

Screenshots of iPhone light and iPad dark layouts were inspected. No clipping was observed.

## Firefox

Installed Firefox was tested manually on the Mac: page load, lesson-number and Japanese search, Today, Reset, test filter (11), unwatched filter (39 after checking one day), watched progress surviving reload, Upcoming, dark theme, and a real video button opening YouTube in a new tab. Test progress was cleared afterward.

Playwright’s Firefox runtime failed to launch due to a profile/macOS sandbox error, before site code ran; its automated tests did not pass. The optional Firefox projects remain available for another environment.

## Limits

WebKit device emulation is not a physical iPhone/iPad test. Safari’s WebDriver requires “Allow remote automation,” which was disabled. After the user requested Firefox, direct checks used Firefox instead; actual Safari was not tested.

All 36 unique selected video URLs returned matching YouTube metadata and `OK` watch-page player status. Videos were not watched end to end. See VIDEO_AUDIT.md for partial topic matches, especially November 27 and November 30.
