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
    {
        name: "Максим",
        birthdate: "18.02.2001",
    }
  ];

  const phoneListWithWishList = [
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
  
 console.log(getNextBirthdays('26.02.1981', phoneList))
 // getMonthsList(phoneList).forEach(p => console.log(p));
 //console.log(getMinimumPresentsPrice(phoneListWithWishList));

/**
 * @param {string} date - дата отсчета
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<Person>} массив друзей, у которых дни рождения после даты отсчета
 */
 function getNextBirthdays(date, phoneList) {
     const dateTimeFrom = parseDateSeparatedByDots(date);
     if(dateTimeFrom.getDay() === NaN || !phoneList instanceof Array)
        return [];
     return phoneList
     .filter(person => filterByBirthday(dateTimeFrom, parseDateSeparatedByDots(person.birthdate)))
     .sort((a,b) => sortByBirthDay(parseDateSeparatedByDots(a.birthdate),parseDateSeparatedByDots(b.birthdate)));
};


function sortByBirthDay(firstDate, secondDate)
{
    const firstDateWithoutYear = new Date(0, firstDate.getMonth(), firstDate.getDate())
    const secondDateWithoutYear = new Date(0, secondDate.getMonth(), secondDate.getDate())
    if(firstDateWithoutYear < secondDateWithoutYear)
        return -1;
    else if(firstDateWithoutYear > secondDateWithoutYear)
        return 1;
    else
        return 0;       
}

function parseDateSeparatedByDots(date){
    [day, month, year] = date.split('.');
    return new Date(year, month, day)
}

function filterByBirthday(dateFrom, birthdate)
{   
    return birthdate <= dateFrom
    && new Date(0, dateFrom.getMonth(), dateFrom.getDate()) <= new Date(0, dateFrom.getMonth(), dateFrom.getDate());
}

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
function getMonthsList(phoneList) {
    const months = 
    ['январь', 'февраль', 'март', 'апрель', 'май', "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"]
     const personsSeparatedByMonth = new Map();
     const result = [];
    phoneList.forEach(person =>{
        const monthNumber = Number(person.birthdate.split('.')[1]) - 1;
        const month = months[monthNumber];
        if(personsSeparatedByMonth.has(month))
            personsSeparatedByMonth.get(month).push(person);
        else
            personsSeparatedByMonth.set(month, [person]);
    })
    personsSeparatedByMonth.forEach((value, key) => {
        result.push({
            month: key,
            friends: value,
        });
    })
    return result;
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
    if(!phoneList instanceof Array)
        return [];
    const result = {
        friendsList: [],
        totalPrice: 0,
    };
    phoneList.forEach(person =>{
        const cheapestGift = person.wishList !== undefined 
        ? person.wishList.sort((a,b) => {
            if(a.price < b.price)
                return -1;
            else if(a.price > b.price)
                return 1;
            else
                return 0;
        })[0]
        : null;
        const personInfo = {
            name: person.name,
            birthdate: person.birthdate,
            present: cheapestGift === null ? undefined : cheapestGift,
        }
        result.friendsList.push(personInfo);
        result.totalPrice += cheapestGift !== null ? cheapestGift.price : 0;
    })
    return result;
};


module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
