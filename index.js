// index.js
const express = require('express');
const axios   = require('axios');
const cheerio = require('cheerio');
const cors    = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/sniff', async (req, res) => {
  const target = req.query.url;
  if (!target) {
    return res.status(400).json({ error: 'Missing url parameter.' });
  }

  try {
    const { data: html } = await axios.get(target, {
      timeout: 10000,
      headers: {
        'User-Agent': [
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'AppleWebKit/537.36 (KHTML, like Gecko)',
          'Chrome/114.0.0.0 Safari/537.36'
        ].join(' '),
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });

    const $ = cheerio.load(html);
    const title = $('head > title').text() || null;

    const metas = {};
    $('head meta').each((_, el) => {
      const key = $(el).attr('name') || $(el).attr('property');
      const content = $(el).attr('content');
      if (key && content) metas[key] = content;
    });

    const headings = {};
    ['h1','h2','h3','h4','h5','h6'].forEach(tag => {
      headings[tag] = $(tag).map((_, el) => $(el).text().trim()).get();
    });

    const images = $('img').map((_, el) => ({
      src: $(el).attr('src'),
      alt: $(el).attr('alt') || ''
    })).get();

    res.json({ title, metas, headings, images });
  } catch (err) {
    console.error('🕵️‍♂️ Sniffer error:', err.message || err);
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

// Force the Sniffer onto port 5000 (no fallback)
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 SEO Sniffer running on http://localhost:${PORT}`)
);
