function getAnimeData(name) {
  const xhr = new XMLHttpRequest();
  const $list = document.querySelector('#anime-list');

  xhr.open('GET', 'https://api.jikan.moe/v4/top/anime');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log('status: ', xhr.status);
    console.log('response: ', xhr.response);
    const top25Data = xhr.response.data;
    for (let i = 0; i < top25Data.length; i++) {
      const $listWrap = document.createElement('div');
      $listWrap.setAttribute('class', 'list-wrap');
      $list.appendChild($listWrap);
      const $top25List = document.createElement('li');
      $listWrap.appendChild($top25List);

      const $imgWrap = document.createElement('div');
      $imgWrap.setAttribute('class', 'img-wrap');
      $top25List.appendChild($imgWrap);

      const $img = document.createElement('img');
      const imgUrl = top25Data[i].images.jpg.image_url;
      $img.setAttribute('src', imgUrl);
      $imgWrap.appendChild($img);

      const $textWrap = document.createElement('div');
      $textWrap.setAttribute('class', 'text-wrap');
      $top25List.appendChild($textWrap);

      const $title = document.createElement('h3');
      $title.setAttribute('class', 'title');
      $title.textContent = top25Data[i].title;
      $textWrap.appendChild($title);

      const $rating = document.createElement('p');
      $rating.textContent = top25Data[i].score + ' rating';
      $textWrap.appendChild($rating);

      const $scoreBy = document.createElement('p');
      $scoreBy.textContent = top25Data[i].scored_by + ' viewers';
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

      const $hiddenWrap = document.createElement('div');
      $hiddenWrap.setAttribute('class', 'hidden');
      $top25List.appendChild($hiddenWrap);

      const $synopsis = document.createElement('p');
      $synopsis.textContent = top25Data[i].synopsis;
      $hiddenWrap.appendChild($synopsis);

      const $trailer = document.createElement('iframe');
      $trailer.setAttribute('src', top25Data[i].trailer.embed_url);
      $trailer.setAttribute('frameborder', '0');
      $trailer.setAttribute('allow', 'accelerometer, clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      );
      $trailer.setAttribute('allowfullscreen', 'allowfullscreen');
      $hiddenWrap.appendChild($trailer);

      const $watchNow = document.createElement('a');
      $watchNow.textContent = 'Watch Now';
      const websiteLink = top25Data[i].url;
      $watchNow.setAttribute('href', websiteLink);
      $hiddenWrap.appendChild($watchNow);

    }
  });
  xhr.send();
}

getAnimeData();
