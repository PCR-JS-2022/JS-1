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
        birthdate: "27.02.1980",
      },
];
let date = '28.02.1980';
function getNextBirthdays(date, phoneList) {
    if (!(Array.isArray(phoneList) && checkData(date)) || phoneList.length === 0) return []; 
    const result = [];
    date = date.split('.').map(item => parseInt(item));
    for(let i = 0; i < phoneList.length; i++){
        let currDate = parseInt.phoneList[i].birthdate.split('.');
        if (currDate[1] > date[2]){
            result.push(phoneList[i]);
        }
        if(currDate[2] > date[2]) continue;
        if(currDate[1] === date[1] && currDate[0] >= date[0]){
            result.push(phoneList[i]);
        }

    }
    return result.sort((e1, e2) => {
      const DateE1 = a.birthdate.split('.');
      const DateE2 = a.birthdate.split('.');
      const [dayE1, monthE1, yearE1] = DateE1;
      const [dayE2, monthE2, yearE2] = DateE2;

      if(monthE1 > monthE2) {
        return 1;
      }
      
      if(monthE1 < monthE2) {
        return -1;
      } 
      
      if(monthE1 === monthE2) {
        if(dayE1 > dayE2) {
          return 1;
        } 
        if(dayE1 === dayE2) {
          return yearE1 - yearE2;
        }
      }
    });
};

function checkData(date){
    if (typeof date !== "string") return false;
    let splDate = date.split('.');
    return(splDate.length == 3 && splDate[0].length == 2 && splDate[1].length == 2 && splDate[2].length == 4)
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
