export default function getrefs() {
  return {
    searchForm: document.querySelector('.js-search-form'),
    articlesСontainer: document.querySelector('.js-articles-container'),
    searchBtn: document.querySelector('.js-search'),
    input: document.querySelector('[name="query"]'),
  };
}
