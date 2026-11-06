# Earth System Science Lab — website

Source of **earthsystemscience.org**, the website of the Earth System Science
Lab (Prof. Gabriela Schaepman-Strub), Department of Evolutionary Biology and
Environmental Studies, University of Zurich.

Built with [Quarto](https://quarto.org). Every page is a plain text file;
content lists (projects, gallery) are simple text or table files that can
also be edited in R. The engine and workflow are adapted from Owen
Petchey's [Predictive Ecology Group website](https://github.com/opetchey/predictive-ecology-zurich).

## Pages

| Page         | File               | What's on it |
|--------------|--------------------|--------------|
| Home         | `index.qmd`        | Photo (arrows to switch) → "Our Research" project cards → "Our team" photo → mission |
| Research     | `research.qmd`     | All project cards; each opens a pop-up with the project text |
| Methods      | `methods.qmd`      | "From plot to planet" scale, Experiment, Observation, Modelling, Data |
| Publications | `publications.qmd` | Selected + all, by year |
| Teaching     | `teaching.qmd`     | Courses taught by the group |
| Our Mission  | `mission.qmd`      | Science, Society (with media coverage), Policy |
| Gallery      | `gallery.qmd`      | Photo grid built from `gallery/gallery.csv` |
| Contact      | `contact.qmd`      | Email, address, link to the UZH staff page |
| Imprint      | `imprint.qmd`      | Who is responsible + privacy note (footer link) |

The menu order is set in `_quarto.yml`.

## Where each kind of content lives

### Projects — `projects/`
One folder per project, named `YYYY-MM-DD-short-name/`, containing
`project.md` and one image. Each project appears as a card on Home and
Research; clicking it opens a pop-up with the title and text (the image is
shown on the card only).

```markdown
---
title: "Project name"
date: 2026-11-01
order: 3                       # position on the page (1 = first); optional
person: "Name Surname"         # stored, not shown
image: image.jpg               # leave out if there is no image
image-style: photo             # photo (fills the card) or figure (map, graph, logo: shown whole on white)
image-position: "50% 30%"      # optional: focus point of a photo on the card
image-credit: "Image: Name"    # optional: small text inside the image
image-caption: "Short description of the image."   # optional: shown when the mouse rests on the card
---

One or two paragraphs of plain text, written as a project description
("we ..."). **Bold**, *italics* and [links](https://...) work.
```

To take a finished project off the site without deleting it, add
`archive: true` to the header.

### Gallery — `gallery/gallery.csv` + `gallery/photos/`
Put the photo in `gallery/photos/` and add one row to `gallery.csv`
(edit in R with `read.csv()` / `write.csv()`, or in Excel). Columns:
`file`, `title` (may be empty), `location`, `year`, `photographer`
(may be empty). The caption becomes "title, location year © photographer".
Rows are shown in the order of the file.

### Publications — `publications.qmd`
Plain Markdown, one entry per item:

```markdown
- [Title of the paper](https://doi.org/...)
  [A. Author et al., *Journal*]{.pub-meta}
```

### Teaching — `teaching.qmd`
One list item per course: code, name, short description, level and semester.

### Methods, Mission, Contact, Imprint
Plain text in the matching `.qmd` file.

### Links
External links are shown as a small chain icon after the text:
`[[]{.bi .bi-link-45deg}](https://...){.link-sign}`

### Page photos — `assets/img/banner/`
Every page with `banner:` in its header gets a wide photo with the title
on it; `banner-credit:` adds a small credit. Change the photo by changing
that line. The photos on Home are set in `index.qmd`.

### Files to download (PDFs) — `files/`
Link them as `[text](files/name.pdf)`.

## Photo sizes
Photos are stored web-sized (about 1600–2500 px wide). Originals stay
outside this folder, in `../Website_Images/` and `../Projects/`.

## Preview on your computer
Open `ess-website.Rproj` in RStudio, then in the **Terminal** tab run:

```
quarto preview
```

A browser window opens and updates every time a file is saved. The built
site goes to `_site/` (not stored in the repository); opening
`_site/index.html` directly also works for a quick look.

## Publishing (GitHub)
Repository: `ess-lab-uzh/ess-website`. `.github/workflows/publish.yml`
builds the site with Quarto on every pull request (a check only, nothing is
published) and on every change to `main`, and publishes only `main` to
GitHub Pages (Settings → Pages → Source: GitHub Actions).

How changes are made:
- Proposed changes go on a separate branch and are opened as a pull request.
- `main` is protected by the ruleset "Protect main": changes only through a
  pull request, and only organization admins can merge or update it.
- Publishing is limited to `main` by the `github-pages` environment
  (Settings → Environments → github-pages → Deployment branches: `main`).

The custom domain (earthsystemscience.org) is set in Settings → Pages; no
`CNAME` file is needed with this setup.

## Behind the scenes (no need to edit)
- `_quarto.yml`: site settings, menu, footer.
- `assets/theme.scss`, `assets/styles.css`: colours, font, layout.
- `assets/banner.lua`: adds the page photo with the title.
- `assets/site.js`: photo arrows on Home and next/previous in project pop-ups.
- `scripts/prerender.R`: runs before every build; makes the project cards
  and pop-ups (`projects/_projects.md`) and the gallery grid
  (`gallery/_photos.md`). Base R only. Can also be run on its own in a
  terminal from this folder: `Rscript scripts/prerender.R`.

## Open items
- [ ] Publications: decide how to store and update them (YAML, Zotero/BibTeX
      export, or automatic ORCID/OpenAlex pull).
- [ ] Switch the domain to earthsystemscience.org (see the project notes on
      DNS) and then remove the temporary noindex tag in `_quarto.yml`.

## Licence
Website code: MIT (see `LICENSE`), based on Owen Petchey's site.
Photos: © the photographers named in captions. Poppins font: SIL Open Font
License (`assets/fonts/OFL-Poppins.txt`).
