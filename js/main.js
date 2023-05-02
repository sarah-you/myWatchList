// global variables
const $list = document.querySelector('#anime-list');
const $defaultModal = document.querySelector('.main-container');
const $ol = document.querySelector('#anime-list');

// api request
function getAnimeData() {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://api.jikan.moe/v4/top/anime');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    // call function for DOM tree for all the data pulled from api
    const top25Data = xhr.response.data;
    renderList(top25Data);
    // add all the api data into local storage under entries
    data.entries = xhr.response.data;
    // variables needed to call close modal function
    const $modal = document.querySelectorAll('.modal');
    const $closeBtn = document.querySelectorAll('.close');
    // calling close modal function
    closeModal($modal, $closeBtn);
    // calling add to my list function
    // const $addBtn = document.querySelectorAll('.add');
    // addToMyList($addBtn);
  });
  xhr.send();
}

// DOM tree for all the api data
function renderList(top25Data) {
  for (let i = 0; i < top25Data.length; i++) {
    const $listWrap = document.createElement('div');
    $listWrap.setAttribute('class', 'list-wrap');
    const $top25List = document.createElement('li');
    $top25List.appendChild($listWrap);
    $list.appendChild($top25List);

    const $imgWrap = document.createElement('div');
    $imgWrap.setAttribute('class', 'img-wrap');
    $listWrap.appendChild($imgWrap);

    const $img = document.createElement('img');
    const imgUrl = top25Data[i].images.jpg.image_url;
    $img.setAttribute('src', imgUrl);
    $imgWrap.appendChild($img);

    const $textWrap = document.createElement('div');
    $textWrap.setAttribute('class', 'text-wrap');
    $listWrap.appendChild($textWrap);

    const $title = document.createElement('h3');
    $title.setAttribute('class', 'title');
    $title.textContent = top25Data[i].title;
    $textWrap.appendChild($title);

    const $rating = document.createElement('p');
    $rating.textContent = 'score: ' + top25Data[i].score;
    $rating.setAttribute('class', 'score');
    $textWrap.appendChild($rating);

    const $scoreBy = document.createElement('p');
    $scoreBy.textContent = top25Data[i].scored_by + ' viewers';
    $scoreBy.setAttribute('class', 'score-by');
    $textWrap.appendChild($scoreBy);

    const $genres = document.createElement('p');
    const genreTypes = top25Data[i].genres;
    for (let i = 0; i < genreTypes.length; i++) {
      $genres.textContent += genreTypes[i].name + ' ';
      $textWrap.appendChild($genres);
    }

    const $episodes = document.createElement('p');
    $episodes.textContent = top25Data[i].episodes + ' eps';
    $textWrap.appendChild($episodes);

    const $duration = document.createElement('p');
    $duration.textContent = top25Data[i].duration;
    $textWrap.appendChild($duration);

    const $malId = document.createElement('p');
    $malId.setAttribute('class', 'hidden');
    $malId.setAttribute('id', 'mal-id');
    $malId.textContent = 'id: ' + top25Data[i].mal_id;
    $textWrap.appendChild($malId);

    // hidden modal elements
    const $hiddenModal = document.createElement('div');
    $hiddenModal.setAttribute('class', 'hidden modal');
    $top25List.appendChild($hiddenModal);

    const $modalContainer = document.createElement('div');
    $modalContainer.setAttribute('class', 'modal-container');
    $hiddenModal.appendChild($modalContainer);

    const $topRowWrap = document.createElement('div');
    $topRowWrap.setAttribute('class', 'top-row-wrap');
    $modalContainer.appendChild($topRowWrap);

    const $modalImgWrap = document.createElement('div');
    $modalImgWrap.setAttribute('class', 'img-wrap');
    $topRowWrap.appendChild($modalImgWrap);

    const $modalImg = document.createElement('img');
    const modalImgUrl = top25Data[i].images.jpg.image_url;
    $modalImg.setAttribute('class', 'modal-img');
    $modalImg.setAttribute('src', modalImgUrl);
    $modalImgWrap.appendChild($modalImg);

    const $modalTextWrap = document.createElement('div');
    $modalTextWrap.setAttribute('class', 'modal-text-wrap');
    $topRowWrap.appendChild($modalTextWrap);

    const $modalTitle = document.createElement('p');
    $modalTitle.setAttribute('class', 'modal-title');
    $modalTitle.textContent = top25Data[i].title;
    $modalTextWrap.appendChild($modalTitle);

    const $modalRating = document.createElement('p');
    $modalRating.textContent = 'score: ' + top25Data[i].score;
    $modalRating.setAttribute('class', 'modal-score');
    $modalTextWrap.appendChild($modalRating);

    const $modalScoreBy = document.createElement('p');
    $modalScoreBy.textContent = top25Data[i].scored_by + ' viewers';
    $modalScoreBy.setAttribute('class', 'modal-score-by');
    $modalTextWrap.appendChild($modalScoreBy);

    const $modalGenres = document.createElement('p');
    $modalGenres.setAttribute('class', 'modal-genres');
    const modalGenreTypes = top25Data[i].genres;
    for (let i = 0; i < modalGenreTypes.length; i++) {
      $modalGenres.textContent += modalGenreTypes[i].name + ' ';
      $modalTextWrap.appendChild($modalGenres);
    }

    const $modalEpisodes = document.createElement('p');
    $modalEpisodes.setAttribute('class', 'modal-episodes');
    $modalEpisodes.textContent = top25Data[i].episodes + ' eps';
    $modalTextWrap.appendChild($modalEpisodes);

    const $modalDuration = document.createElement('p');
    $modalDuration.setAttribute('class', 'modal-duration');
    $modalDuration.textContent = 'Duration: ' + top25Data[i].duration;
    $modalTextWrap.appendChild($modalDuration);

    const $synopsisWrap = document.createElement('div');
    $synopsisWrap.setAttribute('class', 'synopsis-wrap');
    $modalContainer.appendChild($synopsisWrap);

    const $synopsisHeading = document.createElement('h3');
    $synopsisHeading.setAttribute('class', 'synopsis-heading');
    $synopsisHeading.textContent = 'Synopsis';
    $synopsisWrap.appendChild($synopsisHeading);

    const $synopsis = document.createElement('p');
    $synopsis.setAttribute('class', 'synopsis');
    $synopsis.textContent = top25Data[i].synopsis;
    $synopsisWrap.appendChild($synopsis);

    const $trailerDiv = document.createElement('div');
    $trailerDiv.setAttribute('class', 'trailer-wrap');
    $modalContainer.appendChild($trailerDiv);

    const $trailer = document.createElement('iframe');
    $trailer.setAttribute('class', 'trailer');
    $trailer.setAttribute('src', top25Data[i].trailer.embed_url);
    $trailer.setAttribute('frameborder', '0');
    $trailer.setAttribute('allow', 'accelerometer, clipboard-write; encrypted-media; gyroscope; picture-in-picture'
    );
    $trailer.setAttribute('allowfullscreen', 'allowfullscreen');
    $trailerDiv.appendChild($trailer);

    const $watchNowDiv = document.createElement('div');
    $watchNowDiv.setAttribute('class', 'watch-now-wrap');
    $modalContainer.appendChild($watchNowDiv);

    const $watchNow = document.createElement('a');
    $watchNow.textContent = 'Watch Now';
    const websiteLink = top25Data[i].url;
    $watchNow.setAttribute('href', websiteLink);
    $watchNow.setAttribute('class', 'watch-now');
    $watchNowDiv.appendChild($watchNow);

    const $modalBtnWrap = document.createElement('div');
    $modalBtnWrap.setAttribute('class', 'modal-btn-wrap');
    $modalContainer.appendChild($modalBtnWrap);

    const $modalAddBtn = document.createElement('button');
    $modalAddBtn.textContent = '+ Add';
    $modalAddBtn.setAttribute('class', 'add modal-btn');
    $modalAddBtn.setAttribute('type', 'submit');
    $modalBtnWrap.appendChild($modalAddBtn);

    const $modalCloseBtn = document.createElement('button');
    $modalCloseBtn.textContent = 'Close';
    $modalCloseBtn.setAttribute('class', 'close modal-btn');
    $modalBtnWrap.appendChild($modalCloseBtn);
  // end of modal elements
  }
}

window.addEventListener('DOMContentLoaded', function () {
  getAnimeData();
});

// close modal button (needed to use loop because close button event needs to be applied for all 25 list items)
function closeModal($modal, $closeBtn) {
  for (let i = 0; i < $closeBtn.length; i++) {
    $closeBtn[i].addEventListener('click', function () {
      $defaultModal.className = 'main-container';
      $modal[i].className = 'hidden modal';
      viewSwap('main-page-list');
    });
  }
}

// modal pop up if user clicks on a show (added a conditional bc clicking outside the list showed error, since the event listener was on the ol and buttons in the modal are still part of the ol)
$ol.addEventListener('click', function openModal(event) {
  if (event.target.tagName !== 'OL' && event.target.tagName !== 'LI' && event.target.tagName !== 'BUTTON') {
    const $parentElement = event.target.closest('.list-wrap');
    const $closestModal = $parentElement.nextElementSibling;
    $defaultModal.className = 'main-container modal-opened';
    $closestModal.className = 'show modal';
    viewSwap('main-page-list');
  }
});

// clicking add button adds to My List page
// function addToMyList($addBtn) {
//   for (let i = 0; i < $addBtn.length; i++) {
//     $addBtn[i].addEventListener('click', function saveToMyList(event) {
//       const $parentElement = event.target.closest('#mal-id');
//       for (let i = 0; i < data.entries.length; i++) {
//         if (data.entries[i].mal_id === $parentElement) {
//           data.myList = data.entries[i];
//         }
//       }
//       viewSwap('my-list');
//     });
//   }
// }

// viewswap between main page & my list
const $mainPage = document.querySelector('#main-page-list');
const $myList = document.querySelector('#my-list');

function viewSwap(viewName) {
  const $top25ListHeading = document.querySelector('.heading');
  const $myListHeading = document.querySelector('.subheading');
  if (viewName === 'main-page-list') {
    $mainPage.setAttribute('class', 'display');
    $myList.setAttribute('class', 'hidden');
    $top25ListHeading.setAttribute('class', 'heading display');
    $myListHeading.setAttribute('class', 'subheading hidden');
    data.view = viewName;
  } else {
    $myList.setAttribute('class', 'display');
    $mainPage.setAttribute('class', 'hidden');
    $top25ListHeading.setAttribute('class', 'heading hidden');
    $myListHeading.setAttribute('class', 'subheading display');
    data.view = viewName;
  }
}
