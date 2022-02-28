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
    if (!Array.isArray(phoneList) || !isDateValid(date)) {
        return [];
    }
    const [targetDay, targetMonth, targetYear] = date.split('.').map(x => +x);
    return phoneList
        .filter(friend => {
            const [currentDay, currentMonth, currentYear] = friend.birthdate.split('.').map(x => +x);
            return ((currentYear < targetYear) &&
                    ((currentMonth > targetMonth) || (currentDay >= targetDay && currentMonth === targetMonth)))
                || friend.birthdate === date
        })
        .sort((friend1, friend2) =>
            compareFunction(getObjectDate(friend1.birthdate), getObjectDate(friend2.birthdate)))
}

function isDateValid(date) {
    if (typeof date !== "string") return false;
    return /^\d{2}.\d{2}.\d{4}$/.test(date);
}

function getObjectDate(date) {
    return new Date(date.replace(/(\d+).(\d+).(\d+)/, '$3-$2-$1'));
}

function compareFunction(a, b) {
    const firstDate = new Date(0, a.getMonth(), a.getDate())
    const secondDate = new Date(0, b.getMonth(), b.getDate())
    return firstDate - secondDate;
}

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
function getMonthsList(phoneList) {
    let monthsList = [];
    if (!Array.isArray(phoneList) || phoneList.length === 0) {
        return [];
    }

    phoneList
        .sort((friend1, friend2) =>
            compareFunction(getObjectDate(friend1.birthdate), getObjectDate(friend2.birthdate)))
        .map(friend => {
            const month = friend.birthdate.split('.')[1];
            if (monthsList.length === 0 || monthsList.every(m => m.month !== months[month])) {
                monthsList.push({month: months[month], friends: [friend]});
            } else {
                monthsList[monthsList.findIndex(m => m.month === months[month])].friends.push(friend);
            }
        })
    return monthsList;
}

const months = {
    "01": 'январь',
    "02": 'февраль',
    "03": 'март',
    "04": 'апрель',
    "05": 'май',
    "06": 'июнь',
    "07": 'июль',
    "08": 'август',
    "09": 'сентябрь',
    "10": 'октябрь',
    "11": 'ноябрь',
    "12": 'декабрь'
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
    if (!Array.isArray(phoneList)) {
        return [];
    }
    let resultList = { friendsList: [], totalPrice: undefined };
    let totalPrice = 0;
    phoneList.map(friend => {
        if (!friend.wishList) {
            resultList.friendsList.push({name: friend.name, birthdate: friend.birthdate, present: undefined})
        } else {
            let sortedGifts = friend.wishList.sort((a, b) => a.price - b.price);
            resultList.friendsList.push({name: friend.name, birthdate: friend.birthdate, present: sortedGifts[0]})
            totalPrice += sortedGifts[0].price;
        }
    })
    resultList.totalPrice = totalPrice;
    return resultList;
}

module.exports = {getNextBirthdays, getMonthsList, getMinimumPresentsPrice};
