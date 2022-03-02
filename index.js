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

 function parseDate(date) {
   const newdate = date.split(".").reverse();
  return new Date(newdate[0], newdate[1]-1, newdate[2]);
 }


 const sortData = (d1, d2) => {
  const newD1 = d1.split('.').reverse();
  const newD2 = d2.split('.').reverse();
  return new Date(0 , newD1[1]-1, newD1[2]) - new Date(0, newD2[1]-1, newD2[2]);
 }

 const sortMonth = (d1, d2) => {
  return parseDate(d1).getMonth() - parseDate(d2).getMonth();
 }
 
 function correctData(date) {
  return /^\d{2}\.\d{2}\.\d{4}$/.test(date) && typeof date === 'string';
 };

 
  
  function getNextBirthdays(date, phoneList) {
    if(!Array.isArray(phoneList) || !correctData(date) || phoneList.length === 0) {
      return [];
    }
    let compareDate = parseDate(date);
    let endYearDate = new Date(compareDate.getFullYear(), 11, 31);
    let listBirthdate = phoneList.filter(el => {
        let listBird = parseDate(el.birthdate);
        if (listBird.getFullYear() <= compareDate.getFullYear()){
          if (listBird.getMonth() < endYearDate.getMonth() && listBird.getMonth() > compareDate.getMonth()) {
            return el;
          }
          if (listBird.getMonth() === compareDate.getMonth()) 
            if (listBird.getDate() >= compareDate.getDate())
              return el;
          if (listBird.getMonth() === endYearDate.getMonth())
            if (listBird.getDate() <= endYearDate.getDate())
              return el;
        }
      }
    );
    return listBirthdate.sort((a,b) => {
      return sortData(a.birthdate,b.birthdate);
    });
  };

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
 function getMonthsList(phoneList) {
    if(!Array.isArray(phoneList) || phoneList.length === 0) {
      return [];
    }
    let res = [];
    let months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
    let newPhoneList = phoneList.sort((a,b) => {
      return sortMonth(a.birthdate,b.birthdate);
    });
    let prevMonth;
    let curIndex;
    for (let i = 0; i < newPhoneList.length; i++){
      let curMonth = parseDate(phoneList[i].birthdate).getMonth();
      if (i === 0){
        res.push({month: months[curMonth],friends: [phoneList[i]]});
        prevMonth = res[i].month;
        curIndex = i;
      }else if (prevMonth === months[curMonth]){
        res[curIndex].friends.push(newPhoneList[i]);
        curIndex = res.length - 1;
        prevMonth = res[curIndex].month;
      }  else {
        res.push({month: months[curMonth],friends: [phoneList[i]]});
        curIndex = res.length - 1;
        prevMonth = res[curIndex].month;
      } 
    } 
    return res;
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

 const phoneList = [
  {
    name: 'Александра',
    birthdate: '21.05.2001',
    wishList: [
      {
        title: 'Книга "Изучаем программирование на JavaScript"',
        price: 250,
      },
      {
        title: 'Билет на концерт Макса Коржа',
        price: 1500,
      },
      {
        title: 'Книга "Чистый код. Создание, анализ и рефакторинг"',
        price: 200,
      },
    ],
  },
  {
    name: 'Егор',
    birthdate: '06.08.1976',
    wishList: [
      {
        title: 'Годовой абонимент в библиотеку',
        price: 400,
      },
      {
        title: 'Шариковая ручка',
        price: 750,
      },
    ],
  },
  {
    name: 'Роман',
    birthdate: '14.05.2000',
  },
  {
    name: 'Василий',
    birthdate: '27.02.1980',
    wishList: [
      {
        title: 'Годовой курс обучения на ИРИТ-РтФ',
        price: 100500,
      },
      {
        title: 'Путешествие на Марс',
        price: 999999999,
      },
    ],
  },
];


function getMinimumPresentsPrice(phoneList) {
  if (phoneList.length === 0 || !Array.isArray(phoneList))
    return [];
  let friendsList = [];
  let totalPrice = 0;
  let price = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < phoneList.length; i++) {
    if (!("wishList" in phoneList[i])) {
      friendsList[i] = {
        name: phoneList[i].name,
        birthdate: phoneList[i].birthdate,
        present: undefined
      };
      continue;
    }

    for(let j = 0; j < phoneList[i].wishList.length; j++) {
      if (phoneList[i].wishList[j].price < price){
        friendsList[i] = {
                          name: phoneList[i].name,
                          birthdate: phoneList[i].birthdate,
                          present: {
                                    title: phoneList[i].wishList[j].title,
                                    price: phoneList[i].wishList[j].price 
                                   }
                        };
      price = phoneList[i].wishList[j].price; 
      }
      
    }
    totalPrice += price;
    price = Number.MAX_SAFE_INTEGER;
  }
  return {friendsList: friendsList, totalPrice};
};

getMinimumPresentsPrice(phoneList);


module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };