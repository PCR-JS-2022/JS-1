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
  if (!isDateValid(date) || !isListValid(phoneList)) return [];

  const startDate = getDateObject(date);
  const currentYear = startDate.getFullYear();

  return phoneList.map(friend => ({
      ...friend,
      dateObject: getDateObject(friend.birthdate),
      currentYearBirthday: getCurrentYearBirthday(getDateObject(friend.birthdate), currentYear)
    }))
    .filter(friend => friend.dateObject < startDate)
    .filter(friend => friend.currentYearBirthday > startDate)
    .sort((friend1, friend2) => friend1.currentYearBirthday - friend2.currentYearBirthday)
    .map(({ name, birthdate }) => ({ name, birthdate }));
};

function isDateValid(date) {
  return /^\d{2}\.\d{2}\.\d{4}$/.test(date);
}

function isListValid(list) {
  return Array.isArray(list);
}

function getDateObject(localDateString) {
  const [dd, mm, yyyy] = localDateString.split('.');
  return new Date(`${mm}/${dd}/${yyyy}`);
}

function getCurrentYearBirthday(dateObject, currentYear) {
  return dateObject.setFullYear(currentYear);
}

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
export function getMonthsList(phoneList) {
  if (!isListValid(phoneList)) return [];

  return phoneList.reduce(monthReducer, []).sort().map(month => {
    const monthName = getMonthName(new Date(2022, month - 1));
    return {
      month: monthName,
      friends: filterFriendsByMonthName(monthName, phoneList),
    };
  });
};

function monthReducer(monthsArr, { birthdate }) {
  if (isDateValid(birthdate)) {
      const month = birthdate.split('.')[1];
      if (monthsArr.indexOf(month) === -1) return monthsArr.concat(month);
    }
  return monthsArr;
}

function filterFriendsByMonthName(monthName, friends) {
  return friends.filter(({ birthdate }) => {
    return getMonthName(getDateObject(birthdate)) === monthName;
  });
}

function getMonthName(dateObj) {
  return dateObj.toLocaleDateString('ru-RU', { month: 'long' });
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
  if (!isListValid(phoneList)) return [];

  const friendsList = phoneList.map(friend => {
      const friendObject = {
        name: friend.name,
        birthdate: friend.birthdate,
      };
      if (friend.wishList) {
        friendObject.present = friend.wishList.reduce((prev, next) => prev.price < next.price ? prev : next);
      }
      return friendObject;
    });

  return {
    friendsList,
    totalPrice: friendsList.reduce((total, { present }) => {
        return present ? total += present.price : total;
      }, 0),
  };
};

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
