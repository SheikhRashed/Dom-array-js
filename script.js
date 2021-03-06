'use strict';

// UI Variables
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double');
const millioniareBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const wealthBtn = document.getElementById('calculate-wealth');

let data = [];
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  // destructing first name and last name from api
  const { first, last } = data.results[0].name;

  // create Random new user
  const newUser = {
    name: `${first} ${last} `,
    money: Math.trunc(Math.random() * 1000000),
  };
  addData(newUser);
}

// Double money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// Sort user by richest
function sortByRichest() {
  data = data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// Filter Millioniare
function showMillioniare() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}

// calculate total wealth of users
function calculateTotalWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const el = document.createElement('div');
  el.innerHTML = `
    <h3>Total Wealth: <b>$${formatMoney(wealth)}</b> </h3>
  `;
  main.appendChild(el);
}

// Add New obj to data arr
function addData(obj) {
  data.push(obj);
  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  main.innerHTML = `
  <h2> <b>Person</b> Wealth </h2>
  `;

  providedData.forEach((item) => {
    const el = document.createElement('div');
    el.classList.add('person');
    el.innerHTML = `<b>${item.name}</b> $${formatMoney(item.money)}`;
    main.appendChild(el);
  });
}

// Format number as money

function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

console.log(data);
// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
wealthBtn.addEventListener('click', calculateTotalWealth);
