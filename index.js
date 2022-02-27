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
 const phoneList2 = [
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
      birthdate: "27.02.1980",
    },
  ];
  
function getNextBirthdays(date, phoneList) {
    const reg = /^\d{2}\.\d{2}\.\d{4}$/;
    if(!Array.isArray(phoneList) || !reg.test(date)) return []; 
    date = date.split("."); 
    let result = []; 
    for(let i = 0; i < phoneList.length; i++) {
      let currentDate = phoneList[i].birthdate.split("."); 
      if(+currentDate[2] > +date[2]) continue; 
      if(+currentDate[1] > +date[1]) { 
        result.push(phoneList[i]);
      } 
      if(+currentDate[1] === +date[1] && +currentDate[0] >= +date[0]) { 
        result.push(phoneList[i]);
      }
    }
    return result.sort((a, b) => {
      a = a.birthdate.split(".").reverse().join("-");
      b = b.birthdate.split(".").reverse().join("-");
      return Date.parse(a) - Date.parse(b);
    });
};

console.log(getNextBirthdays('21.01.2002', phoneList2));
  

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
