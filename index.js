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
    const dateFrom = parseRuDate(date);

    if (!Array.isArray(phoneList) || phoneList.length === 0 || dateFrom === null) {
        return [];
    }

    const result = [];
    const dateFromTime = dateFrom.getTime();
    const currentTime = Date.now();

    for (const phone of phoneList) {
        const birthdate = parseRuDate(phone.birthdate);
        if (birthdate === null) {
            return [];
        }

        const birthdateTime = birthdate.getTime();
        if (dateFromTime > birthdateTime || birthdateTime > currentTime) {
            continue;
        }

        result.push(phone);
    }

    return result.sort((a, b) => {
        return parseRuDate(a.birthdate).getTime() - parseRuDate(b.birthdate).getTime()
    });
};

/**
 * @param {string} date - дата отсчета
 * @returns {Date} дата
 */
function parseRuDate(date) {
    if (typeof date !== 'string') {
        return null;
    }

    const split = date.split('.');
    if (split.length !== 3) {
        return null;
    }

    const parseToIntList = split.map(el => parseInt(el));

    if (parseToIntList.find(el => isNaN(el))) {
        return null;
    }

    return new Date(parseToIntList[2], parseToIntList[1] - 1, parseToIntList[0]);
}

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
export function getMonthsList(phoneList) {
    if (!Array.isArray(phoneList) || phoneList.length === 0) {
        return [];
    }

    const sortedPhoneListByMonth = phoneList.sort((a, b) => {
        const aMonth = getMonthFomDate(a.birthdate)
        const bMonth = getMonthFomDate(b.birthdate);
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

        if (result[currentIndex].friends.length > 1) {
            result[currentIndex].friends = result[currentIndex].friends.sort((a, b) => {
                const aDate = parseRuDate(a.birthdate);
                const bDate = parseRuDate(b.birthdate);
                return aDate.getTime() - bDate.getTime();
            })
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
function getMonthFomDate(date) {
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
 export function getMinimumPresentsPrice(phoneList) {
    if (!Array.isArray(phoneList) || phoneList.length === 0 ) {
        return [];
    }

    let totalPrice = 0;
    const friendsList = [];

    for (let phone of phoneList) {
        const present = phone.wishList?.sort((gift1, gift2) => gift1.price - gift2.price)[0];
        totalPrice += present?.price || 0;
        friendsList.push({name: phone.name, birthdate: phone.birthdate, present});
    }

    return {totalPrice, friendsList};
};

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
