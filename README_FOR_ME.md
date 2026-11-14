# AXYRA website: your guide

This guide is written for you, not for a developer. You can change almost everything on the website by editing plain text files. You never need to touch the code.

---

## 1. What's in this folder

| Folder / file | What it is | Will you edit it? |
|---|---|---|
| `content/settings.yaml` | **Company-wide settings**: email, phone, address, social links, the Dr. Assistant link, which pages are visible, the form key, the domain | **Yes, often** |
| `content/pages/*.yaml` | The text of each page (Home, About, Solutions, Products, Contact, menu and footer in `common.yaml`) | **Yes** |
| `content/products/*.yaml` | **One file per product** (Dr. Assistant is `dr-assistant.yaml`) | **Yes** |
| `content/legal/*.yaml` | Privacy Policy and Terms (draft templates) | After legal review |
| `content/optional/*.yaml` | Insights/News, Careers, Partners (hidden for now) | Later |
| `content/mission-vision-options.md` | Alternative Mission & Vision wordings to choose from | Read it |
| `src/styles/tokens.css` | **Brand colours, fonts, corner roundness, logo animation speed** | Sometimes |
| `src/assets/products/` | Product screenshots (automatically optimised) | When you have new screenshots |
| `public/brand/` | Logo files | Rarely |
| `public/og/` | The pictures shown when a page is shared on WhatsApp, LinkedIn, etc. | Rarely |
| `PLACEHOLDERS.md` | The list of everything you still need to fill in | Read it |
| `brand-source/` | Untouched copies of the logo files taken from the Dr. Assistant app | Never (archive) |
| `src/` (everything else) | The code | **No** |

---

## 2. See the website on your computer

You do this once:

1. Install **Node.js** version 24 (LTS) from https://nodejs.org. Use the big "LTS" button.
2. Open this folder in a terminal:
   - **Windows:** right-click the folder, then "Open in Terminal".
   - **Mac:** right-click the folder, then Services, then "New Terminal at Folder".
3. Type `npm install` and press Enter. Wait until it finishes.

Every time you want to preview:

```
npm run dev
```

Then open **http://localhost:4321** in your browser. Keep the terminal open. Every time you save a text file, the page updates by itself. To stop, press `Ctrl + C` in the terminal.

The Arabic version is at **http://localhost:4321/ar/**.

---

## 3. How to change text

All text lives in `.yaml` files inside `content/`. Open them with any text editor. **Visual Studio Code** (free) is the most comfortable, because it colours the file and warns about mistakes.

Each page file has an `en:` block (English) and an `ar:` block (Arabic):

```yaml
en:
  hero:
    title: "We build technology that makes work simpler."
ar:
  hero:
    title: "نبني تقنية تجعل العمل أبسط."
```

### The 4 rules of YAML (these prevent 95% of mistakes)

1. **Only change the text inside the quotes** `"..."`. Leave the word before the colon (`title:`) exactly as it is.
2. **Keep the spaces at the start of each line** exactly as they are. Use spaces, never the Tab key.
3. If your text contains a double quote `"`, write it as `\"`, or use curly quotes “ ”.
4. Lists start with `- `, a dash and a space. Copy an existing item to add a new one.

**If something breaks:** the preview, or `npm run check-content`, tells you the file and line number. Most of the time it's a missing quote or a wrong number of spaces.

**Arabic fallback:** if a line is missing in the `ar:` block, the English line is used instead. This means you can add an English text first and translate later.

---

## 4. Placeholders: `[[EDIT: ...]]`

Anything you still need to supply is written like `"[[EDIT: Business email, e.g. hello@yourdomain.com]]"`.

- **Placeholders are hidden on the live site automatically.** An empty email simply doesn't appear, and an unfinished FAQ question is left out. You can publish before everything is filled in.
- In the preview (`npm run dev`), any placeholder that would show is outlined in **dashed yellow** so you can find it.
- To get a fresh list of everything left to fill in, run:

  ```
  npm run check-content
  ```

  It updates `PLACEHOLDERS.md`. If you have built the site, it also confirms that no placeholder text appears on a published page.

---

## 5. Show or hide pages and sections

- **Whole pages:** `content/settings.yaml` → `pages:`. Set `news: true` to publish Insights, for example. A hidden page disappears from the menu, the footer and the sitemap.
- **Sections on a page:** at the top of each page file there is a `sections:` list. For example, in `content/pages/home.yaml`:

  ```yaml
  sections:
    whyAxyra: false     # hides the "Why AXYRA" section
  ```

- **One business area:** `content/pages/solutions.yaml` → `areas:` → `show: false`.
- **A product:** in its file, `show: false`.
- **Arabic version:** `content/settings.yaml` → `languages:` → `arabic: false`.

---

## 6. Contact details and social media

Everything is in `content/settings.yaml` under `contact:` and `social:`. Replace the placeholder with the real value:

```yaml
contact:
  email: "hello@axyra.ps"
  phone: "+970 59 000 0000"
social:
  linkedin: "https://www.linkedin.com/company/axyra"
```

A social icon only appears once its link is filled in.

---

## 7. The contact form (5 minutes to set up)

The form uses **Web3Forms**, a free service that emails you each message. It needs no server.

1. Go to https://web3forms.com, enter the email address where you want to receive messages, and click **Create Access Key**.
2. Open that email and copy the key.
3. Paste it into `content/settings.yaml`:

   ```yaml
   contactForm:
     web3formsAccessKey: "paste-your-key-here"
   ```

4. Publish, then send yourself a test message from the live site.

**What happens before you set it up:**
- If you have filled in `contact.email`, the form opens the visitor's own email app with the message ready to send.
- If neither the key nor the email is filled in, the form says it isn't connected yet.

**Set at least one of the two before launch.**

**Spam protection** is built in: a hidden trap field that only bots fill in, plus a check that rejects forms submitted too quickly.

**Free plan limit:** about 250 messages a month. This is an estimate; sources disagree, so check https://web3forms.com/pricing.

---

## 8. Images and screenshots

**Product screenshots** go in `src/assets/products/<product>/`, for example `src/assets/products/dr-assistant/`. To replace one:

1. Save the new image (PNG or JPG, at least 1600 px wide) with **the same file name** as the old one.
2. Or use a new name, and change the file name in the product's `.yaml` under `images:`.

The website automatically converts images to modern, light formats (AVIF/WebP) at several sizes. You don't need to optimise anything.

> The current Dr. Assistant screenshots come from the **test environment, with fake data only** (no real patients), and the purple "TEST VERSION" bar is hidden in the pictures. Never use screenshots that show real patient data.

**Sharing pictures** (what WhatsApp and LinkedIn show) are in `public/og/`, at 1200 × 630 pixels. Replace them with files of the same name and size.

---

## 9. Colours, fonts and the logo

- **Colours:** `src/styles/tokens.css`. Every colour is labelled.
  - Colours marked *"from logo"* are exact values from your logo files.
  - Colours marked *"derived"* are slightly darker or lighter so that text stays readable (accessibility rules). If you change a derived text colour, check it at https://webaim.org/resources/contrastchecker/. It must score at least 4.5:1.
- **Logo animation speed:** in `tokens.css`, `--logo-speed: .65;`. `1` is the original speed; smaller is faster.
- **Logo files:** `public/brand/`. Your original vector logo is used everywhere; nothing was redrawn.
  - The header and footer use `axyra-logo-color-tight.svg` (the same artwork, cropped tighter).
  - The favicon (`public/favicon.svg`) and the X symbol (`axyra-x-mark.svg`) reuse the same ribbon artwork.
  - To change the logo, replace these files and keep the same names.
- **Fonts:** Montserrat (English) and Cairo (Arabic), from your brand kit. The Dr. Assistant wordmark uses Plus Jakarta Sans, as in the app.

---

## 10. Add a new product (no code needed)

1. Copy `content/products/dr-assistant.yaml` and rename the copy, e.g. `my-new-app.yaml`.
2. Inside, change:
   - `slug: "my-new-app"` (this becomes the address `/products/my-new-app/`)
   - `order:` (its position in the list)
   - the `externalUrl: "https://..."` line. Remove `externalUrlFromSettings`.
   - `theme:`. Delete this line to use AXYRA colours.
3. Make a folder `src/assets/products/my-new-app/` and put its icon and screenshots there. Update the `images:` names.
4. Rewrite the `en:` and `ar:` text. Set any section you don't have content for to `false` under `sections:`.

The new product then appears on the Products page, in the footer, and gets its own page automatically.

---

## 11. Mission and Vision

The site uses the wording I recommended. Three alternatives for each, in English and Arabic, are in `content/mission-vision-options.md`. To switch, copy your choice into `content/pages/about.yaml`, in both `en:` and `ar:`. It is shown on the Home page and on the About page.

---

## 12. Publish the website

Every host does the same two things: it runs `npm run build`, which creates the finished website in the `dist` folder, and it serves that folder.

### Option A: Cloudflare Pages (recommended)
Free plan, fast in the Middle East and worldwide, and the security headers in `public/_headers` work automatically.

1. Put this folder in a GitHub repository. It can be private.
2. In https://dash.cloudflare.com, go to **Workers & Pages → Create → Pages → Connect to Git** and choose the repository.
3. Settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment variable: `NODE_VERSION` = `24`
4. Click **Save and Deploy**. You get an address like `axyra-website.pages.dev`.
5. From then on, every change you push to GitHub publishes automatically.

Free-plan limits: 500 builds a month on the official limits page (Verified). Unlimited bandwidth and commercial use are stated by third-party sources; please confirm on Cloudflare's own pricing and terms pages.

### Option B: Firebase Hosting (you already use it for Dr. Assistant)
A ready `firebase.json` is included.

> ⚠ **Important:** create a **new, separate Firebase project** for the company website, for example `axyra-website`. If you run `firebase deploy` inside the Dr. Assistant project, you will **overwrite the Dr. Assistant app**.

```
npm run build
firebase use --add      (choose the NEW project)
firebase deploy --only hosting
```

The free Spark plan includes 10 GB of storage and **360 MB of data transfer per day** (Verified, Firebase pricing page). The pages are light (110–150 KB on first load), so that is roughly several hundred to a thousand visits a day (Estimate). Beyond that, you'd need the paid Blaze plan.

### Not recommended: Vercel's free plan
It forbids commercial use (Verified, Vercel's fair use guidelines).

---

## 13. Domain checklist (when you buy your domain)

1. ☐ Buy the domain. Prefer `.com`; also consider `.ps` for Palestine, through a registrar accredited by PNINA.
2. ☐ Connect it at your host:
   - **Cloudflare Pages:** your project → **Custom domains → Set up a domain**. It's easiest if the domain's DNS is managed by Cloudflare.
   - **Firebase:** Hosting → **Add custom domain**, then add the DNS records it shows you at your registrar.
3. ☐ Add both `yourdomain.com` and `www.yourdomain.com`, and redirect one to the other.
4. ☐ Wait until the padlock (HTTPS) appears. This can take a few minutes up to 24 hours.
5. ☐ In `content/settings.yaml`, set:

   ```yaml
   site:
     url: "https://www.yourdomain.com"
     allowIndexing: true
   ```

   then publish again. This switches on Google indexing, the sitemap (`/sitemap-index.xml`), correct sharing links and canonical addresses. **Until you do this, search engines are told not to index the site, on purpose.**
6. ☐ Create a business email on the domain, e.g. `hello@yourdomain.com` (Google Workspace, Zoho Mail, or Cloudflare Email Routing to forward to Gmail). Put it in `contact.email`.
7. ☐ Add the site to **Google Search Console** (https://search.google.com/search-console) and submit `https://www.yourdomain.com/sitemap-index.xml`.
8. ☐ Test sharing a page in WhatsApp to check the preview picture.
9. ☐ Send yourself a test message through the contact form.

---

## 14. Analytics (off by default)

The recommended option is **Cloudflare Web Analytics**: free, no cookies, no cookie banner needed.

1. In Cloudflare, go to **Analytics & Logs → Web Analytics → Add a site** and copy the token.
2. In `content/settings.yaml`:

   ```yaml
   analytics:
     provider: "cloudflare"
     cloudflareToken: "your-token"
   ```

If you ever add Google Analytics instead, you would legally need a cookie-consent banner in many countries. Ask a developer first.

---

## 15. Optional: an editing screen ("admin panel")

You don't need one; editing the `.yaml` files works well. If you'd prefer to edit in a web form:

| Option | Pros | Cons |
|---|---|---|
| **Keep editing files** (current) | Free, nothing to maintain, nothing can break silently | You edit text files |
| **Pages CMS** (pagescms.org) | Free, works directly with your GitHub repository, very simple | Needs a small config file and GitHub |
| **Decap CMS** | Free, open-source, popular | Login setup is fiddly outside Netlify |
| **TinaCMS** | Nice visual editing | Paid plans for teams; more setup |

**My advice:** keep editing files until the content is stable. Then, if you edit often, add **Pages CMS**. It is about an hour of setup for a developer.

---

## 16. Before you publish: quick checklist

1. ☐ `npm run check-content` shows no errors.
2. ☐ The contact form key **or** the contact email is filled in.
3. ☐ Privacy Policy and Terms reviewed by a lawyer. Then set `showDraftNotice: false` in `content/legal/*.yaml`.
4. ☐ Arabic text reviewed by a native speaker. My Arabic is careful, but a local reviewer should approve the tone.
5. ☐ Mission and Vision chosen.
6. ☐ `products.drAssistantUrl` in `settings.yaml` points to the right address.

---

## 17. Internal pages for reference

`/styleguide/` shows the colours, fonts, logo and components. It is not in the menu and is hidden from search engines.
