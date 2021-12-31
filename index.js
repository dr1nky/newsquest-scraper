const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 8000;

const newspapers = [
  {
    title: 'Northwich Guardian',
    url: 'https://www.northwichguardian.co.uk/news/',
    base: 'https://www.northwichguardian.co.uk'
  },
  {
    title: 'Winsford and Middlewich Guardian',
    url: 'https://www.winsfordguardian.co.uk/news/',
    base: 'https://www.winsfordguardian.co.uk'
  },
  {
    title: 'Warrington Guardian',
    url: 'https://www.warringtonguardian.co.uk/news/',
    base: 'https://www.warringtonguardian.co.uk'
  }
];

const articles = [];

newspapers.forEach(newspaper => {
  axios(newspaper.url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const content = $('.nq-article-card');
    let link, text, timestamp;

    for (let i = 0; i < content.length; i++) {
      link = $(content[i]).find('a').attr('href');
      text = $(content[i]).find('.nq-article-card-headline').text();
      timestamp = $(content[i]).find('.formatTimeStampEs6').attr('data-timestamp');
      articles.push({
        text, link: newspaper.base + link, timestamp
      })
    }
  }).catch(err => console.log(err));
})

app.get('/', (req, res) => {
  res.json(articles);
})

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));