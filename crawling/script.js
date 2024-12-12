import axios from 'axios';

const getHtml = async () => {
  try {
    const response = await axios.get("https://prod.danawa.com/list/?cate=112758");
    
    // Create a temporary DOM element to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data, 'text/html');

    // Extract product names and prices
    const productNames = Array.from(doc.querySelectorAll('.prod_name')).map(el => el.textContent.trim());
    console.log('Product Names:', productNames);
    
    const prices = Array.from(doc.querySelectorAll('.price_sect')).map(el => el.textContent.trim());
    console.log('Prices:', prices);
    
  } catch (error) {
    console.error(error);
  }
};

getHtml();
