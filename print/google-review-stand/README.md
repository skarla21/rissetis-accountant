# Google Review Stand — Ρισσέτης Δημ.Γεώργιος

Print-ready **Compact Tap** face for a 100×150 mm desk stand (Greek).

## Files to print

- `rissetis-google-review-stand.pdf`
- `rissetis-google-review-stand.png` (~1181×1772 px @ 300 dpi)

## NFC + QR URL

Program the NFC tag (stick it on the dashed **Ακουμπήστε** / «πέρασε το NFC εδώ» circle) with the same URL as the QR:

```
https://search.google.com/local/writereview?placeid=ChIJedN8cI4Im64RY0dn1WN8sLA
```

## Rebuild

```bash
python print/google-review-stand/build_stands.py
```

Needs `qrcode[pil]`, Pillow, and Playwright Chromium.
