// api/sniff.js
const axios   = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  const target = req.query.url;
  if (!target) {
    return res.status(400).json({ error: 'Missing url parameter.' });
  }

  try {
    // Fetch the HTML
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

    // Parse with Cheerio
    const $ = cheerio.load(html);
    const title = $('head > title').text() || null;

    const metas = {};
    $('head meta').each((_, el) => {
      const key     = $(el).attr('name') || $(el).attr('property');
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

    // Return JSON
    res.status(200).json({ title, metas, headings, images });
  } catch (err) {
    console.error('Sniffer error:', err);
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
};
