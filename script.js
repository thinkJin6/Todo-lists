'use strict';
const formEl = document.querySelector('.form');
const todo = document.querySelector('.todo');

// Get lists from local storage
const localStorageLists = JSON.parse(localStorage.getItem('lists'));

// lists which will be generated on DOM
let lists = localStorage.getItem('lists') !== null ? localStorageLists : [];

// Set local storage
const setLocalStorage = function () {
  localStorage.setItem('lists', JSON.stringify(lists));
};

// Update DOM
const updateDOM = function () {
  todo.innerHTML = '';
  lists.forEach((list) => todo.insertAdjacentHTML('afterbegin', list.li));
};

// Render list on DOM
const renderLists = function (e) {
  e.preventDefault();

  const randomID = Math.trunc(Math.random() * 1000000);
  const input = document.querySelector('.input');

  let list = {
    id: randomID,
    text: input.value,
    toggle: false,
  };
  list.li = `
    <div class="list--container" data-id=${list.id}>
        <span class="list">${list.text}</span>
        <div class="btn--container">
          <button class="fas fa-check btn btn--check"></button>
          <button class="btn btn--remove">X</button>
        </div>
    </div>
    `;

  lists.push(list);

  if (input.value === '') return;

  setLocalStorage();
  updateDOM();
  input.value = '';
};

// Delete list on DOM
const deleteList = function (e) {
  const data = +e.target.closest('.list--container').getAttribute('data-id');

  if (!e.target.classList.contains('btn--remove')) return;

  localStorage.clear();
  lists = lists.filter((list) => list.id !== data);

  setLocalStorage();

  updateDOM();
};

// Move list to Checked list
const checkList = function (e) {
  const btnCheck = e.target;
  const data = +btnCheck.closest('.list--container').getAttribute('data-id');

  if (!btnCheck.classList.contains('btn--check')) return;

  const filteredList = lists.filter((list) => list.id === data);
  const active = filteredList[0].toggle ? '' : 'active';
  console.log(filteredList[0].toggle);

  lists.forEach((list) => {
    if (list.id === data) {
      list.li = `
    <div class="list--container" data-id=${list.id}>
        <span class="list ${active}">${list.text}</span>
        <div class="btn--container">
          <button class="fas fa-check btn btn--check ${active}"></button>
          <button class="btn btn--remove">X</button>
        </div>
    </div>`;
    }
  });
  filteredList[0].toggle === true
    ? (filteredList[0].toggle = false)
    : (filteredList[0].toggle = true);

  setLocalStorage();
  updateDOM();
};

// Init
const init = (function () {
  updateDOM();
})();

// Event listener
formEl.addEventListener('submit', renderLists);
todo.addEventListener('click', deleteList);
todo.addEventListener('click', checkList);
