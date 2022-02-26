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
    if (!Array.isArray(phoneList) && !parseDateFormat(date)) {
        return [];
    }

    return phoneList.filter(item => parseDateFormat(item.birthdate) > parseDateFormat(date) && parseDateFormat(item.birthdate).getMonth() <= 11 && parseDateFormat(item.birthdate).getFullYear() === parseDateFormat(date).getFullYear()).sort((a, b) => {
        return parseDateFormat(a).getDate() - parseDateFormat(b).getDate();
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
    if (!Array.isArray(phoneList)) {
        return [];
    }

    const newArray = [];
    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

    phoneList.sort((a, b) => parseDateFormat(a.birthdate).getMonth() - parseDateFormat(b.birthdate).getMonth());

    phoneList.forEach(item => {
        if (newArray.findIndex(m => m.month === months[parseDateFormat(item.birthdate).getMonth()]) > -1) {
            newArray[newArray.findIndex(m => m.month === months[parseDateFormat(item.birthdate).getMonth()])].friends.push(item);
        } else {
            newArray.push({
                month: months[parseDateFormat(item.birthdate).getMonth()],
                friends: [
                    item
                ]
            })
        }
    });

    return newArray;
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

    const friendsObject = phoneList.map(item => {
        return {
            name: item.name,
            birthdate: item.birthdate,
            present: item.wishList ? item.wishList.filter(i => i.price === Math.min(...item.wishList.map(p => p.price)))[0] : undefined
        }
    });

    friendsObject.totalPrice = friendsObject.filter(item => typeof item.present === 'object').reduce((prev, curr) => prev + curr.present.price, 0);

    return friendsObject;
};

/**
 * форматируем строку формата dd.mm.yyyy в дату
 * @param {string} date строка формата dd.mm.yyyy
 * @returns {Date} дата
*/
function parseDateFormat(date) {
    if (/[0[1-9]|[11-31]{2}\.(0[1-9]|1[012])\.\d{4}/.test(date)) {
        return new Date(`${date.toString().split('.')[2]}.${date.toString().split('.')[1]}.${date.toString().split('.')[0]}`);
    } else {
        return null;
    }
}

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
