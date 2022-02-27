/**
 * @typedef Person
 * @type {object}
 * @property {string} name - имя
 * @property {string} birthdate - дата рождения
 */

/**
 * @typedef Gift
 * @type {object}
 * @property {string} title - название подарка
 * @property {number} price - стоимость подарка
 */

/**
 * @param {string} date - дата отсчета
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<Person>} массив друзей, у которых дни рождения после даты отсчета
 */



function getNextBirthdays(date, phoneList) {
  if (!(checkValidDate(date) && isArray(phoneList)) || phoneList.length === 0) return [];
  const currDateSplited = date.split(".");
  const currDateObject = getObjectDate(date);
  const sortedPhoneList = phoneList.filter(friend => {
    const friendBirthday = getObjectDate(friend.birthdate);
    if (friendBirthday <= currDateObject) return friend;
  }).filter(friend => {
    const friendBirthday = getObjectDate(friend.birthdate);
    const currYear = currDateObject.setFullYear(currDateSplited[2]);
    if (friendBirthday.setFullYear(currDateSplited[2]) >= currYear) return friend;
  });
  return sortedPhoneList.sort((a, b) => {
    const friend1 = getObjectDate(a.birthdate);
    const friend2 = getObjectDate(b.birthdate);
    return friend2 - friend1;
  });
};

function getObjectDate(date) {
  let splitedDate = date.split(".");
  return new Date(splitedDate[2], splitedDate[1] - 1, splitedDate[0]);
}

function checkValidDate(date) {
  if (typeof date !== "string") return false;
  let splitedDate = date.split(".");
  return (splitedDate.length === 3 &&
    splitedDate[0].length === 2 &&
    splitedDate[1].length === 2 &&
    splitedDate[2].length === 4);
}

function isArray(phoneList) {
  return Array.isArray(phoneList);
}

const phoneList = [
  {
    name: "Александра",
    birthdate: "21.05.2001",
  },
  {
    name: "Егор",
    birthdate: "06.08.1976",
  },
  {
    name: "Роман",
    birthdate: "14.04.2000",
  },
  {
    name: "Василий",
    birthdate: "27.02.1952",
  },
  {
    name: "John",
    birthdate: "14.05.2000"
  },
];


/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
function getMonthsList(phoneList) {
  if (!(isArray(phoneList))) return [];
  const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
  const sortedFriends = [];
  phoneList.map((friend) => {
    const monthNumber = getMonthNumber(friend.birthdate);
    if (!(isArray(sortedFriends[monthNumber - 1]))) sortedFriends[monthNumber - 1] = [];
    return sortedFriends[monthNumber - 1].push(friend);
  });

  const birthdays = months.map((e) => {
    return { month: e, friends: [] }
  });
  
  sortedFriends.forEach((e) => {
    if (isArray(e)) birthdays[sortedFriends.indexOf(e)].friends = e;
  });
  
  return birthdays.filter((e) => {
    if (e.friends.length != 0) return e;
  });
};

console.log(getMonthsList(phoneList));
console.log(getNextBirthdays( null));

function getMonthNumber(date) {
  const splitedDate = date.split(".");
  return splitedDate[1];
}

/**
 * @param {Array<{
 *    name: string,
 *    birthdate: string,
 *    wishList: Array<Gift>
 *  }>} phoneList - список друзей из телефонной книги
 * @returns {{
 *    friendsList: Array<{
 *      name: string,
 *      birthdate: string,
 *      present: Gift
 *    }>,
 *    totalPrice: number
 *  }}
 */
function getMinimumPresentsPrice(phoneList) {

};

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
