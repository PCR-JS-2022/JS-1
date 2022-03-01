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
 
function checkDateCorrect(date){
    const splitDate = date.split('.');
    const startDate = getObjectDate(date)
    if (typeof(date) !== "string" || splitDate.length != 3 && splitDate[0].length != 2 && splitDate[1].length != 2 &&
    splitDate[2].length != 4) return false;
    else return startDate
}


function getObjectDate(date) {
    return new Date(splitDate[2], splitDate[1] - 1, splitDate[0]);
  }

function getNextBirthdays(date, phoneList) {
    if(checkDateCorrect == false || !Array.isArray(phoneList) || phoneList.length === 0) return [];
    
    let sortedPhoneList = phoneList.filter((e) => {
        const friendDate = getObjectDate(e.birthdate);

    return phoneList.filter(phone => {
        const birthdate = getObjectDate(phone.birthdate);
        dates[phone.birthdate] = birthdate;
        const whenBirthdateLessStartDate = birthdate <= startDate;
        birthdate.setFullYear(startDayYear);
        return birthdateSmallerThanStartDate && birthdate >= startDate;
    }).sort((a, b) => {
        return dates[a.birthdate] - dates[b.birthdate]
    })
    
};

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
export function getMonthsList(phoneList) {

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
export function getMinimumPresentsPrice(phoneList) {

};

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
