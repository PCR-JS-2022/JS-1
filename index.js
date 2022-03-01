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
    if(!Array.isArray(phoneList))
        return;
    let comparableDate = new Date(date);
    let year = comparableDate.getFullYear();
    let result = [];
    for(let i = 0; i < phoneList.length; i++)
    {
        var currentFriendDate = new Date(phoneList[i].birthdate);
        currentFriendDate.year = year;
        if(currentFriendDate > comparableDate)
            result.push(phoneList[i]);
    }
    result.sort(function (a, b) {
        if (new Date(a.birthdate) > new Date(b.birthdate)) {
          return 1;
        }
        if (new Date(a.birthdate) < new Date(b.birthdate)) {
          return -1;
        }
        return 0;
      });
    return result;
};

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
export function getMonthsList(phoneList) {
    if(!Array.isArray(phoneList))
        return;
    let result = [
        {
        month: 'январь',
        friends: []
        },
        {
        month: 'февраль',
        friends: []
        },
        {
        month: 'март',
        friends: []
        },
        {
        month: 'апрель',
        friends: []
        },
        {
        month: 'май',
        friends: []
        },
        {
        month: 'июнь',
        friends: []
        },
        {
        month: 'июль',
        friends: []
        },
        {
        month: 'август',
        friends: []
        },
        {
        month: 'сентябрь',
        friends: []
        },
        {
        month: 'октябрь',
        friends: []
        },
        {
        month: 'ноябрь',
        friends: []
        },
        {
        month: 'декабрь',
        friends: []
        }
    ];
    for(let i = 0; i < phoneList.length; i++)
    {
        var currentFriendDate = new Date(phoneList[i].birthdate);
        result[currentFriendDate.getMonth()].friends.push(phoneList[i]);
    }
    result.filter(function(element){ return element.friends > 0; });
    return result;
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
    if(!Array.isArray(phoneList))
        return;
    var resultPersons = [];
    for(let i = 0; i < phoneList.length; i++)
    {
        resultPersons.push({
            name: phoneList[i].name,
            present: phoneList[i].wishList.filter((e) => e.price > 0)
          })
    }
    return resultPersons;
};

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
