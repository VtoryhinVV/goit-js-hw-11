export default function createGalleryCard(objCard, refs, btnLoadMore) {
  if (!objCard.hits) {
    refs.divGallery.insertAdjacentHTML(
      'beforeend',
      "<p class = 'info-massage'>We're sorry, but you've reached the end of search results.</p>"
    );
    btnLoadMore.hide();
  } else {
    return objCard.hits
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          return `<div class="photo-card">
            <a href="${largeImageURL}"
                ><img
                width="350"
                height="200"
                src="${webformatURL}"
                alt="${tags}"
                loading="lazy"
            /></a>

            <div class="info">
                <p class="info-item"><b>Likes</b>${likes}</p>
                <p class="info-item"><b>Views</b>${views}</p>
                <p class="info-item"><b>Comments</b>${comments}</p>
                <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
        </div>`;
        }
      )
      .join('');
  }
}
