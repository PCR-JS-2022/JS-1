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

const dateFormat = new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[.-](0?[1-9]|1[012])[.-]\d{4}$/);
// let newPhoneList = [];

const transformDate = (dateString) => {
 const newStr = new Date(dateString.split('.').reverse().join('.'));
 return newStr;
}

const sortData = (a, b) => {
  const aDay = a.birthdate.split('.')[0];
  const bDay = b.birthdate.split('.')[0];
  const aMonth = a.birthdate.split('.')[1];
  const bMonth = b.birthdate.split('.')[1];

  if (aMonth < bMonth) {
    return -1;
  } else if (aMonth == bMonth && aDay < bDay) {
    return -1;
  } else {
    return 1;
  }
}

function getNextBirthdays(date, phoneList) {

  newPhoneList = [];

  if (dateFormat.test(date) && Array.isArray(phoneList)) {
    phoneList.map((contact) => {
      
      const endOfTheYear = new Date(new Date().getFullYear(), 11, 31);
      const dateTime = transformDate(date);
      const contactBirthdate = transformDate(contact.birthdate);
      
      if (dateTime.getFullYear() < endOfTheYear.getFullYear() && dateTime.getFullYear() >= contactBirthdate.getFullYear() && contactBirthdate.getFullYear() < endOfTheYear.getFullYear()) {
        if (dateTime.getMonth() < contactBirthdate.getMonth()) {
          newPhoneList.push(contact);
        } else if (dateTime.getMonth() === contactBirthdate.getMonth() && dateTime.getDate() <= contactBirthdate.getDate()) {
          newPhoneList.push(contact);
        }
      }


      newPhoneList.sort((a, b) => {
        return sortData(a,b);
      });
     
    })
  } else {
      newPhoneList = [];
  }
  console.log(newPhoneList);
  return newPhoneList;
};

getNextBirthdays('28.02.1980', phoneList);

/**
* @param {Array<Person>} phoneList - список друзей из телефонной книги
* @returns {Array<{
*    month: string,
*    friends: Array<Person>,
*  }>}
*/
const result = [
  {
    month: "Январь",
    friends: [],
  },
  {
    month: "Февраль",
    friends: [],
  },
  {
    month: "Март",
    friends: [],
  },
  {
    month: "Апрель",
    friends: [],
  },
  {
    month: "Май",
    friends: [],
  },
  {
    month: "Июнь",
    friends: [],
  },
  {
    month: "Июль",
    friends: [],
  },
  {
    month: "Август",
    friends: [],
  },
  {
    month: "Сентябрь",
    friends: [],
  },
  {
    month: "Октябрь",
    friends: [],
  },
  {
    month: "Ноябрь",
    friends: [],
  },
  {
    month: "Декабрь",
    friends: [],
  },
]

let finalRes = [];
function getMonthsList(phoneList) {

  finalRes = [];

  if (Array.isArray(phoneList)) { 
    const sortPhoneList = phoneList.sort((a, b) => {
      return sortData(a, b);
    });
    sortPhoneList.map(data => {
      // console.log(data)
      const month = transformDate(data.birthdate).getMonth();
      Object.keys(result).map((item) => {
        if (item == month) {
          result[item].friends.push(data);
        }
        
      });
    })
  } else {
    newPhoneList = [];
  }

  Object.keys(result).map((item) => {
    if ((result[item].friends).length > 0) {
      finalRes.push(result[item]);
    } 
  })
  
  console.log(finalRes);
  return finalRes;
};

getMonthsList(phoneList);


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

const phoneList3 = [
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

let minPresentsPrice = {
  friendsList : [],
  totalPrice: 0,
};

function getMinimumPresentsPrice(phoneList) {

  minPresentsPrice = {
    friendsList : [],
    totalPrice: 0,
  }

  if (Array.isArray(phoneList3)) { 
      phoneList3.map(data => {
        let minPriceArray = [];
        if (data.wishList) {
          const wishListArray = data.wishList.map(item => {
            return item;
          });
        
          wishListArray.forEach((item) => {
            minPriceArray.push(item.price);
          });
        
          const minimumPrice = Math.min(...minPriceArray);  
        
          wishListArray.filter((item) => {
            if (item.price === minimumPrice) {
              minPresentsPrice.totalPrice += item.price;
              data.wishList = item;
              return item;
            } 
          });
          
          data['present'] = data['wishList'];
          delete data['wishList'];
  
          minPresentsPrice.friendsList.push(data);
        }
        else if (!data.wishList) {
          data.wishList = undefined;
          minPresentsPrice.totalPrice += 0;
          data['present'] = data['wishList'];
          delete data['wishList'];
          minPresentsPrice.friendsList.push(data);
        }
      })
     console.log(minPresentsPrice);
     return minPresentsPrice;
    } else {
      phoneList3 = [];
      console.log(phoneList3);
      return phoneList3;
    }    
};

getMinimumPresentsPrice(phoneList);

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
