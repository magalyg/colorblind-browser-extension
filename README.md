# ColorBlind Accessibility Filter

A Chrome extension that transforms webpage colors to match how colorblind individuals see the world. Supports four modes: Deuteranopia, Protanopia, Tritanopia, and Achromatopsia.

Each mode is previewed in the popup with a live color palette so users can identify their type visually — no text descriptions required.

---

## Development

### Load in Chrome (developer mode)

1. Open `chrome://extensions`
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked** and select this folder
4. Pin the extension from the puzzle-piece menu in the toolbar

After making code changes, click the reload icon on the extension card in `chrome://extensions`.

---

## Publishing to the Chrome Web Store

### 1. Create the ZIP

Run this from the root of the repository:

```bash
zip -r ../colorblind-extension.zip . --exclude "*.git*" --exclude ".claude/*" --exclude "screenshots/*"
```

The ZIP will be created one level up as `colorblind-extension.zip`. The screenshots folder is excluded from the extension bundle — they are only needed for the store listing.

### 2. Create a Developer Account

- Go to [chrome.google.com/webstore/devconsole](https://chrome.google.com/webstore/devconsole)
- Sign in with a Google account
- Pay the one-time **$5 registration fee**

### 3. Upload the Extension

1. Click **New Item** in the developer console
2. Upload `colorblind-extension.zip`
3. Fill in the store listing:
   - **Name**: ColorBlind Accessibility Filter
   - **Category**: Accessibility
   - **Short description** (132 char max):
     ```
     Instantly adapt any webpage's colors for Deuteranopia, Protanopia, Tritanopia, and Achromatopsia with one click.
     ```
   - **Screenshots**: upload the 5 resized PNGs from `screenshots/resized/` — all are exactly 1280×800, 24-bit PNG, no alpha
   - **Promotional tile**: 440×280px image — suggested tagline: *See the web your way.*
4. Set **Visibility** to Public
5. Click **Submit for Review**

### 4. Wait for Review

Google typically approves within **1–3 business days**. You'll receive an email when the extension is live.

---

## Privacy

This extension stores only your selected color mode locally via `chrome.storage.sync`. No data is collected, transmitted, or shared with any third party.
