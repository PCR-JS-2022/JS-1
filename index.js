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
    const regex = new RegExp("^(\d{2}[.]){2}\d{4}$");
    if (!regex.test(date) || !Array.isArray(phoneList))
        return [];

    phoneList.filter((person) => {
        const reversedBirthdate = getReversedDate(person.birthdate);
        const reversedDate = getReversedDate(date);

        return reversedDate < reversedBirthdate;
    })
    .sort(sortByBirthdate);

    return phoneList;
};

function getReversedDate(date) {
    const dateArray = date.split('.').reverse();
    const reversedDate = `${dateArray[0]}.${dateArray[1]}.${dateArray[2]}`;

    return reversedDate;
}

function sortByBirthdate(first, second) {
    const reversedFirstBirthdate = getReversedDate(first.birthdate);
    const reversedSecondBirthdate = getReversedDate(second.birthdate);
    return reversedFirstBirthdate > reversedSecondBirthdate ? 1 : -1;
}

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
export function getMonthsList(phoneList) {
    if (!Array.isArray(phoneList))
        return [];

    var monthNames = {
        1: "январь", 
        2: "февраль", 
        3: "март", 
        4: "апрель", 
        5: "май", 
        6: "июнь", 
        7: "июль", 
        8: "август", 
        9: "сентябрь", 
        10: "октябрь", 
        11: "ноябрь", 
        12: "декабрь", 
    };

    var monthList = [];

    phoneList.forEach((person) => {
        const monthNumber = parseInt(person.birthdate.split('.')[1]);
        const monthName = monthNames[monthNumber];

        if (monthList.some((month) => {
            return month.month === monthName
        }))
            month.friends.push(person);
        else 
            monthList.push({
                month: monthName,
                friends: [person]
            });
    })

    monthList.forEach((month) => month.friends.sort(sortByBirthdate));

    return monthList;
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
