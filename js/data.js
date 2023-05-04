/* exported data */
// local storage to add to my list

var data = {
  view: 'main-page-list',
  entries: [],
  myList: [],
  myComments: []
};

function beforeUnload(event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('my list', dataJSON);
  localStorage.setItem('my comment', dataJSON);
}

window.addEventListener('beforeunload', beforeUnload);

const prevSavedList = localStorage.getItem('my list');
if (prevSavedList !== null) {
  data = JSON.parse(prevSavedList);
}
const preSavedComments = localStorage.getItem('my comment');
if (preSavedComments !== null) {
  data = JSON.parse(preSavedComments);
}
