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

function addData(obj) {
  data.push(obj);
}
