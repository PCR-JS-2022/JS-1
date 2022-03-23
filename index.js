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
function CheckDate(date){
  if (typeof date != 'string') {
    return true;
  }
  const newdate = date.split('.');
  if (isNaN(newdate[0]) 
  || isNaN(newdate[1]) 
  || isNaN(newdate[2])) {
    return true;
  }
  return false;
}

function getNextBirthdays(date, phoneList) {
  if (!Array.isArray(phoneList) || CheckDate(date)) {
    return [];
  }

  const newdate = date.split('.');
  let result = [];
  phoneList.forEach(
    (el) => {
      if (CheckBirthdays(newdate, el.birthdate))
        result.push(el)
    }
  );
  result.sort((first, second) =>
    SortBirthdays(first.birthdate, second.birthdate)
  );
  return result;
};

function CheckBirthdays(selectdate, date) {
  const newdate = date.split('.');
  if(Number(newdate[0]) == Number(selectdate[0])
  && Number(newdate[1]) == Number(selectdate[1])
  && Number(newdate[2]) == Number(selectdate[2])){
    return true;
  }
  return ((Number(newdate[2]) < Number(selectdate[2])) &&
    ((Number(newdate[1]) > Number(selectdate[1]) ||
      (newdate[1] == selectdate[1] && Number(newdate[0]) >= Number(selectdate[0])))))
}

function SortBirthdays(first, second) {
  const firstdate = first.split('.');
  const seconddate = second.split('.');
  if (firstdate[1] == seconddate[1] && firstdate[0] == seconddate[0])
    return 0;
  if (Number(firstdate[1]) > Number(seconddate[1]) || (firstdate[1] == seconddate[1] && Number(firstdate[0]) > Number(seconddate[0])))
    return 1;
  return -1;
}

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
function getMonthsList(phoneList) {
  if(!Array.isArray(phoneList)) {
    return [];
  }

  let result = [];
  for (let i = 1; i < 12; i++) {
    let nowMonth = ClreateMonth(i, phoneList);
    if (nowMonth.friends.length !== 0) {
      result.push(nowMonth)
    }
  }
  return result;
};

function ClreateMonth(i, phoneList) {
  const monthList = [
    'январь',
    'Февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ];
  let date;
  let nowMonth = {
    month: monthList[i - 1],
    friends: []
  }

  phoneList.forEach((el) => {
    date = el.birthdate.split('.');
    if (date[1] == i)
      nowMonth.friends.push(el)
  });
  return nowMonth;
};
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
  if(!Array.isArray(phoneList)) {
    return [];
  }

  let result = {
    friendsList: [],
    totalPrice: 0
  }
  phoneList.forEach(
    (people) => {
      result.friendsList.push(findCheapestPresent(people))
    }
  );
  result.friendsList.forEach(
    (people) => {
      if (people.present != undefined) {
        result.totalPrice += people.present.price;
      }
    }
  );
  return result;
};

function findCheapestPresent(people) {
  if (!people.hasOwnProperty('wishList')) {
    return {
      name: people.name,
      birthdate: people.birthdate,
      present: undefined
    }
  }
  let cheapPresent = {
    title: people.wishList[0].title,
    price: people.wishList[0].price
  }
  for (let i = 0; i < people.wishList.length; i++) {
    if (people.wishList[i].price < cheapPresent.price) {
      cheapPresent = people.wishList[i];
    }
  }
  return {
    name: people.name,
    birthdate: people.birthdate,
    present: cheapPresent
  };
}
module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };

