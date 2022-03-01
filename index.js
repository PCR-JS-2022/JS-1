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
    if(!Array.isArray(phoneList) || !checkDate(date) || phoneList.length === 0) return [];
    date = date.split('.');
    let dateYear = +date[2];
    let dateMonth = +date[1];
    let dateDay = +date[0];
    let sortedPhoneList = phoneList.filter(e => {
    let friendDate = (e.birthdate.split('.'));
    let friendYear = +friendDate[2];
    let friendMonth = +friendDate[1];
    let friendDays = +friendDate[0];
    if (friendYear <= dateYear){ 
      if (friendMonth > dateMonth){
          return e;}
      if (friendMonth === dateMonth)
        if (friendDays >= dateDay) 
          return e;}
    })
    return sortedPhoneList.sort((a, b) => {
      const friend1 = getDate(a.birthdate);
      const friend2 = getDate(b.birthdate);
  
      return friend2 - friend1;
    })
  };
  
  function getDate(date){
    date = date.split('.');
    let corrDate = new Date();
    corrDate.setFullYear(date[2], date[1] - 1 ,date[0]);
    return corrDate;
  }
  
  function checkDate(date){
    if(typeof date !== 'string')
      return false;
    date = date.split('.');
    return (date.length === 3 && date[0].length === 2 &&
      date[1].length === 2 && date[2].length === 4);
  }
  
  /**
   * @param {Array<Person>} phoneList - список друзей из телефонной книги
   * @returns {Array<{
   *    month: string,
   *    friends: Array<Person>,
   *  }>}
   */

  function getMonthsList(phoneList){
    if (!Array.isArray(phoneList)) return [];

    const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

    const birthdays = months.map((e) => {
        return {month: e, friends: []}
    });

    phoneList.forEach((e) => {
        let date = e.birthdate.split('.');
        let month = date[1];
        for(let i = 0; i < 11; i++){
            if(i + 1 == month)
                birthdays[i].friends.push(e);
        }
      })
    
      return birthdays.filter((e) => {
        if(e.friends.length !== 0) return e;
      });
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
    if(!Array.isArray(phoneList)) return [];

    let presentsList = {
        friendsList: [], 
        totalPrice: 0
    };

    phoneList.forEach((e) => {
        if(Array.isArray(e.wishList)){
            e.wishList.sort((a, b) => {
                return a.price - b.price;
            });
            // console.log(e.wishList);

            e.present = e.wishList[0];
            presentsList.friendsList.push(e);
            presentsList.totalPrice += (e.present.price);
            delete e.wishList;
        }
        else {
          e.present = undefined;
          presentsList.friendsList.push(e);
        }
      });
      
      return presentsList;
    }
  





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
  console.log(getMinimumPresentsPrice(phoneList));

  
  module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
