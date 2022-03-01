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
// function dateParse(date) {
//     if (typeof date !== "string")
//         return [];
//     let newdate = date.split('.');
//     if (newdate[0].length != 2)
//         return [];
//     if (newdate[1].length != 2)
//         return [];
//     if (newdate[2].length != 4)
//         return [];
//     return newdate;
// };
function dateParse(date) {
    if (typeof date !== 'string') return Number.MAX_VALUE;
    let newdate = date.split('.');
    if (newdate[0].length !== 2 || Number.parseInt(newdate[0]) <= 0)
        return Number.MAX_VALUE;
    console.log('month', Number.parseInt(newdate[1]), newdate[1].length);
    if (newdate[1].length !== 2 || Number.parseInt(newdate[1]) <= 0)
        return Number.MAX_VALUE;
    if (newdate[2].length !== 4 || Number.parseInt(newdate[2]) <= 0)
        return Number.MAX_VALUE;
    return new Date(
        Number.parseInt(newdate[2]),
        Number.parseInt(newdate[1]) - 1,
        Number.parseInt(newdate[0]),
    );
}

function mySort(a, b) {
    if (dateParse(a.birthdate)[2] > dateParse(b.birthdate)[2] ||
        (dateParse(a.birthdate)[2] == dateParse(b.birthdate)[2] &&
            dateParse(a.birthdate)[1] > dateParse(b.birthdate)[1]) ||
        (dateParse(a.birthdate)[2] == dateParse(b.birthdate)[2] &&
            dateParse(a.birthdate)[1] == dateParse(b.birthdate)[1] &&
            dateParse(a.birthdate)[0] > dateParse(b.birthdate)[0])) return 1;

    if ((dateParse(a.birthdate)[2] == dateParse(b.birthdate)[2] &&
        dateParse(a.birthdate)[1] == dateParse(b.birthdate)[1] &&
        dateParse(a.birthdate)[0] == dateParse(b.birthdate)[0])) return 0;

    if (dateParse(b.birthdate)[2] > dateParse(b.birthdate)[2] ||
        (dateParse(b.birthdate)[2] == dateParse(a.birthdate)[2] &&
            dateParse(b.birthdate)[1] > dateParse(a.birthdate)[1]) ||
        (dateParse(b.birthdate)[2] == dateParse(a.birthdate)[2] &&
            dateParse(b.birthdate)[1] == dateParse(a.birthdate)[1] &&
            dateParse(b.birthdate)[0] > dateParse(a.birthdate)[0])) return -1;
};

// function getNextBirthdays(date, phoneList) {
//     const newdate = dateParse(date);
//     if (!Array.isArray(phoneList))
//         return [];

//     let people = [];
//     phoneList.forEach(x => {
//         if ((dateParse(x.birthdate)[2] < newdate[2] &&
//             ((dateParse(x.birthdate)[1] = newdate[1] &&
//                 dateParse(x.birthdate)[0] > newdate[0]) ||
//                 dateParse(x.birthdate)[1] > newdate[1]))
//                 || (dateParse(x.birthdate)[2] == newdate[2] && (dateParse(x.birthdate)[1] == newdate[1] &&
//                 dateParse(x.birthdate)[0] >= newdate[0] ||
//                 dateParse(x.birthdate)[1] > newdate[1])) people.push({ name: x.name, birthdate: x.birthdate })
//     });
//     people.sort(mySort);
//     return people;
// };
function getNextBirthdays(date, phoneList) {
    console.log(phoneList);
    const newdate = dateParse(date);
    if (newdate === Number.MAX_VALUE) return [];
    if (!Array.isArray(phoneList)) return [];
    let people = [];
    console.log(newdate);
    phoneList.forEach((x) => {
        console.log(x);
        console.log(dateParse(x.birthdate));
        if (
            dateParse(x.birthdate).getYear() < newdate.getYear() &&
            (dateParse(x.birthdate).getMonth() > newdate.getMonth() ||
                (dateParse(x.birthdate).getMonth() === newdate.getMonth() &&
                    dateParse(x.birthdate).getDay() > newdate.getDay()))
        ) {
            people.push({ name: x.name, birthdate: x.birthdate });
            console.log({ name: x.name, birthdate: x.birthdate });
        }
    });
    //people.sort(mySort);
    return people;
}
function getMonthName(monthN) {
    if (monthN == 1) return "январь";
    if (monthN == 2) return "февраль";
    if (monthN == 3) return "март";
    if (monthN == 4) return "апрель";
    if (monthN == 5) return "май";
    if (monthN == 6) return "июнь";
    if (monthN == 7) return "июль";
    if (monthN == 8) return "август";
    if (monthN == 9) return "сентябрь";
    if (monthN == 10) return "октябрь";
    if (monthN == 11) return "ноябрь";
    if (monthN == 12) return "декабрь";
};

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
function getMonthsList(phoneList) {
    if (!Array.isArray(phoneList))
        return [];
    let result = [];
    for (let i = 0; i < 12; i++) {
        result.push({ month: getMonthName(i + 1), friends: phoneList.filter(x => dateParse(x.birthdate))[1] == i + 1 });
    }
    result.filter(x => x.friends.length > 0);
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
function findCheapestGift(Gifts) {
    if (Gifts.length == 0) return undefined;
    return Gifts.sort((a, b) => a.price >= b.price ? 1 : -1)[0];
};

function getMinimumPresentsPrice(phoneList) {
    if (!Array.isArray(phoneList))
        return [];
    let friendsList = [];
    let totalPrice = 0;
    phoneList.forEach(x => {
        friendsList.push({ name: x.name, birthdate: x.birthdate, present: findCheapestGift(x.wishList) });
        if (x.wishList.length > 0)
            totalPrice = totalPrice + x.wishList[0].price;
    });
    return { friendsList: friendsList, totalPrice: totalPrice };
};

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
