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
    let result = Array();
    if (!checkDateFormat(date) || !Array.isArray(phoneList)) return result;

    console.log(phoneList.values);
    phoneList.forEach(
        (el, ind) => {
            if (checkDateIsAfter(date, el.birthdate) && checkYearIsBefore(el.birthdate, getLastDayOfYear(date))) {
                result.push(el);
            }
        }   
    );

    return result;
};

function checkDateFormat (date) {
    if (typeof date != 'string') return false;

    let splitDate = date.split('.');
    if (splitDate.length != 3) return false;

    return splitDate.every((el) => !isNaN(el));
}

function checkDateIsAfter(dateStart, dateCurrent) {
    let start = dateStart.split('.').map(
        (el, ind) => Number(el)
    );
    let current = dateCurrent.split('.').map(
        (el, ind) => Number(el)
    );
    
    if (current[1] > start[1]) return true;
    if (current[1] == start[1] && current[0] >= start[0]) return true;

    return false;
}

function getLastDayOfYear(date) {
    let year = Number(date.split('.')[2])
    return "31.12." + year;
}

function checkYearIsBefore(dateCurrent, dateEnd) {
    let end = dateEnd.split('.').map(
        (el, ind) => Number(el)
    );
    let current = dateCurrent.split('.').map(
        (el, ind) => Number(el)
    );

    return current[2] <= end[2];
}

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
function getMonthsList(phoneList) {
    const months = {'январь' : [], 'февраль' : [], 'март' : [], 'апрель' : [], 'май' : [],
                    'июнь' : [], 'июль': [], 'август' : [], 'сентябрь' : [], 'октябрь' : [], 
                    'ноябрь' : [], 'декабрь' : []};

    const monthNames = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']

    let result = Array();
    if (!Array.isArray(phoneList)) return result;

    phoneList.forEach(
        (el, ind) => months[monthNames[getBirthMonth(el.birthdate)-1]].push(el)
    );

    for (const key in months) {
        if (months[key].length > 0) {
            result.push({'month' : key, 'friends' : months[key]});
        }
    }    

    return result;
};

function getBirthMonth(date) {
    return Number(date.split('.')[1]);
}

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
    let friendsList = Array();
    let totalPrice = 0;
    if (!Array.isArray(phoneList)) return friendsList;

    phoneList.forEach(
        (el, ind) => {
            let present = getCheapiestPresent(el.wishList);
            friendsList.push({'name' : el.name, 'birthdate' : el.birthdate, 'present' : present});
            totalPrice += (present == undefined) ? 0 : present.price;
        }
    );

    return {'friendsList' : friendsList, 'totalPrice' : totalPrice};
};

function getCheapiestPresent(presentList) {
    if (presentList == undefined) return undefined;

    let price = Number.MAX_SAFE_INTEGER;
    let title = '';

    presentList.forEach(
        (el, ind) => {
            if (el.price < price) {
                price = el.price;
                title = el.title;
            }
        }
    );

    return {'title' : title, 'price' : price };
}

// module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };

/*
console.log(checkDateFormat('12.12.2001'))
console.log(checkDateFormat('1212.2001'))
console.log(checkDateFormat('1a2.12.2001'))
console.log(checkDateFormat('1a.12.2001'))
console.log(checkDateFormat('a2.12.2001'))
console.log(checkDateFormat('02.12.2001'))
*/

/*
console.log(checkDateIsAfter('01.01.2000', '02.01.2000'));
console.log(checkDateIsAfter('02.03.2000', '02.01.2000'));
console.log(checkDateIsAfter('01.01.2000', '02.01.2001'));
console.log(checkDateIsAfter('11.01.2000', '02.01.2000'));
*/

/*
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
*/

//getNextBirthdays('28.02.1980', phoneList);
  
/*
  [
    {
      name: 'Егор',
      birthdate: '06.08.1976',
    },
  ];
*/

//getMonthsList(phoneList);

/*
[
   {
      month: 'февраль',
      friends: [
         {
            name: 'Василий',
            birthdate: '27.02.1980'
         }
      ]
   },
   {
      month: 'апрель',
      friends: [
         {
            name: 'Роман',
            birthdate: '14.04.2000'
         }
      ]
   },
   {
      month: 'май',
      friends: [
         {
            name: 'Александра',
            birthdate: '21.05.2001'
         }
      ]
   },
   {
      month: 'август',
      friends: [
         {
            name: 'Егор',
            birthdate: '06.08.1976'
         }
      ]
   }
]
*/

/*
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

  */
  
// getMinimumPresentsPrice(phoneList);
  /*
  {
     friendsList: [
        {
           name: 'Александра',
           birthdate: '21.05.2001',
           present: {
              title: 'Книга "Чистый код. Создание, анализ и рефакторинг"',
              price: 200
           }
        },
        {
           name: 'Егор',
           birthdate: '06.08.1976',
           present: {
              title: 'Годовой абонимент в библиотеку',
              price: 400
           }
        },
        {
           name: 'Роман',
           birthdate: '14.05.2000',
            present: undefined,
        },
        {
           name: 'Василий',
           birthdate: '27.02.1980',
           present:{
              title: 'Годовой курс обучения на ИРИТ-РтФ',
              price: 100500
           }
        }
     ],
     totalPrice: 101100
  }
  */