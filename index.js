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
export function getNextBirthdays(date, phoneList) {
    if (typeof (date) !== "string") return []
    const arraydate = date.split('.');
    const startday = +arraydate[0];
    const startmonth = +arraydate[1];
    const startyear = +arraydate[2];
    function checkdate(date) {
        if (startday.length != 2 && startmonth.length != 2 && startyear.length != 4)
            return false
    };
    if (!Array.isArray(phoneList) || checkdate(date))
        return [];

    const filterdate = phoneList.filter(function (item) {
        const arraybirthdate = item.birthdate.split('.');
        const taskday = +arraybirthdate[0];
        const taskmonth = +arraybirthdate[1];
        const taskyear = +arraybirthdate[2];
        if (startyear >= taskyear && (startmonth < taskmonth || startmonth == taskmonth && startday <= taskday)) {
            return true
        }
    });
    const sort = filterdate.sort(function (a, b) {
        return (new Date(0, a.birthdate.split('.')[1], a.birthdate.split('.')[0]) -
            new Date(0, b.birthdate.split('.')[1], b.birthdate.split('.')[0]))
    });
    return sort;
};

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
export function getMonthsList(phoneList) {
    let newlist = []
    if (!Array.isArray(phoneList)) return []
    const months = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"]
    const sort = phoneList.sort(function (a, b) {
        return (new Date(0, a.birthdate.split('.')[1], a.birthdate.split('.')[0]) -
            new Date(0, b.birthdate.split('.')[1], b.birthdate.split('.')[0]))
    });
    phoneList.map(function (item) {
        const month = item.birthdate.split('.')[1]
        return newlist.push({ month: months[month - 1], friends: [item] })
    })
    return newlist
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
