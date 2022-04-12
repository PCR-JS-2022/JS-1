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
    "use strict";
    //first validation date
    if (
        typeof date !== "string" ||
        date.length != 10 ||
        date.match(
            /(0(?!0)|[1-2]|3(?=(0|1)))[0-9].(0(?!0)|1(?=[0-2]))[0-9].(1|2)\d{3}/g
        ) === null
    ) {
        return [];
    }
    //validation phoneList
    if (!(phoneList instanceof Array)) {
        return [];
    }
    //parsing date by day, month, year
    const reportDay = Number(date.substring(0, 2));
    const reportMonth = Number(date.substring(3, 5)) - 1;
    const reportYear = Number(date.substring(6));
    //second validation date (example: >29.02.2020)
    const dateObj = new Date(reportYear, reportMonth, reportDay);
    if (reportMonth != dateObj.getMonth()) return [];
    //find friend
    let newPhoneList = [];
    for (var i = 0; i < phoneList.length; ++i) {
        let friend = phoneList[i];
        let friendBirthDay = Number(friend.birthdate.substring(0, 2));
        let friendBirthMonth = Number(friend.birthdate.substring(3, 5)) - 1;
        let friendBirthYear = Number(friend.birthdate.substring(6));
        if (friendBirthYear > reportYear) continue;
        if (friendBirthMonth < reportMonth) continue;
        if (friendBirthMonth == reportMonth && friendBirthDay < reportDay)
            continue;
        //bisect
        let index = 0;
        for (var j = 0; j < newPhoneList.length; ++j) {
            let addedDate = newPhoneList[j].birthdate;
            let addedDateObj = new Date(
                Number(addedDate.substring(6)),
                Number(addedDate.substring(3, 5)) - 1,
                Number(addedDate.substring(0, 2))
            );
            let curDateObj = new Date(
                friendBirthYear,
                friendBirthMonth,
                friendBirthDay
            );
            if (addedDateObj > curDateObj) {
                index = j;
                break;
            }
        }
        newPhoneList.splice(index, 0, friend);
    }
    return newPhoneList;
}

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
function getMonthsList(phoneList) {
    "use strict";
    if (!(phoneList instanceof Array)) {
        return [];
    }
    const namesMonths = new Map([
        ["01", "январь"],
        ["02", "февраль"],
        ["03", "март"],
        ["04", "апрель"],
        ["05", "май"],
        ["06", "июнь"],
        ["07", "июль"],
        ["08", "август"],
        ["09", "сентбярь"],
        ["10", "октябрь"],
        ["11", "ноябрь"],
        ["12", "декабрь"],
    ]);
    let friendsBirthMonths = [];
    for (var i = 0; i < phoneList.length; ++i) {
        let friend = phoneList[i];
        let nameBirthMonth = namesMonths.get(friend.birthdate.substring(3, 5));
        let friendsBirthMonth = null;
        for (j = 0; j < friendsBirthMonths.length; ++j) {
            if (friendsBirthMonths[j].month == nameBirthMonth) {
                friendsBirthMonth = friendsBirthMonths[j];
                break;
            }
        }
        if (friendsBirthMonth === null) {
            friendsBirthMonths.push({
                month: nameBirthMonth,
                friends: [friend],
            });
        } else {
            let friendsList = friendsBirthMonth.friends;
            friendsList.push(objectFriend);
            friendsList.sort(function (friend1, friend2) {
                let friend1BirthDate = new Date(
                    friend1.birthdate.substring(6),
                    friend1.birthdate.substring(3, 5),
                    friend1.birthdate.substring(0, 2)
                );
                let friend2BirthDate = new Date(
                    friend2.birthdate.substring(6),
                    friend2.birthdate.substring(3, 5),
                    friend2.birthdate.substring(0, 2)
                );
                return friend1BirthDate - friend2BirthDate;
            });
        }
    }
    return friendsBirthMonths;
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
    "use strict";
    if (!(phoneList instanceof Array)) {
        return [];
    }
    let friendsList = [];
    let totalPrice = 0;
    for (var i = 0; i < phoneList.length; ++i) {
        let friend = phoneList[i];
        let friendWithSelectedPresent = {
            name: friend.name,
            birthdate: friend.birthdate,
            present: friend.wishList,
        };
        let selectedPresent = friendWithSelectedPresent.present;
        if (selectedPresent !== undefined) {
            friendWithSelectedPresent.present = selectedPresent.reduce(
                function (wish1, wish2) {
                    return wish1.price < wish2.price ? wish1 : wish2;
                }
            );
            totalPrice += friendWithSelectedPresent.present.price;
        }
        friendsList.push(friendWithSelectedPresent);
    }
    return { friendsList: friendsList, totalPrice: totalPrice };
}

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
