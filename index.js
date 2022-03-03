const months = new Map([
        [0, 'январь'],
        [1, 'февраль'],
        [2, 'март'],
        [3, 'апрель'],
        [4, 'май'],
        [5, 'июнь'],
        [6, 'июль'],
        [7, 'август'],
        [8, 'сентябрь'],
        [9, 'октябрь'],
        [10, 'ноябрь'],
        [11, 'декабрь']
    ]
);
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
    let resultArray = [];
    date = getCorrectDate(date);
    if (Array.isArray(phoneList) && typeof date == 'object') {
        for (let i = 0; i < phoneList.length; i++) {
            let tempBirthdate = getCorrectDate(phoneList[i].birthdate);
            if (tempBirthdate === false)
                return [];
            if (tempBirthdate.getFullYear() <= date.getFullYear()
                && +tempBirthdate.getMonth() - +date.getMonth() > 0) {
                resultArray.push(phoneList[i]);
            }
            if (tempBirthdate.getFullYear() <= date.getFullYear()
                && +tempBirthdate.getMonth() - +date.getMonth() === 0
                && +tempBirthdate.getDate() - +date.getDate() >= 0) {
                resultArray.push(phoneList[i]);
            }
        }
        resultArray.sort(function (a, b) {
            if (getCorrectDate(a.birthdate).getMonth() > getCorrectDate(b.birthdate).getMonth())
                return 1;
            else if (getCorrectDate(a.birthdate).getMonth() === getCorrectDate(b.birthdate).getMonth()
                && getCorrectDate(a.birthdate).getDate() > getCorrectDate(b.birthdate).getDate()) {
                return 1;
            } else if (getCorrectDate(a.birthdate).getMonth() === getCorrectDate(b.birthdate).getMonth()
                && getCorrectDate(a.birthdate).getDate() === getCorrectDate(b.birthdate).getDate()) {
                return 0;
            } else return -1;
        })

        return resultArray;
    }
    return [];
}
;

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
function getMonthsList(phoneList) {
    let resultArray = [];
    if (!Array.isArray(phoneList) || phoneList.length === 0)
        return [];
    for (let person of phoneList) {
        let tempBirthdate = getCorrectDate(person.birthdate);
        if (tempBirthdate === false) {
            return [];
        }
        let findElement = resultArray.find(function (element, index, array) {
            return element.month === months.get(tempBirthdate.getMonth());
        });

        if (findElement === undefined) {
            resultArray.push({
                'month': months.get(tempBirthdate.getMonth()),
                'friends': [person]
            });
        } else {
            findElement.friends.push(person);
        }
    }
    resultArray.sort(function (a, b) {
        return getCorrectDate(a.friends[0].birthdate).getMonth() - getCorrectDate(b.friends[0].birthdate).getMonth();
    });

    return resultArray;
}
;

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
    let resultArray = {
        'friendsList': [],
        'totalPrice': 0
    }
    let totalPrice = 0;
    if (!Array.isArray(phoneList) || phoneList.length === 0)
        return [];
    for (let person of phoneList) {
        if (person.wishList !== undefined) {
            person.wishList.sort((a, b) => a.price - b.price);
            totalPrice += person.wishList[0].price;
            resultArray.friendsList.push({
                'name': person.name,
                'birthdate': person.birthdate,
                'present': {
                    'title': person.wishList[0].title,
                    'price': person.wishList[0].price,
                }
            });
        } else {
            resultArray.friendsList.push({
                'name': person.name,
                'birthdate': person.birthdate,
                'present': undefined
            });
        }
    }
    resultArray.totalPrice = totalPrice;
    return resultArray;
}

/**
 * Get the Date object from correct string
 * Преобразовать дату в корректный формат
 */
function getCorrectDate(date) {
    if (typeof date != "string")
        return false;
    else {
        date = date.split('.');
        if (date[0].length === 2 && date[1].length === 2 && date[2].length === 4) {
            return new Date(+date[2], +date[1] - 1, +date[0]);
        } else return false;
    }
}
module.exports = {
    getNextBirthdays,
    getMonthsList,
    getMinimumPresentsPrice
};
