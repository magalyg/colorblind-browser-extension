# ColorBlind Accessibility Filter

A browser extension that transforms webpage colors to match how colorblind individuals see the world. Supports four modes: Deuteranopia, Protanopia, Tritanopia, and Achromatopsia.

Each mode is previewed in the popup with a live color palette so users can identify their type visually — no text descriptions required.

Available for Chrome, Edge, Firefox, and Safari.

---

## Repository Structure

```
colorblind-browser-extension/
├── chrome/      — Chrome (Manifest V3)
├── edge/        — Microsoft Edge (Manifest V3)
├── firefox/     — Firefox (Manifest V3)
├── safari/      — Safari (requires Xcode conversion)
└── screenshots/ — Store listing assets
```

---

## Development

### Chrome

1. Open `chrome://extensions`
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked** and select the `chrome/` folder
4. Pin the extension from the puzzle-piece menu

After code changes, click the reload icon on the extension card.

### Edge

1. Open `edge://extensions`
2. Enable **Developer mode** (left sidebar toggle)
3. Click **Load unpacked** and select the `edge/` folder

### Firefox

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select any file inside the `firefox/` folder (e.g. `manifest.json`)

For a persistent install during development, use [web-ext](https://github.com/mozilla/web-ext):

```bash
cd firefox
npx web-ext run
```

### Safari

Safari requires converting the extension into an Xcode project first:

```bash
xcrun safari-web-extension-converter safari/ --project-location ./safari-xcode --app-name "ColorBlind Filter"
```

Open the generated Xcode project, build, and enable the extension in Safari → Settings → Extensions. Requires macOS 12+ and Xcode 14+.

---

## Publishing

### Chrome Web Store

#### 1. Package

```bash
cd chrome
zip -r ../../colorblind-chrome.zip . --exclude "*.DS_Store"
```

#### 2. Submit

- Go to [chrome.google.com/webstore/devconsole](https://chrome.google.com/webstore/devconsole)
- One-time **$5 registration fee**
- Click **New Item**, upload the ZIP, fill in the store listing
- Screenshots: upload the 5 resized PNGs from `screenshots/resized/` (1280×800, 24-bit PNG)
- Review typically takes **1–3 business days**

---

### Microsoft Edge Add-ons

Edge extensions use the same Chromium format as Chrome.

#### 1. Package

```bash
cd edge
zip -r ../../colorblind-edge.zip . --exclude "*.DS_Store"
```

#### 2. Submit

- Go to [partner.microsoft.com/dashboard](https://partner.microsoft.com/dashboard)
- Create a developer account (free)
- Click **Create new extension**, upload the ZIP
- Review typically takes **1–7 business days**

---

### Firefox Add-ons (AMO)

#### 1. Package

```bash
cd firefox
zip -r ../../colorblind-firefox.zip . --exclude "*.DS_Store"
```

Or use web-ext:

```bash
cd firefox
npx web-ext build
```

#### 2. Submit

- Go to [addons.mozilla.org/developers](https://addons.mozilla.org/developers/)
- Create an account (free)
- Click **Submit a New Add-on**, upload the ZIP
- Review for listed add-ons typically takes **1–2 weeks**; unlisted add-ons are self-distributed and approved immediately

---

### Safari App Store

Safari extensions must be distributed through the Mac App Store (and optionally the iOS App Store).

1. Convert the `safari/` folder using the Xcode command above
2. Configure your Apple Developer account in Xcode (requires **$99/year** membership)
3. Archive the app in Xcode → **Product → Archive**
4. Submit via **Xcode Organizer → Distribute App → App Store Connect**
5. Complete the App Store Connect listing and submit for review
6. Review typically takes **1–3 business days**

---

## Privacy

This extension stores only your selected color mode locally via the browser's storage API. No data is collected, transmitted, or shared with any third party.
