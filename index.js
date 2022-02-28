const { parseDate, validDate } = require("./parseData");
const { parseMonth } = require("./parseMonth");


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
    if (!Array.isArray(phoneList) || !validDate(date)) {
        return [];
    }

    let compareDate = parseDate(date)

    let compareDateYear = compareDate.getFullYear()
    let compareDateMonth = compareDate.getMonth()
    let compareDateDay = compareDate.getDay()

    let listBirthday = phoneList.filter((phone) => {
        let birthday = parseDate(phone.birthdate)
        let year = birthday.getFullYear() < compareDateYear
        let month = birthday.getMonth() > compareDateMonth
        let day = ((birthday.getMonth() === compareDateMonth) && (birthday.getDay() >= compareDateDay))
        return year && (month || day) || date === phone.birthdate
    })

    return listBirthday.sort((a, b) => {
        let a_birthday = parseDate(a.birthdate)
        let b_birthday = parseDate(b.birthdate)
        return b_birthday - a_birthday
    })
};

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
function getMonthsList(phoneList) {
    if (!Array.isArray(phoneList) || phoneList.length === 0) {
        return [];
    }
    answer = {}
    console.log("text")
    phoneList.map((friend) => {
        let month = parseInt(friend.birthdate.slice(3, 5))
        if (answer.hasOwnProperty(month)){
            answer[month].push(friend)
        } else {
            answer[month] = [friend]
        }
    });

    res = []
    Object.entries(answer).forEach(([m, friends]) => {
        let month = parseMonth(m)
        res.push({month, friends})
    });

    return JSON.stringify(res)
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
    if (!Array.isArray(phoneList)) {
        return [];
    }

    let totalPrice = 0;
    let friendsList = [];

    phoneList.map((phone) => {
        let name = phone.name
        let birthdate = phone.birthdate
        if (!Array.isArray(phone.wishList)) {
            let present = undefined
            friendsList.push({name, birthdate, present})
        } else {
            let present = phone.wishList.sort((a, b) => {
                return a.price - b.price
            })[0]
            totalPrice += present.price
            friendsList.push({name, birthdate, present})
        }
    })

    return {
        friendsList,
        totalPrice
    };
};


module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };