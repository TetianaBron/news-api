const BASE_URL = 'https://news-app-tb.herokuapp.com/api';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.lang = 'en';
    this.pageSize = 5;
    this.page = 1;
  }

  fetchArticles() {
    const url = `${BASE_URL}/${this.searchQuery}&language=${this.lang}&pageSize=${this.pageSize}&page=${this.page}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ articles }) => {
        this.incrementPage();
        console.log(articles);
        return articles;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
