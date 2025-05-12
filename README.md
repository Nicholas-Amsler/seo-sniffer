# Amsler Labs Real‑Time SEO Sniffer 🔍

A lightweight, browser‑powered tool to instantly audit any page’s on‑site SEO. No accounts or rate limits—just enter a URL and get actionable insights in seconds.

[Live Demo](https://seo-sniffer.nicholas-amsler.com) • [GitHub Repo](https://github.com/Nicholas-Amsler/seo-sniffer)

---

## 🚀 Features

* **Meta Tag Analysis**: Counts total `<meta>` tags, highlights missing or empty `description`.
* **Heading Audit**: Displays H1–H6 structure, flags missing or excessive headings.
* **Image Alt Checker**: Lists images lacking `alt` attributes to improve accessibility & SEO.
* **Summary Dashboard**: At‑a‑glance metrics: meta count, description status, H1 count, missing alts.
* **Detailed Accordion**: Expandable sections for full meta lists, headings, and raw URLs.
* **Export JSON**: Download raw results for deeper analysis or integration.

## 📦 Tech Stack

* **Node.js** + **Express** – Minimal API for fetching and parsing HTML
* **Axios** – Robust HTTP client with custom headers
* **Cheerio** – Fast server‑side DOM parsing
* **Bootstrap 5** – Responsive layout and components
* **Vercel** – Zero‑config CI/CD and global edge network

## 💾 Local Setup

1. **Clone** the repo:

   ```bash
   git clone https://github.com/Nicholas-Amsler/seo-sniffer.git
   cd seo-sniffer
   ```
2. **Install** dependencies:

   ```bash
   npm install
   ```
3. **Run** locally:

   ```bash
   npm start
   ```
4. Open `http://localhost:5000` in your browser.

## ☁️ Deployment

### Vercel

1. Push commits to GitHub under `seo-sniffer`.
2. Import the repo in Vercel, select **Other** for framework.
3. Set **Root Directory** to `./`, no build command needed, start command `npm start`.
4. Add your custom domain under **Settings → Domains**.

### Custom Hosting

* **Procfile** for Heroku:

  ```Procfile
  web: node index.js
  ```
* Ensure environment variable `PORT` is honored.

## 🛠️ Customization

* **Logo & Favicon**: Place your `favicon.ico` and `logo.png` inside `public/`, then update `<link rel="icon" href="/favicon.ico">` and header `<img src="/logo.png" alt="Amsler Labs" width="40">` in `public/index.html`.
* **Brand Colors**: Adjust CSS variables in `public/index.html` under the `<style>` block:

  ```css
  :root {
    --primary: #003F5C;
    --accent:  #2C9C7A;
    --light:   #F4F6F8;
    --dark:    #3D4752;
  }
  ```

## 🤝 Contributing

Contributions welcome! Fork the repo and submit a PR. Please open an issue to discuss major changes first.

## 📄 License

Released under the MIT License. See [LICENSE](LICENSE) for details.
