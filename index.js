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
    const reportDate = new Date(reportYear, reportMonth, reportDay);
    if (reportMonth != reportDate.getMonth()) return [];
    //find friend
    let newPhoneList = [];
    for (var i = 0; i < phoneList.length; ++i) {
        let friend = phoneList[i];
        let friendBirthDay = Number(friend.birthdate.substring(0, 2));
        let friendBirthMonth = Number(friend.birthdate.substring(3, 5)) - 1;
        let friendBirthYear = Number(friend.birthdate.substring(6));
        if (friendBirthYear > reportYear) continue;
        if (friendBirthMonth < reportMonth) continue;
        if (friendBirthMonth == reportMonth && friendBirthDay <= reportDay)
            continue;
        //bisect sorted newPhoneList
        let index = 0;
        for (var j = 0; j < newPhoneList.length; ++j) {
            let addedFriendBirthDay = Number(
                newPhoneList[j].birthdate.substring(0, 2)
            );
            let addedFriendBirthMonth =
                Number(newPhoneList[j].birthdate.substring(3, 5)) - 1;
            if (newPhoneList.length == 1) {
                if (
                    friendBirthMonth > addedFriendBirthMonth ||
                    (friendBirthMonth == addedFriendBirthMonth &&
                        friendBirthDay > addedFriendBirthDay)
                ) {
                    index = 1;
                    break;
                }
            }
            if (
                friendBirthMonth > addedFriendBirthMonth ||
                (friendBirthMonth == addedFriendBirthMonth &&
                    friendBirthDay >= addedFriendBirthDay)
            ) {
                index = j + 1;
            }
            if (
                friendBirthMonth < addedFriendBirthMonth ||
                (friendBirthMonth == addedFriendBirthMonth &&
                    friendBirthDay < addedFriendBirthDay)
            ) {
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
        [0, "январь"],
        [1, "февраль"],
        [2, "март"],
        [3, "апрель"],
        [4, "май"],
        [5, "июнь"],
        [6, "июль"],
        [7, "август"],
        [8, "сентбярь"],
        [9, "октябрь"],
        [10, "ноябрь"],
        [11, "декабрь"],
    ]);
    let friendsBirthMonths = [];
    for (var i = 0; i < phoneList.length; ++i) {
        let friend = phoneList[i];
        let numberBirthMonth = Number(friend.birthdate.substring(3, 5)) - 1;
        let nameBirthMonth = namesMonths.get(numberBirthMonth);
        let friendsBirthMonth = null;
        for (var j = 0; j < friendsBirthMonths.length; ++j) {
            if (friendsBirthMonths[j].month == nameBirthMonth) {
                friendsBirthMonth = friendsBirthMonths[j];
                break;
            }
        }
        if (friendsBirthMonth === null) {
            //bisect sorted friendsBirthMonths
            let index = 0;
            for (var k = 0; k < friendsBirthMonths.length; ++k) {
                let addedMonthName = friendsBirthMonths[k].month;
                let addedMonthNumber;
                for (let [key, value] of namesMonths.entries()) {
                    if (value === addedMonthName) {
                        addedMonthNumber = key;
                        break;
                    }
                }
                if (
                    friendsBirthMonths.length == 1 &&
                    numberBirthMonth > addedMonthNumber
                ) {
                    index = 1;
                    break;
                }
                if (numberBirthMonth > addedMonthNumber) {
                    index = k + 1;
                }
                if (numberBirthMonth < addedMonthNumber) {
                    index = k;
                    break;
                }
            }
            friendsBirthMonths.splice(index, 0, {
                month: nameBirthMonth,
                friends: [friend],
            });
        } else {
            let friendsList = friendsBirthMonth.friends;
            ////bisect sorted inside BirthMonth
            let friendBirthDay = Number(friend.birthdate.substring(0, 2));
            let index = 0;
            for (var k = 0; k < friendsList.length; ++k) {
                let addedFriendBirthDay = Number(
                    friendsList[k].birthdate.substring(0, 2)
                );
                if (
                    friendsList.length == 1 &&
                    friendBirthDay > addedFriendBirthDay
                ) {
                    index = 1;
                    break;
                }
                if (friendBirthDay >= addedFriendBirthDay) {
                    index = k + 1;
                }
                if (friendBirthDay < addedFriendBirthDay) {
                    index = k;
                    break;
                }
            }
            friendsList.splice(index, 0, friend);
        }
    }
    //sorting by months

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
