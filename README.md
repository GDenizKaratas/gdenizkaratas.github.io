# gdenizkaratas.github.io

My personal site: who I am, what I build, what I write and read.

Live at **https://gdenizkaratas.github.io**

## Stack

Angular 22 (standalone components, signals), plain CSS, no UI library. Hosted on GitHub Pages.

## Editing content

Everything on the page comes from one file:

```
src/app/content.ts   profile, projects, experience, writing, books
public/images/       photo, project thumbnails, logos, book covers
public/cv/           the CV the "See my CV" button opens
```

To add a project, add an entry to `projects` and drop its thumbnail (184×115, or larger at the same ratio) in `public/images/projects/`. A project with no links shows a "Private repo" label.

## Running locally

```bash
pnpm install
pnpm start          # http://localhost:4200
pnpm exec ng build  # output in dist/gdk-portfolio/browser
```

## Deploying

Every push to `main` builds and publishes the site through `.github/workflows/deploy.yml`.
