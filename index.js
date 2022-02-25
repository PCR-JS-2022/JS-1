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
     const dateTimeFrom = parseDateSeparatedByDots(date);
     if(dateTimeFrom.getDay() === NaN || !phoneList instanceof Array)
        return [];
     return phoneList.filter(person => filterByBirthday(dateTimeFrom, parseDateSeparatedByDots(person.birthdate)));
};

function parseDateSeparatedByDots(date){
    [day, month, year] = date.split('.');
    //return new Date(year, month, day)
    return new Date(date);
}

function filterByBirthday(dateFrom, birthdate)
{   
    return birthdate.getFullYear() <= dateFrom.getFullYear()
    && (birthdate.getMonth() > dateFrom.getMonth()
     || birthdate.getMonth() === dateFrom.getMonth() && birthdate.getDate() > dateFrom.getDate())
}

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
function getMonthsList(phoneList) {
    const months = 
    ['январь', 'февраль', 'март', 'апрель', 'май', "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"]
     const personsSeparatedByMonth = new Map();
     const result = [];
    phoneList.forEach(person =>{
        const monthNumber = Number(person.birthdate.split('.')[1]) - 1;
        const month = months[monthNumber];
        if(personsSeparatedByMonth.has(month))
            personsSeparatedByMonth.get(month).push(person);
        else
            personsSeparatedByMonth.set(month, [person]);
    })
    personsSeparatedByMonth.forEach((value, key) => {
        result.push({
            month: key,
            friends: value,
        });
    })
    return result;
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
    if(!phoneList instanceof Array)
        return [];
    const result = {
        friendsList: [],
        totalPrice: 0,
    };
    phoneList.forEach(person =>{
        const cheapestGift = person.wishList !== undefined 
        ? person.wishList.sort((a,b) => {
            if(a.price < b.price)
                return -1;
            else if(a.price > b.price)
                return 1;
            else
                return 0;
        })[0]
        : null;
        const personInfo = {
            name: person.name,
            birthdate: person.birthdate,
            present: cheapestGift === null ? undefined : cheapestGift,
        }
        result.friendsList.push(personInfo);
        result.totalPrice += cheapestGift !== null ? cheapestGift.price : 0;
    })
    return result;
};


module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
