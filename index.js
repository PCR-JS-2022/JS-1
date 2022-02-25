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
    const startDate = parseRuDate(date);

    if (!Array.isArray(phoneList) || phoneList.length === 0 || startDate === null) {
        return [];
    }

    const startDayYear = startDate.getFullYear();
    const dates = {};

    return phoneList.filter(phone => {
        const birthdate = parseRuDate(phone.birthdate);
        dates[phone.birthdate] = birthdate;
        const birthdateSmallerThanStartDate = birthdate <= startDate;
        birthdate.setFullYear(startDayYear);
        return birthdateSmallerThanStartDate && birthdate >= startDate;
    }).sort((a, b) => {
        return dates[a.birthdate] - dates[b.birthdate]
    })
};

/**
 * @param {string} date - дата отсчета
 * @returns {Date} дата
 */
function parseRuDate(date) {
    const dateRegex = /^\d{2}.\d{2}.\d{4}$/
    if (typeof date !== 'string' || !date.match(dateRegex)) {
        return null;
    }

    const split = date.split('.').map(el => parseInt(el));
    
    return new Date(split[2], split[1] - 1, split[0]);
}

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

    const sortedPhoneListByMonth = phoneList.sort((a, b) => {
        const aMonth = getMonthFromDate(a.birthdate)
        const bMonth = getMonthFromDate(b.birthdate);
        return aMonth - bMonth;
    });

    const result = [];
    let prevMonthNumber = parseInt(sortedPhoneListByMonth[0].birthdate.slice(3, 5));
    let monthName = getMonthName(prevMonthNumber);
    let currentIndex = 0;
    result.push({ month: monthName,friends: [] });

    for (const el of sortedPhoneListByMonth) {
        const monthNumber = parseInt(el.birthdate.slice(3, 5));
        if (monthNumber === prevMonthNumber) {
            result[currentIndex].friends.push(el);
            continue;
        }
        
        currentIndex++;
        prevMonthNumber = monthNumber;
        monthName = getMonthName(prevMonthNumber);
        result.push({month: monthName, friends: [el]})
    }

    return result;
};

function getMonthName(month) {
    if (typeof month !== 'number') {
        return null;
    }

    switch (month) {
        case 1: return 'январь';
        case 2: return 'февраль';
        case 3: return 'март';
        case 4: return 'апрель';
        case 5: return 'май';
        case 6: return 'июнь';
        case 7: return 'июль';
        case 8: return 'август';
        case 9: return 'сентябрь';
        case 10: return 'октябрь';
        case 11: return 'ноябрь';
        case 12: return 'декабрь';
        default: return null;
    }
}

/**
 * @param {string} date - Дата
 * @returns {number}
 */
function getMonthFromDate(date) {
    return parseInt(date.slice(3, 5));
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

    let totalPrice = 0;
    const friendsList = [];

    for (let phone of phoneList) {
        const present = phone.wishList?.sort((gift1, gift2) => gift1.price - gift2.price)[0];
        totalPrice += present?.price || 0;
        let friend = {name: phone.name, birthdate: phone.birthdate, present};
        friendsList.push(friend);
    }

    return {totalPrice, friendsList};
};

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
