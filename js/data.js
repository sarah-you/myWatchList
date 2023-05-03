/* exported data */
// local storage to add to my list

var data = {
  view: 'main-page-list',
  entries: [],
  myList: []
};

function beforeUnload(event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('my list', dataJSON);
}

window.addEventListener('beforeunload', beforeUnload);

const prevSavedList = localStorage.getItem('my list');
if (prevSavedList !== null) {
  data = JSON.parse(prevSavedList);
}
