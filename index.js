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
    .sort((first, second) => {
        const reversedFirstBirthdate = getReversedDate(first.birthdate);
        const reversedSecondBirthdate = getReversedDate(second.birthdate);
        return reversedFirstBirthdate > reversedSecondBirthdate ? 1 : -1;
    });
};

function getReversedDate(date) {
    const dateArray = date.split('.').reverse();
    const reversedDate = `${dateArray[0]}.${dateArray[1]}.${dateArray[2]}`;

    return reversedDate;
}

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
