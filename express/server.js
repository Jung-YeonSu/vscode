const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/scrape', async (req, res) => {
  try {
    const allProducts = [];
    const totalPages = 10; // 크롤링할 총 페이지 수
    const delay = 2000; // 각 요청 사이의 지연 시간 (밀리초)

    for (let page = 1; page <= totalPages; page++) {
      await new Promise(resolve => setTimeout(resolve, delay)); // 지연 추가

      const url = `https://prod.danawa.com/list/?cate=112758&page=${page}`;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const productItems = $('.prod_item');
      const parsedProducts = parseProductData(productItems, $);
      allProducts.push(...parsedProducts);

      console.log(`Scraped page ${page}`);
    }

    res.json({ products: allProducts });
  } catch (error) {
    console.error('Error occurred while scraping:', error);
    res.status(500).send('Error occurred while scraping.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


function parseProductData(data, $) { // Accept $ as a second parameter
  const products = [];

  data.each((index, element) => {
      const product = {};
      const $element = $(element); // Create a Cheerio object for the current element

      // Extract product code (if available)
      product.productCode = $element.data('productcodeforshoppingmallad');

      // Extract category info (if available)
      product.categoryInfo = $element.find('input[type="hidden"]').val();

      // Extract main info
      const thumbLink = $element.find('.thumb_link');
      product.mainInfo = {
          image: {
              src: "https://" +  thumbLink.find('img').attr('src'),
              alt: thumbLink.find('img').attr('alt')
          },
          link: thumbLink.attr('href'),
          name: $element.find('.prod_name a').text().trim(),
          subInfo: $element.find('.prod_sub-info a').text().trim()
      };

      // Extract specifications
      product.specifications = {};
      const specBoxes = $element.find('.spec-box .spec_list');

      specBoxes.each((i, box) => {
        const specs = $(box).text().split('\n'); // Get the text and split by new lines
        specs.forEach(spec => {
          product.specifications = {
            
          }
            
        });
    });
    

      products.push(product);
  });

  return products;
}
