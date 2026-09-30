# Guires Research & Innovation Centre: Next.js website

Built with **Next.js 16 (App Router)** and React 19. Every page is pre-rendered as static HTML, so the full markup, SEO metadata and structured data are in the HTML that Google and AI crawlers receive.

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
```

## Build and deploy
```bash
npm run build
npm run start      # production server
```
Deploy to Vercel, Netlify or any Node host. For a purely static host, add `output: "export"` to `next.config.mjs` and upload the generated `out/` folder.

## Structure
| Path | What it is |
|---|---|
| `app/page.jsx` | Home (`/`) |
| `app/careers/page.jsx` | Careers (`/careers`) |
| `app/news/page.jsx` | News & Media (`/news`) |
| `app/contact/page.jsx` | Contact (`/contact`) |
| `app/layout.jsx` | Site-wide `<html>`, fonts, robots and geo tags |
| `app/sitemap.js`, `app/robots.js` | Generate `/sitemap.xml` and `/robots.txt` (AI crawlers allowed) |
| `lib/seo.js` | Titles, descriptions, keywords, canonical, Open Graph, Twitter |
| `content/*.js` | Each page's approved markup, styles and interactive behaviour |
| `content/jsonld.js` | Schema.org structured data (Organization, leaders, FAQ, news, breadcrumbs) |
| `components/StaticPage.jsx` | Renders a page: styles, markup, JSON-LD and scripts |
| `public/` | Logo, photos, business logos, facility photos, `og-image.jpg`, `llms.txt` |

## Newsroom
| URL | Page |
|---|---|
| `/news` | All news, with search and filters |
| `/news/<category>` | Category landing page: `corporate`, `life-at-guires`, `events`, `insights`, `recognition`, `partnerships`, `in-the-media` |
| `/news/<category>/<slug>` | Full article (NewsArticle + BreadcrumbList structured data, share links, related stories) |

Old `guires.com/newsroom/...` URLs are 301-redirected to the new structure via `content/redirects.json` (loaded in `next.config.mjs`).
Articles and category pages are generated into `content/newsroom.js` by `newsroom.py` in the HTML project from `news-data.js`.

## Common edits
- **News:** the story list (`GUIRES_NEWS`, newest first) is in `content/home.js` and `content/news.js`. `public/news-data.js` holds the same list for reference.
- **Leadership, businesses, facilities:** edit the `PEOPLE`, `BIZ` and `FAC` arrays in `content/home.js`.
- **Jobs:** edit the `JOBS` array in `content/careers.js`. These are example listings; replace them with real vacancies.
- **Images:** replace files in `public/`, keeping the same names.
- **Domain:** change `SITE_URL` in `lib/seo.js` if the site is not at `https://guires.com`.

## Still to connect
- The Careers and Contact forms currently prepare an email to careers@, info@, support@ or media@guires.com. Connect them to your HR system or CRM (a Next.js Route Handler or a form service) for direct submission.
- Submit `https://guires.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Optional next step
The pages are ported exactly from the approved design as pre-rendered markup plus scripts. They can be refactored step by step into React components (Header, Hero, BusinessTabs, FacilityTour, Leadership, NewsList, Forms) without changing the look.
