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
  if(!Array.isArray(phoneList) || !checkDateIsCorrect(date) || phoneList.length === 0) return [];

  const keyDate = getDateObject(date);

  let sortedPhoneList = phoneList.filter((e) => {
    const friendDate = getDateObject(e.birthdate);

    if(friendDate.getFullYear() <= keyDate.getFullYear()){
      if(friendDate.getMonth() > keyDate.getMonth()) return e;

      if(friendDate.getMonth() === keyDate.getMonth())
        if(friendDate.getDate() >= keyDate.getDate()) return e;
    }
  });

  return sortedPhoneList.sort((a, b) => {
    const friend1 = getDateObject(a.birthdate);
    const friend2 = getDateObject(b.birthdate);

    return friend2 - friend1;
  });
}

function getDateObject(date){
  const splittedDate = date.split('.');
  return new Date(splittedDate[2], splittedDate[1] - 1, splittedDate[0]);
}

function checkDateIsCorrect(date){
  if(typeof date !== 'string')
    return false;
  const splitDateElements = date.split('.');

  return splitDateElements[0].length === 2 
    && splitDateElements[1].length === 2 
    && splitDateElements[2].length === 4 
    && splitDateElements.length === 3;
}

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */

function getMonthsList(phoneList) {
  if(!Array.isArray(phoneList) || phoneList.length === 0) return [];

  const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

  const birthdaysList = months.map((e) => {
    return {month: e, friends: []}
  });
  
  phoneList.forEach((e) => {
    const month = getDateObject(e.birthdate).getMonth();
    birthdaysList[month].friends.push(e);
  })

  return birthdaysList.filter((e) => {
    if(e.friends.length !== 0) return e;
  });
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
  if(!Array.isArray(phoneList) || phoneList.length === 0) return [];

  let friendsPresentsList = { 
    friendsList: [], 
    totalPrice: undefined 
  };

  let totalPrice = 0;

  phoneList.forEach((e) => {
    if(e.hasOwnProperty('wishList') && Array.isArray(e.wishList) && e.wishList.length !== 0){
      e.wishList.sort((a, b) => {
        return a.price - b.price;
      });

      e.present = e.wishList[0];
      delete e.wishList;
      friendsPresentsList.friendsList.push(e);
      totalPrice += Number(e.present.price);
    }
    else {
      e.present = undefined;
      delete e.wishList;
      friendsPresentsList.friendsList.push(e);
    }
  });

  friendsPresentsList.totalPrice = totalPrice;
  return friendsPresentsList;
}

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
