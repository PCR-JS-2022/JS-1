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
  if(!Array.isArray(phoneList) || !CheckDateIsCorrect(date) || phoneList.length === 0) return [];

  let keyDate = GetDateObject(date);

  let sortedPhoneList = phoneList.filter((e) => {
    let friendDate = GetDateObject(e.birthdate);

    if(friendDate.getFullYear() <= keyDate.getFullYear()){
      if(friendDate.getMonth() > keyDate.getMonth()) return e;

      if(friendDate.getMonth() === keyDate.getMonth())
        if(friendDate.getDate() >= keyDate.getDate()) return e;
    }
  });

  return sortedPhoneList.sort((a, b) => {
    let friend1 = GetDateObject(a.birthdate);
    let friend2 = GetDateObject(b.birthdate);

    return friend2 - friend1;
  });
}

function GetDateObject(date){
  let splittedDate = date.split('.');
  return new Date(splittedDate[2], splittedDate[1] - 1, splittedDate[0]);
}

function CheckDateIsCorrect(date){
  if(typeof date !== 'string')
    return false;
  let splitDateElements = date.split('.');

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

  let birthdaysList = months.map((e) => {
    return {month: e, friends: []}
  });
  
  phoneList.forEach((e) => {
    let month = GetDateObject(e.birthdate).getMonth();
    birthdaysList[+month].friends.push(e);
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

}

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
