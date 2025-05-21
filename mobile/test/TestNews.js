// testNews.js
const newsApi = require('../api/newsApi');

async function test() {
  await newsApi.getLatestNews();
  await newsApi.getCountryNews('gb');
  await newsApi.getCategoriesNews('business');
  await newsApi.searchNews('bitcoin');
}

test();
