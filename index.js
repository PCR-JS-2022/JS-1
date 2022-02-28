
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
    const result = [];
    if (!Array.isArray(phoneList) || (typeof date === "string" && !date.match(/\d{2}(.)\d{2}(.)\d{4}/g))
        || typeof date !== "string")
        return result
    else {
        const current_day = date.split('.')[0];
        const current_month = date.split('.')[1];
        const current_year = date.split('.')[2];
        phoneList.forEach(elem => {
            const day = elem.birthdate.split('.')[0];
            const month = elem.birthdate.split('.')[1];
            const year = elem.birthdate.split('.')[2];
            if (year <= current_year)
                if (month > current_month)
                    result.push(elem)
                else if (month === current_month)
                    if (day >= current_day)
                        result.push(elem)
        })
        return (result.sort((a,b) =>
            new Date("1",a.birthdate.split('.')[1]-1,a.birthdate.split('.')[0]) -
            new Date("1",b.birthdate.split('.')[1]-1,b.birthdate.split('.')[0])))
    }
}

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
function getMonthsList(phoneList) {
    const result = [];
    if (!Array.isArray(phoneList))
        return result
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
    };
    for (let elem of phoneList.sort((a,b) => {
        return a.birthdate.split('.')[1] - b.birthdate.split('.')[1]
    })) {
        const current_month = elem.birthdate.split('.')[1];
        if (!result.find(obj => obj.month === months[current_month])) {
            result.push({month:months[current_month],friends:[]})
        }
        result.forEach(resObj => {
            if (months[current_month] === resObj.month)
                resObj.friends.push(elem)
        })
    }
    return result
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
    let totalPrice = 0;
    const result = [];
    if (!Array.isArray(phoneList))
        return result
    phoneList.forEach(elem => {
        let presentArr = [];
        if (elem.wishList !== undefined) {
            elem.wishList.forEach(wish => {
                presentArr.push(wish.price)
            })
            let min = Math.min.apply( null, presentArr );
            result.push({
                name: elem.name, birthdate: elem.birthdate,
                present: elem.wishList.find(present => present.price === min)
            });
            totalPrice += min
        }
        else {
            result.push({name: elem.name, birthdate: elem.birthdate,present: undefined})
        }
    })
    return {friendsList:result,totalPrice:totalPrice}
}

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };