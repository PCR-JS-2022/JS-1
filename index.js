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
    if (dateIsIncorret(date)) {
        return []
    }

    if (!Array.isArray(phoneList)) {
        console.log("Введённый список друзей некорректен")
        return []
    }

    date = getObjectDateFromString(date)

    return phoneList
        .filter(friend => {
            const birthdate = getObjectDateFromString(friend.birthdate)

            if (birthdate.year < date.year && birthdate.month > date.month) {
                return friend
            }
            if (birthdate.year < date.year && birthdate.month == date.month && birthdate.day >= date.day) {
                return friend
            }
            if (birthdate.year == date.year && birthdate.month == date.month && birthdate.day == date.day) {
                return friend
            }
        })
        .sort((first, second) => sortByDate(first.birthdate, second.birthdate))
};

function dateIsIncorret(selectedDate) {
    const date = getObjectDateFromString(selectedDate)
    if (date.day.length != 2
        || date.month.length != 2
        || date.year.length != 4
        || date.day <= 0
        || date.day > 31
        || date.month <= 0
        || date.month > 12
        || typeof selectedDate !== "string"
        || selectedDate.split(".") != undefined
        || selectedDate.split(".").length != 3) {
        console.log("Введённая дата некорректна")
        return true
    } else {
        console.log(selectedDate)
        return false
    }
}

function getObjectDateFromString(date) {
    date = date.split(".")
    if (date != undefined) {
        return {
            day: date[0],
            month: date[1],
            year: date[2]
        }
    }
}

function sortByDate(firstDate, secondDate) {
    firstDate = getObjectDateFromString(firstDate)
    secondDate = getObjectDateFromString(secondDate)
    return firstDate.month - secondDate.month + firstDate.day - secondDate.day
}

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
 function getMonthsList(phoneList) {
    if (!Array.isArray(phoneList)) {
        console.log("Введённый список друзей некорректен")
        return []
    }

    let list = []

    months.forEach((value, index) => {
        let filteredFriends = phoneList
            .filter(friend => {
                if (index + 1 == getObjectDateFromString(friend.birthdate).month) {
                    return friend
                }
            })
            .sort((first, second) => sortByDate(first.birthdate, second.birthdate))

        if (filteredFriends.length > 0) {
            list.push(
                {
                    month: value,
                    friends: filteredFriends
                }
            )
        }
    })
    return list
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
        console.log("Введённый список друзей некорректен")
        return []
    }

    phoneList = phoneList
        .map(friend => {
            let present = friend.wishList != undefined ? friend.wishList?.sort((first, second) => {
                return first.price - second.price
            })[0] : undefined

            return {
                name: friend.name,
                birthdate: friend.birthdate,
                present: present
            }
        })

    const totalPrice = phoneList
        .reduce((amount, friend) => {
            return amount + (friend.present != undefined ? friend.present.price : 0)
        }, 0)

    return {
        friendsList: phoneList,
        totalPrice: totalPrice
    }
};

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
