'use strict';
const formEl = document.querySelector('.form');
const btnAdd = document.querySelector('.btn--add');
const todo = document.querySelector('.todo');

// Event listener
formEl.addEventListener('submit', function (e) {
  e.preventDefault();
  const input = this.querySelector('.input');
  const list = `
        <div class="list--container">
          <span class="list">${input.value}</span>
          <div class="btn--container">
            <button class="fas fa-check btn btn--check"></button>
            <button class="btn btn--remove">X</button>
          </div>
        </div>
  `;

  if (input.value === '') return;

  todo.insertAdjacentHTML('beforeend', list);
  input.value = '';
});
