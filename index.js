module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };

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
  const regex = /^\d{2}\.\d{2}\.\d{4}$/;

  if (!regex.test(date) || !Array.isArray(phoneList)){
    return([]);
  }
  
  return phoneList
     .filter(person => filterByBd(date.split("."), person.birthdate.split('.')))
     .sort((a,b) => sortByBd(a.birthdate.split('.'), b.birthdate.split('.')));
}

function filterByBd(splittedDate, birthDate){
  let sD = new Date(splittedDate[2], parseInt(splittedDate[1])-1, splittedDate[0]);
  let bD = new Date(birthDate[2], parseInt(birthDate[1])-1, birthDate[0]);

  if (bD.getFullYear() > sD.getFullYear()) return(false);
  else if (bD.getMonth() > sD.getMonth()) return(true);
  else if (bD.getMonth() === sD.getMonth() && bD.getDate() >= sD.getDate()) return(true);
}

function sortByBd(dateForSort1, dateForSort2){
  const d1 = new Date(0, parseInt(dateForSort1[1])-1, dateForSort1[0])
  const d2 = new Date(0, parseInt(dateForSort2[1])-1, dateForSort2[0])
  return (d1 - d2);
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
    birthdate: "27.02.1980",
  },
];

const result = getNextBirthdays('28.02.1980', phoneList);
console.log(JSON.stringify(result))
  
/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
function getMonthsList(phoneList) {
  if (!Array.isArray(phoneList)){
    return([]);
  }

  let resultList = [];

  const months = ["январь", "февраль", "март", "апрель", "май", "июнь",
  "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
  
  phoneList
  .sort((a,b) => a.birthdate.split('.')[1] - b.birthdate.split('.')[1])
  .forEach(person => {
    let monthStr = months[parseInt(person.birthdate.split('.')[1])-1];

    if(resultList.some(el => el.month === monthStr)) {
      resultList.find(el => el.month === monthStr).friends.push(person);
    }
    else {
      resultList.push({month: monthStr, friends: [person],});
    }
  });

  return resultList;
}

//const result1 = getMonthsList(phoneList);
//console.log(JSON.stringify(result1))

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
