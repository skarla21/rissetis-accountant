#!/usr/bin/env python3
"""Build Compact Tap Google review stand (PDF + PNG) for Ρισσέτης."""

from __future__ import annotations

import base64
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PROJECT = ROOT.parent.parent
REVIEW_URL = (
    "https://search.google.com/local/writereview?placeid=ChIJedN8cI4Im64RY0dn1WN8sLA"
)
QR_PATH = ROOT / "qr-review.png"
LOGO_PATH = PROJECT / "public" / "assets" / "imgs" / "RissetisOnlyLogoSocialTransp.png"

# Slightly inset viewBox so the G stroke isn't clipped by SVG edge rounding
GOOGLE_G_SVG = """
<svg class="google-g" viewBox="-1 -1 50 50" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" overflow="visible">
  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
</svg>
""".strip()

STARS_SVG = """
<svg class="stars" viewBox="0 0 140 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g fill="#F4B400">
    <path transform="translate(2,1)" d="M12 1.5l2.9 6.1 6.7.7-5 4.7 1.4 6.6L12 16.7 5.9 19.6l1.4-6.6-5-4.7 6.7-.7z"/>
    <path transform="translate(30,1)" d="M12 1.5l2.9 6.1 6.7.7-5 4.7 1.4 6.6L12 16.7 5.9 19.6l1.4-6.6-5-4.7 6.7-.7z"/>
    <path transform="translate(58,1)" d="M12 1.5l2.9 6.1 6.7.7-5 4.7 1.4 6.6L12 16.7 5.9 19.6l1.4-6.6-5-4.7 6.7-.7z"/>
    <path transform="translate(86,1)" d="M12 1.5l2.9 6.1 6.7.7-5 4.7 1.4 6.6L12 16.7 5.9 19.6l1.4-6.6-5-4.7 6.7-.7z"/>
    <path transform="translate(114,1)" d="M12 1.5l2.9 6.1 6.7.7-5 4.7 1.4 6.6L12 16.7 5.9 19.6l1.4-6.6-5-4.7 6.7-.7z"/>
  </g>
</svg>
""".strip()

TAP_ICON = """
<svg class="action-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="22" y="10" width="20" height="36" rx="3" fill="none" stroke="#222" stroke-width="2"/>
  <rect x="26" y="16" width="12" height="20" rx="1" fill="#222" opacity="0.08"/>
  <text x="32" y="29" text-anchor="middle" font-size="7" font-family="Arial,sans-serif" fill="#222" font-weight="700">NFC</text>
  <path d="M44 22c3 2.2 5 5.5 5 9.2s-2 7-5 9.2" fill="none" stroke="#222" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M48.5 18.5c4.2 3 7 7.4 7 12.7s-2.8 9.7-7 12.7" fill="none" stroke="#222" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M18 40c-2 4-1 8 3 10" fill="none" stroke="#222" stroke-width="1.8" stroke-linecap="round"/>
  <circle cx="16" cy="52" r="3.5" fill="none" stroke="#222" stroke-width="1.8"/>
</svg>
""".strip()

SCAN_ICON = """
<svg class="action-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="18" y="8" width="22" height="38" rx="3" fill="none" stroke="#222" stroke-width="2"/>
  <rect x="22" y="14" width="14" height="18" fill="none" stroke="#222" stroke-width="1.4"/>
  <path d="M24 18h4M24 22h6M24 26h3" stroke="#222" stroke-width="1.2"/>
  <path d="M40 42l8 6" stroke="#222" stroke-width="1.8" stroke-linecap="round"/>
  <rect x="44" y="44" width="12" height="12" fill="none" stroke="#222" stroke-width="1.6"/>
  <path d="M46 48h3v3h-3zM51 48h3v3h-3zM46 53h3v3h-3zM51 53h3v3h-3z" fill="#222"/>
</svg>
""".strip()

CSS = """
@page { size: 100mm 150mm; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body {
  width: 100mm;
  height: 150mm;
  overflow: hidden;
  background: #fff;
  font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  color: #1a1a1a;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.stand {
  width: 100mm;
  height: 150mm;
  padding: 5mm 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: #fff;
  overflow: hidden;
}
.stand-inner {
  width: 100%;
  padding: 0 7mm;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 auto;
  min-height: 0;
}
.top-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 0 0 auto;
  justify-content: flex-start;
  padding-top: 1mm;
}
.stand-inner .footer-spacer {
  flex: 1 1 auto;
  min-height: 2mm;
}
.firm-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4mm;
  margin-bottom: 3mm;
  width: 100%;
  flex-shrink: 0;
}
.firm-logo {
  width: 12mm;
  height: 12mm;
  display: block;
  object-fit: contain;
}
.firm-name {
  text-align: center;
  font-size: 3.4mm;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1A6FB5;
  line-height: 1.15;
}
.firm-tagline {
  text-align: center;
  font-size: 2mm;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #4AA8B5;
  line-height: 1;
  margin-top: -0.2mm;
}
.brand-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 3.5mm;
}
.headline {
  text-align: center;
  font-size: 4.6mm;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: 3mm;
  width: 100%;
}
.google-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2.5mm;
  flex-shrink: 0;
  overflow: visible;
  padding: 0.8mm 0;
}
.google-g {
  width: 11mm;
  height: 11mm;
  display: block;
  flex-shrink: 0;
  overflow: visible;
}
.stars { width: 30mm; height: 5.2mm; display: block; flex-shrink: 0; }
.qr-wrap {
  position: relative;
  width: 50mm;
  height: 50mm;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}
.qr-wrap img { width: 42mm; height: 42mm; display: block; }
.corner {
  position: absolute;
  width: 7mm;
  height: 7mm;
  border: 2.2px solid #111;
}
.corner.tl { top: 0; left: 0; border-right: none; border-bottom: none; }
.corner.tr { top: 0; right: 0; border-left: none; border-bottom: none; }
.corner.bl { bottom: 0; left: 0; border-right: none; border-top: none; }
.corner.br { bottom: 0; right: 0; border-left: none; border-top: none; }
.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6mm;
  width: 100%;
  padding: 4mm 0 5mm;
  flex: 0 0 auto;
}
.action {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 32mm;
  text-align: center;
  position: relative;
}
.or {
  align-self: center;
  font-size: 3.6mm;
  color: #555;
  padding-top: 0;
}
.nfc-mark {
  width: 26mm;
  height: 26mm;
  border-radius: 50%;
  border: 1.8px dashed #4285F4;
  background: rgba(66,133,244,0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.action-hint {
  margin-top: 1.8mm;
  white-space: nowrap;
  font-size: 2mm;
  color: #4285F4;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1;
}
.scan-mark {
  width: 26mm;
  height: 26mm;
  display: flex;
  align-items: center;
  justify-content: center;
}
.action-icon { width: 16mm; height: 16mm; }
.footer-stripe {
  width: 100%;
  height: 4mm;
  display: flex;
  flex: 0 0 auto;
  margin-top: auto;
  align-self: stretch;
}
.footer-stripe span { flex: 1; }
.footer-stripe .b { background: #4285F4; }
.footer-stripe .g { background: #34A853; }
.footer-stripe .y { background: #FBBC05; }
.footer-stripe .r { background: #EA4335; }
"""


def data_uri(path: Path) -> str:
    data = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:image/png;base64,{data}"


def document(qr_uri: str, logo_uri: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="el">
<head>
  <meta charset="utf-8" />
  <title>Ρισσέτης — Google Review Stand</title>
  <style>{CSS}</style>
</head>
<body>
<div class="stand">
  <div class="stand-inner">
    <div class="top-block">
      <div class="firm-brand">
        <img class="firm-logo" src="{logo_uri}" alt="Ρισσέτης" />
        <div class="firm-name">Ρισσέτης Γεώργιος</div>
        <div class="firm-tagline">Φοροτεχνικές Υπηρεσίες</div>
      </div>
      <h1 class="headline">Πείτε μας τη γνώμη σας</h1>
      <div class="brand-stack">
        <div class="google-row">
          {GOOGLE_G_SVG}
          {STARS_SVG}
        </div>
        <div class="qr-wrap" aria-label="QR code">
          <span class="corner tl"></span>
          <span class="corner tr"></span>
          <span class="corner bl"></span>
          <span class="corner br"></span>
          <img src="{qr_uri}" alt="QR Google review" />
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="action tap">
        <div class="nfc-mark">{TAP_ICON}</div>
        <div class="action-hint">πέρασε το NFC εδώ</div>
      </div>
      <div class="or">ή</div>
      <div class="action scan">
        <div class="scan-mark">{SCAN_ICON}</div>
        <div class="action-hint">σκάναρε</div>
      </div>
    </div>
    <div class="footer-spacer" aria-hidden="true"></div>
  </div>
  <div class="footer-stripe" aria-hidden="true">
    <span class="b"></span><span class="g"></span><span class="y"></span><span class="r"></span>
  </div>
</div>
</body>
</html>
"""


def ensure_qr() -> None:
    if QR_PATH.exists():
        return
    import qrcode

    qr = qrcode.QRCode(
        error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=12, border=2
    )
    qr.add_data(REVIEW_URL)
    qr.make(fit=True)
    qr.make_image(fill_color="black", back_color="white").save(QR_PATH)


def export(html_path: Path) -> None:
    from playwright.sync_api import sync_playwright
    from PIL import Image

    css_w = round(100 * 96 / 25.4)
    css_h = round(150 * 96 / 25.4)
    scale = 300 / 96
    pdf_path = ROOT / "rissetis-google-review-stand.pdf"
    png_path = ROOT / "rissetis-google-review-stand.png"

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(
            viewport={"width": css_w, "height": css_h},
            device_scale_factor=scale,
        )
        page.goto(html_path.resolve().as_uri(), wait_until="networkidle")
        page.pdf(
            path=str(pdf_path),
            width="100mm",
            height="150mm",
            print_background=True,
            margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
        )
        page.locator(".stand").screenshot(path=str(png_path), type="png")
        browser.close()

    img = Image.open(png_path).convert("RGB")
    target = (1181, 1772)
    if img.size != target:
        img = img.resize(target, Image.Resampling.LANCZOS)
        img.save(png_path, "PNG")
    print(f"wrote {pdf_path.name}, {png_path.name} {img.size}")


def main() -> None:
    ensure_qr()
    if not LOGO_PATH.exists():
        raise SystemExit(f"Missing logo: {LOGO_PATH}")
    html_path = ROOT / "rissetis-google-review-stand.html"
    html_path.write_text(
        document(data_uri(QR_PATH), data_uri(LOGO_PATH)),
        encoding="utf-8",
    )
    export(html_path)


if __name__ == "__main__":
    main()
