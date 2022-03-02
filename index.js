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

const incorrectDate = (date) => {
    let _date = date.split(".")
    return (_date[0] < 1 || _date[0] > 31) && (_date[1] < 1 || _date[1] > 12) && (_date[2] < 1000 || _date[2] > 9999)
}

export function getNextBirthdays(date, phoneList) {
    let today = date.split('.');
    let nextBirthdays = []

    if (incorrectDate(date) || !(Array.isArray(phoneList)))
        return []
    else phoneList.forEach(element => {
        let listDate = element.birthdate.split('.')

        if (((listDate[2] <= today[2] && listDate[1] > today[1]) ||
            (listDate[2] <= today[2] && listDate[1] == today[1] && listDate[0] > today[0])) &&
            !(incorrectDate(element.birthdate)))
            nextBirthdays.push(element)
    });
    nextBirthdays.sort((a, b) => a.birthdate.split('.')[1] > b.birthdate.split('.')[1] ? 1 : -1)
    return nextBirthdays
};

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
export function getMonthsList(phoneList) {

    if (!(Array.isArray(phoneList))) {
        return []
    }

    const monthName = {
        1: 'январь',
        2: 'февраль',
        3: 'март',
        4: 'апрель',
        5: 'май',
        6: 'июнь',
        7: 'июль',
        8: 'август',
        9: 'сентябрь',
        10: 'октябрь',
        11: 'ноябрь',
        12: 'декабрь'
    };

    let monthsList = []
    phoneList.sort((a, b) => a.birthdate.split('.')[1] > b.birthdate.split('.')[1] ? 1 : -1)
    phoneList.forEach(element => {
        let month = element.birthdate.split('.')[1]
        let flag = false
        for (let m of monthsList) {
            if (m.month == monthName[parseInt(month)]) {
                m.friends.push(element);
                flag = true
                break;
            }

        }
        if (!flag) {
            monthsList.push({
                month: monthName[parseInt(month)],
                friends: [element]
            })
        }
    })
    return monthsList
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
