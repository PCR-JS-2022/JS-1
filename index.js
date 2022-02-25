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
  const splitedDate = date.split(".");
  const year = splitedDate[2];
  if (
    !(
      splitedDate.length === 3 &&
      splitedDate[0].length === 2 &&
      splitedDate[1].length === 2 &&
      year.length === 4
    ) ||
    !Array.isArray(phoneList)
  ) {
    return [];
  }

  const nextBirthdays = phoneList
    .filter((person) => {
      if (parseInt(person.birthdate.substring(person.birthdate.length - 4)) >= parseInt(year))
        return false;

      return toNumber(date.substring(0, date.length - 5)) < toNumber(person.birthdate.substring(0, person.birthdate.length - 5));
    })
    .sort((person1, person2) => sortByDate(person1.birthdate, person2.birthdate));

  return nextBirthdays;
}

function sortByDate(date1, date2) {
  const number1 = toNumber(date1);
  const number2 = toNumber(date2);

  return number1 - number2;
}

function toNumber(date) {
  return parseInt(date.split('.').reverse().reduce((acc, cur) => acc + `${cur}`));
}

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
export function getMonthsList(phoneList) {
  if (!Array.isArray(phoneList)) return [];

  var monthNames = {
    1: "январь",
    2: "февраль",
    3: "март",
    4: "апрель",
    5: "май",
    6: "июнь",
    7: "июль",
    8: "август",
    9: "сентябрь",
    10: "октябрь",
    11: "ноябрь",
    12: "декабрь",
  };

  var monthList = [];

  phoneList
    .forEach((person) => {
      const monthNumber = parseInt(person.birthdate.split(".")[1]);
      const monthName = monthNames[monthNumber];

      if (monthList.some((month) => month.month === monthName))
        monthList
          .find((month) => month.month === monthName)
          .friends.push(person);
      else
        monthList.push({
          month: monthName,
          friends: [person],
        });
    });

  monthList.sort((first, second) =>
    first.friends[0].birthdate.split(".")[1] >
    second.friends[0].birthdate.split(".")[1]
      ? 1
      : -1
  );
  monthList.forEach((month) => month.friends.sort((person1, person2) => sortByDate(person1.birthdate, person2.birthdate)));

  return monthList;
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
  let totalPrice = 0;

  const friendsList = phoneList
    .map((person) => {
      const cheapestWish = person.wishList?.sort(
        (a, b) => a.price - b.price
      )[0];
      const present =
        cheapestWish === undefined
          ? undefined
          : {
              title: cheapestWish.title,
              price: cheapestWish.price,
            };
      totalPrice += cheapestWish === undefined ? 0 : present.price;

      return {
        name: person.name,
        birthdate: person.birthdate,
        present: present,
      };
    });

  return {
    friendsList: friendsList,
    totalPrice: totalPrice,
  };
}

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
