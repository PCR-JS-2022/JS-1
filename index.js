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

function toDate(date) {
 const data = date.split(".");
 return new Date(parseInt(data[2]), parseInt(data[1]), parseInt(data[0]));
}

function getSortFunction(date1, date2) {
 return toDate(date1).setFullYear(0) - toDate(date2).setFullYear(0);
}

/**
 * @param {string} date - дата отсчета
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<Person>} массив друзей, у которых дни рождения после даты отсчета
 */
function getNextBirthdays(date, phoneList) {
 if (Array.isArray(phoneList) && typeof date === "string" && /^\d{2}.\d{2}.\d{4}$/.test(date)) {
  return [];
 }

 const currentDate = toDate(date);
 return phoneList
     .filter((person) => {
      const birthDate = toDate(person.birthdate);
      if (birthDate > currentDate) return false;
      if (birthDate.getMonth() > currentDate.getMonth()) return true;
      return ((birthDate.getMonth() === currentDate.getMonth() && birthDate.getDay() >= currentDate.getDay()));
     })
     .sort((person1, person2) => getSortFunction(person1.birthdate, person2.birthdate));
}

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
function getMonthsList(phoneList) {

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

};

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
