import './css/index.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import ImagesApiServer from './API';
import BtnLoadMore from './load-btn';
import createGalleryCard from './render-gallery';

const refs = {
  form: document.querySelector('#search-form'),
  divGallery: document.querySelector('.gallery'),
};

const imagesApiServer = new ImagesApiServer();
const btnLoadMore = new BtnLoadMore({
  classBtn: '.load-more',
  hidden: true,
});

refs.form.addEventListener('submit', onForm);
btnLoadMore.refs.btnLoadMore.addEventListener('click', onLoadMore);

async function onForm(event) {
  event.preventDefault();
  resetGallery();
  btnLoadMore.hide();

  imagesApiServer.query = event.currentTarget.elements.searchQuery.value;

  imagesApiServer.resetPage();
  try {
    const images = await imagesApiServer.fetchRequest();
    if (!images.hits.length) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    renderGalleryCard(createGalleryCard(images, refs, btnLoadMore));
    lightbox.refresh();
    btnLoadMore.show();
    Notify.info(`Hooray! We found ${images.totalHits} images.`);
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMore() {
  const images = await imagesApiServer.fetchRequest();
  renderGalleryCard(createGalleryCard(images, refs, btnLoadMore));
  lightbox.refresh();
}

function renderGalleryCard(gallery) {
  if (gallery) {
    refs.divGallery.insertAdjacentHTML('beforeend', gallery);
  }
}

function resetGallery() {
  refs.divGallery.innerHTML = '';
}
const lightbox = new SimpleLightbox('.gallery a');
