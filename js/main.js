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
    // by having the render function inside for loop, the renderList function becomes reusable for main page and my list page
    for (let i = 0; i < top25Data.length; i++) {
      renderList(top25Data[i], $list, 'desc');
    }
    // add all the api data into local storage under entries
    data.entries = xhr.response.data;
    // variables needed to call close modal function
    const $modal = document.querySelectorAll('.modal');
    const $closeBtn = document.querySelectorAll('.close');
    // calling close modal function
    closeModal($modal, $closeBtn);
    // calling add to my list function
    const $addBtn = document.querySelectorAll('.add');
    addToMyList($addBtn);
  });
  xhr.send();
}

// DOM tree for all the api data
function renderList(top25Data, listLocation, direction) {
  const $listWrap = document.createElement('div');
  $listWrap.setAttribute('class', 'list-wrap');
  const $top25List = document.createElement('li');
  $top25List.setAttribute('id', top25Data.mal_id);
  $top25List.appendChild($listWrap);
  // if descending order ('desc'), put the list at the bottom, if not (new list items that are added), put it at the top
  // (when appending, default is to add at the bottom, but by putting in this statement, we customize the direction of added items)
  if (direction === 'desc') {
    listLocation.appendChild($top25List);
  } else {
    listLocation.prepend($top25List);
  }

  const $imgWrap = document.createElement('div');
  $imgWrap.setAttribute('class', 'img-wrap');
  $listWrap.appendChild($imgWrap);

  const $img = document.createElement('img');
  const imgUrl = top25Data.images.jpg.image_url;
  $img.setAttribute('src', imgUrl);
  $imgWrap.appendChild($img);

  const $textWrap = document.createElement('div');
  $textWrap.setAttribute('class', 'text-wrap');
  $listWrap.appendChild($textWrap);

  const $title = document.createElement('h3');
  $title.setAttribute('class', 'title');
  $title.textContent = top25Data.title;
  $textWrap.appendChild($title);

  const $rating = document.createElement('p');
  $rating.textContent = 'score: ' + top25Data.score;
  $rating.setAttribute('class', 'score');
  $textWrap.appendChild($rating);

  const $scoreBy = document.createElement('p');
  $scoreBy.textContent = top25Data.scored_by + ' viewers';
  $scoreBy.setAttribute('class', 'score-by');
  $textWrap.appendChild($scoreBy);

  const $genres = document.createElement('p');
  const genreTypes = top25Data.genres;
  for (let i = 0; i < genreTypes.length; i++) {
    $genres.textContent += genreTypes[i].name + ' ';
    $textWrap.appendChild($genres);
  }

  const $episodes = document.createElement('p');
  $episodes.textContent = top25Data.episodes + ' eps';
  $textWrap.appendChild($episodes);

  const $duration = document.createElement('p');
  $duration.textContent = top25Data.duration;
  $textWrap.appendChild($duration);

  const $malId = document.createElement('p');
  $malId.setAttribute('class', 'hidden');
  $malId.setAttribute('id', 'mal-id');
  $malId.textContent = 'id: ' + top25Data.mal_id;
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
  const modalImgUrl = top25Data.images.jpg.image_url;
  $modalImg.setAttribute('class', 'modal-img');
  $modalImg.setAttribute('src', modalImgUrl);
  $modalImgWrap.appendChild($modalImg);

  const $modalTextWrap = document.createElement('div');
  $modalTextWrap.setAttribute('class', 'modal-text-wrap');
  $topRowWrap.appendChild($modalTextWrap);

  const $modalTitle = document.createElement('p');
  $modalTitle.setAttribute('class', 'modal-title');
  $modalTitle.textContent = top25Data.title;
  $modalTextWrap.appendChild($modalTitle);

  const $modalRating = document.createElement('p');
  $modalRating.textContent = 'score: ' + top25Data.score;
  $modalRating.setAttribute('class', 'modal-score');
  $modalTextWrap.appendChild($modalRating);

  const $modalScoreBy = document.createElement('p');
  $modalScoreBy.textContent = top25Data.scored_by + ' viewers';
  $modalScoreBy.setAttribute('class', 'modal-score-by');
  $modalTextWrap.appendChild($modalScoreBy);

  const $modalGenres = document.createElement('p');
  $modalGenres.setAttribute('class', 'modal-genres');
  const modalGenreTypes = top25Data.genres;
  for (let i = 0; i < modalGenreTypes.length; i++) {
    $modalGenres.textContent += modalGenreTypes[i].name + ' ';
    $modalTextWrap.appendChild($modalGenres);
  }

  const $modalEpisodes = document.createElement('p');
  $modalEpisodes.setAttribute('class', 'modal-episodes');
  $modalEpisodes.textContent = top25Data.episodes + ' eps';
  $modalTextWrap.appendChild($modalEpisodes);

  const $modalDuration = document.createElement('p');
  $modalDuration.setAttribute('class', 'modal-duration');
  $modalDuration.textContent = 'Duration: ' + top25Data.duration;
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
  $synopsis.textContent = top25Data.synopsis;
  $synopsisWrap.appendChild($synopsis);

  const $trailerDiv = document.createElement('div');
  $trailerDiv.setAttribute('class', 'trailer-wrap');
  $modalContainer.appendChild($trailerDiv);

  const $trailer = document.createElement('iframe');
  $trailer.setAttribute('class', 'trailer');
  $trailer.setAttribute('src', top25Data.trailer.embed_url);
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
  const websiteLink = top25Data.url;
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

window.addEventListener('DOMContentLoaded', function () {
  getAnimeData();
  // on page load, runs a loop to render any saved entries in local storage
  for (let i = 0; i < data.myList.length; i++) {
    renderList(data.myList[i], $savedList, 'desc');
  }
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
// modal pop up if user clicks on a show
// (added a conditional bc clicking outside the list showed error, since the event listener was on the <ol> and buttons in the modal are still part of the <ol>)
function openModal(event) {
  if (event.target.tagName !== 'OL' && event.target.tagName !== 'LI' && event.target.tagName !== 'BUTTON') {
    const $parentElement = event.target.closest('.list-wrap');
    const $closestModal = $parentElement.nextElementSibling;
    $defaultModal.className = 'main-container modal-opened';
    $closestModal.className = 'show modal';
    // viewSwap('main-page-list');
  }
}
$ol.addEventListener('click', openModal);

// clicking add button adds to My List page
const $savedList = document.getElementById('my-saved-list');
$savedList.addEventListener('click', openModal);
function addToMyList($addBtn) {
  viewSwap('my-list');
  for (let i = 0; i < $addBtn.length; i++) {
    $addBtn[i].addEventListener('click', function saveToMyList(event) {
      // set default modal class name to keep the modals visible
      $defaultModal.className = 'main-container';
      // if the selected show's id matches the id of show saved in the entries list, all the data will be rendered on the my List page
      const $parentElement = event.target.closest('li');
      for (let j = 0; j < data.entries.length; j++) {
        if (data.entries[j].mal_id === Number($parentElement.getAttribute('id'))) {
          data.myList.unshift(data.entries[j]);
          renderList(data.entries[j], $savedList, 'asc');
        }
      }
    });
  }
}

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

// when user clicks on Logo, they're taken to the main page
const $logo = document.querySelector('.logo');
$logo.addEventListener('click', function () {
  viewSwap('main-page-list');
});
// when user clicks on My List, they're taken to the My List page
const $myListHead = document.getElementById('my-list-head');
$myListHead.addEventListener('click', function () {
  viewSwap('my-list');
});
