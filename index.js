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
   let newdate = date.split(".").reverse();
  return new Date(newdate[0], newdate[1]-1, newdate[2]);
 }


 const sortData = (d1, d2) => {
  return parseDate(d1) - parseDate(d2);
 }

 const sortMonth = (d1, d2) => {
  return parseDate(d1).getMonth() - parseDate(d2).getMonth();
 }
 
 function correctData(date) {
  return /^\d{2}\.\d{2}\.\d{4}$/.test(date) && typeof date === 'string';
 };

 
  
  function getNextBirthdays(date, phoneList) {
    if(!Array.isArray(phoneList) && !correctData(date) ) {
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
            if (listBird.getDate() > compareDate.getDate())
              return el;
          if (listBird.getMonth() === endYearDate.getMonth())
            if (listBird.getDate() < endYearDate.getDate())
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
    if(!Array.isArray(phoneList))
      return [];
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
function getMinimumPresentsPrice(phoneList) {

};

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };