# JP's Mobile Detailing — Photo Asset Guide

Drop your photos into this folder (`assets/`), name them exactly as listed below,
then run `bash deploy.sh` from the project root. The site will automatically display them.

---

## Hero / Homepage

| Filename              | Where it shows          | Ideal size    |
|-----------------------|-------------------------|---------------|
| `hero-car.jpg`        | Homepage hero background| 1920 x 1080   |

To activate: open `index.html` and find the hero section.
Add this inside `.hero-content` above the h1, or as a background:
```html
<img src="assets/hero-car.jpg" alt="Mobile detailing Commerce Township MI" loading="eager" />
```

---

## Gallery Page (`gallery.html`)

Replace each `<div class="gallery-placeholder ...">` block with an `<img>` tag.

### Signature Package
| Filename                      | Placeholder label         |
|-------------------------------|---------------------------|
| `sig-before.jpg`              | Signature Package · Before|
| `sig-after.jpg`               | Signature Package · After |
| `sig-paint-closeup.jpg`       | Paint · Close-Up          |
| `sig-interior-after.jpg`      | Interior · After          |

### Ceramic Coating
| Filename                      | Placeholder label         |
|-------------------------------|---------------------------|
| `ceramic-precorrection.jpg`   | Ceramic · Pre-Correction  |
| `ceramic-finished.jpg`        | Ceramic · Finished Result |
| `ceramic-water-beading.jpg`   | Hydrophobic Water Beading |
| `ceramic-wheels.jpg`          | Wheel Coating             |

### Interior Restorations
| Filename                      | Placeholder label         |
|-------------------------------|---------------------------|
| `interior-before.jpg`         | Interior · Before         |
| `interior-after.jpg`          | Interior · After          |
| `interior-leather.jpg`        | Leather Conditioning      |

### Exterior Details
| Filename                      | Placeholder label         |
|-------------------------------|---------------------------|
| `exterior-full-after.jpg`     | Full Exterior · After     |
| `exterior-wheels.jpg`         | Wheel Detail              |
| `exterior-headlights.jpg`     | Headlight Restoration     |
| `exterior-polish.jpg`         | Exterior Hand Polish      |

### How to swap a placeholder (example):
```html
<!-- BEFORE (remove this entire div): -->
<div class="gallery-placeholder ph-1">
  <span class="gallery-placeholder-icon">📷</span>
  <span>Signature Package · Before</span>
</div>

<!-- AFTER (paste this in its place): -->
<img src="assets/sig-before.jpg"
     alt="Before Signature Package detail — Commerce Township MI"
     loading="lazy" />
```

---

## About Page (`about.html`)

| Filename              | Where it shows       | Ideal size  |
|-----------------------|----------------------|-------------|
| `jp-portrait.jpg`     | Story section        | 600 x 800   |
| `jp-detailing.jpg`    | Philosophy section   | 800 x 600   |
| `jp-painting.jpg`     | Philosophy pillar    | 600 x 600   |

---

## Photo Tips
- **Format:** JPG for photos, PNG only for logos/graphics with transparency.
- **Quality:** Export at 80–85% quality. Keeps file size under 300 KB per image.
- **Landscape 4:3** photos fill gallery tiles perfectly (e.g. 1200 x 900 px).
- **After adding photos**, always run: `bash deploy.sh`
