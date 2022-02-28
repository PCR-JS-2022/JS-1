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
    {
      name: "Настя",
      birthdate: "21.05.2002",
    },
    {
      name: "Виктор",
      birthdate: "20.08.1977",
    }
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
      let yearA = +a.birthdate.split(".")[2];
      let yearB = +b.birthdate.split(".")[2];
      let monthA = +a.birthdate.split(".")[1];
      let monthB = +b.birthdate.split(".")[1];
      let dayA = +a.birthdate.split(".")[0];
      let dayB = +a.birthdate.split(".")[0];
      if(monthA < monthB) {
        return -1;
      } 
      if(monthA > monthB) {
        return 1;
      }
      if(monthA === monthB) {
        if(dayA > dayB) {
          return 1;
        } 
        if(dayA === dayB) {
          return yearA - yearB;
        }
      }
    });
};

//console.log(getNextBirthdays('27.02.1980', phoneList2));


  

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
function getMonthsList(phoneList) {
  if(!Array.isArray(phoneList)) return [];
  const months = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
  let result = [];
  const sortedList = phoneList.sort((a,b) => { 
    a = a.birthdate.split(".").reverse();
    b = b.birthdate.split(".").reverse();
    let date1 = new Date(+a[0], +a[1], +a[2]);
    let date2 = new Date(+b[0], +b[1], +b[2]);
    return date1.getMonth() - date2.getMonth();
  })

  let passed = []; 
  for(let i = 0; i < sortedList.length; i++) {
    let month = +sortedList[i].birthdate.split(".")[1]; 
    if(passed.indexOf(month) !== -1) { 
      result[result.length - 1].friends.push(sortedList[i]);
      continue;
    }
    passed.push(month);
    result.push({month: months[month-1], friends: [sortedList[i]]});
  }
  return (JSON.stringify(result));
};

//console.log(getMonthsList(phoneList2));

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
