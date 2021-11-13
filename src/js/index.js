import '../sass/main.scss';
import articleCardTpl from '../tmps/article.hbs';
import NewsApiService from './api-service';
import getRefs from './get-refs';
import LoadMoreBtn from './components/load-more-btn';

const refs = getRefs();

const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.query.value.trim();

  if (newsApiService.query === '') {
    return alert('Введите, пожалуйста, запрос.');
  }
  loadMoreBtn.show();
  newsApiService.resetPage();
  clearArticleContainer();
  fetchArticles();
}

function fetchArticles() {
  loadMoreBtn.disable();
  newsApiService
    .fetchArticles()
    .then(articles => {
      if (articles.length === 0) {
        loadMoreBtn.hide();
        alert('Упс, мы не нашли такой статьи!');
      } else {
        appendArticlesMarkup(articles);
        loadMoreBtn.enable();
      }
    })
    .catch(error => {
      loadMoreBtn.hide();
      alert('Упс, что-то пошло не так и мы не нашли такой статьи!');
    });
}

function appendArticlesMarkup(articles) {
  refs.articlesСontainer.insertAdjacentHTML(
    'beforeend',
    articleCardTpl(articles),
  );
}

function clearArticleContainer() {
  refs.articlesСontainer.innerHTML = '';
}
