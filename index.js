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
  date = date.split('.');
  if(!Array.isArray(phoneList) || !checkDate(date) || phoneList.length === 0) return [];
  let dateYear = +date[2];
  let dateMonth = +date[1];
  let dateDay = +date[0];
  let sortedPhoneList = phoneList.filter(e => {
  let friendDate = (e.birthdate.split('.'));
  let friendYear = +friendDate[2];
  let friendMonth = +friendDate[1];
  let friendDays = +friendDate[0];
  if (friendYear <= dateYear){ 
    if (friendMonth > dateMonth){
        return e;}
    if (friendMonth == dateMonth)
      if (friendDays > dateDay) 
        return e;}
  })
  return sortedPhoneList.sort((a, b) => {
    const friend1 = getDate(a.birthdate);
    const friend2 = getDate(b.birthdate);

    return friend2 - friend1;
  })
};

function getDate(date){
  let corrDate = new Date();
  corrDate.setFullYear(date[2], date[1] - 1 ,date[0]);
  return corrDate;
}

function checkDate(date){
  return (date.length === 3 & date[0].length === 2 &
    date[1].length === 2 & date[2].length === 4);
}

const phoneList = [
  {
    name: "Александра",
    birthdate: "29.06.1977",
  },
  {
    name: "Егор",
    birthdate: "12.04.1976",
  },
  {
    name: "Роман",
    birthdate: "14.11.1975",
  },
  {
    name: "Василий",
    birthdate: "27.05.1940",
  },
];


console.log(getNextBirthdays('28.05.1980', phoneList));


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