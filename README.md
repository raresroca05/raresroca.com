# raresroca.com

My personal site: my story, what I do, my portfolio and how to reach me.
Plain HTML, CSS and a little JavaScript. No build step. Hosted on GitHub Pages.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole site, one page |
| `styles.css` | The look, light and dark |
| `main.js` | Theme switch, phone menu, copy email, fade-in on scroll |
| `404.html` | The "page not found" page GitHub Pages shows |
| `CNAME` | Tells GitHub Pages the site lives at raresroca.com |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |
| `rares-roca-cv.pdf` | The CV behind the "Download CV" buttons |
| `og-image.png` | The picture LinkedIn, Slack and X show when the link is shared |
| `favicon.svg`, `apple-touch-icon.png` | Browser tab and phone home-screen icons |
| `robots.txt`, `sitemap.xml` | Help Google find the page |

## See it on my machine

```bash
python3 -m http.server 4321
```

Then open http://localhost:4321.

## Put it on GitHub Pages

1. Create a public repo on GitHub, for example `raresroca05/raresroca.com`.
2. Push this folder to its `main` branch.
3. In the repo: Settings → Pages → Build and deployment → Source: "Deploy from a branch",
   Branch: `main`, folder `/ (root)`. Save.
4. Same page, Custom domain: `raresroca.com`. Save. (The `CNAME` file already says this.)

## Point the domain at GitHub

At the place where raresroca.com is registered, set these DNS records:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |
| CNAME | www | raresroca05.github.io |

Remove any other A or AAAA records on `@` first. DNS can take up to a day.
When the check in Settings → Pages turns green, tick "Enforce HTTPS".

Optional, to stop anyone else claiming the domain on GitHub: GitHub profile → Settings →
Pages → Add a domain → `raresroca.com`, then add the TXT record it shows.

## Change something

- Text: edit `index.html`.
- A new CV: replace `rares-roca-cv.pdf` with a file of the same name.
- Colours: the variables at the top of `styles.css`.
