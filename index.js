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
    const sortedPhoneList = phoneList.filter(e => {
    const friendDate = (e.birthdate.split('.'));
    if (+friendDate[2] <= +date[2]){ 
        if (+friendDate[1] > +date[1]){
            return e;}
        if (+friendDate[1] === +date[1])
            if (+friendDate[0] >= +date[0]) 
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
    const corrDate = new Date();
    corrDate.setFullYear(date[2], date[1] - 1 , date[0]);
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
        const date = e.birthdate.split('.');
        for(let i = 0; i < 11; i++){
            if(i + 1 == date[1])
                birthdays[i].friends.push(e);
        }
    })
    
    return birthdays.filter((e) => {
    if(e.friends.length !== 0) 
        return e;
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
  module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
