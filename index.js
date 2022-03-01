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
  // let firstDate = new Date();
  // firstDate.setFullYear(date[0],(date[1] - 1 ),date[2]);
  // console.log(firstDate);

  let arr = [];

  if(!Array.isArray(phoneList) || !checkDate(date) || phoneList.length === 0) return [];

  let dateYear = date[2];
  let dateMonth = date[1] * 10 / 10;
  let dateDay = date[0] * 10 / 10;
  let sortedPhoneList = phoneList.filter(e => {
  let friendDate = (e.birthdate.split('.'));
  let name = (e.name);
  let friendYear = friendDate[2];
  let friendMonth = friendDate[1] * 10 / 10;
  let friendDays = friendDate[0] * 10 / 10;
  if (friendYear <= dateYear) 
    if (friendMonth > dateMonth)
        return e;
    if (friendMonth == dateMonth) 
      if (friendDays > dateDay) 
        return e;
  })
  // console.log(arr);
  return sortedPhoneList.sort((a, b) => {
    const friend1 = getDateObject(a.birthdate);
    const friend2 = getDateObject(b.birthdate);

    return friend1 - friend2;
  })
};

function getDateObject(date){
  date = date.split('.');
  let firstDate = new Date();
  firstDate.setFullYear(date[2], date[1] - 1 ,date[0]);
  return firstDate;
}

function checkDate(date){
  return (date.length === 3 & date[0].length === 2 &
    date[1].length === 2 & date[2].length === 4);
}

const phoneList = [
{
  name: "Александра",
  birthdate: "21.05.1978",
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
  birthdate: "27.02.1950",
},
];;


console.log(getNextBirthdays('25.02.1980', phoneList));

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