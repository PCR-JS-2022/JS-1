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
    const reg = /^\d{2}\.\d{2}\.\d{4}$/;
    if(!Array.isArray(phoneList) || !reg.test(date)) return []; 
    date = date.split("."); 
    const result = []; 
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
      const dateA = a.birthdate.split(".").map(i => Number(i));
      const dateB = b.birthdate.split(".").map(i => Number(i));
      const [dayA, monthA, yearA] = dateA;
      const [dayB, monthB, yearB] = dateB;
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

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
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

function getMonthsList(phoneList) {
  if(!Array.isArray(phoneList)) return [];
  const months = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
  const result = [];
  const sortedList = phoneList.sort((a,b) => { 
    a = a.birthdate.split(".").reverse();
    b = b.birthdate.split(".").reverse();
    let date1 = new Date(+a[0], +a[1], +a[2]);
    let date2 = new Date(+b[0], +b[1], +b[2]);
    return date1.getMonth() - date2.getMonth();
  })

  const passed = []; 

  return sortedList.reduce((res, current) => {
      let month = +current.birthdate.split(".")[1];  
      if(passed.indexOf(month) !== -1) {  
        res[res.length - 1].friends.push(current); 
      } else {
        passed.push(month); 
        res.push({month: months[month-1], friends: [current]}); 
      }
      return res;
  }, [])
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

function findIndexMin(arr) {
  let min = arr[0];
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] < min) min = arr[i];
  }
  return arr.indexOf(min);
}

function getMinimumPresentsPrice(phoneList) {
  if(!Array.isArray(phoneList)) return [];
  let totalPrice = 0;

  const friendsList = phoneList.reduce((res, current) => {
    res.push({ name: current.name, birthdate: current.birthdate, present: undefined });
    const prices = [];
    if("wishList" in current) {
      current.wishList.forEach(element => {
        prices.push(element.price)
      });
      let indexMin = findIndexMin(prices);
      res[phoneList.indexOf(current)].present = current.wishList[indexMin];
      totalPrice += current.wishList[indexMin].price;
    }
    return res;
  }, []);

  return {
    friendsList,
    totalPrice,
  };
};

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
