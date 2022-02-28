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
  if (typeof date !== "string") return [];

  const splitedDate = date.split(".");
  if (
    !(
      splitedDate.length === 3 &&
      splitedDate[0].length === 2 &&
      splitedDate[1].length === 2 &&
      splitedDate[2].length === 4
    ) ||
    !Array.isArray(phoneList)
  ) {
    return [];
  }

  const realDate = convertToDate(date);

  const nextBirthdays = phoneList
    .filter((person) => {
      const birthdate = convertToDate(person.birthdate);
      if (birthdate > realDate) return false;

      return (
        birthdate.getMonth() > realDate.getMonth() ||
        (birthdate.getMonth() === realDate.getMonth() &&
          birthdate.getDay() >= realDate.getDay())
      );
    })
    .sort((person1, person2) =>
      sortByMonthAndDate(person1.birthdate, person2.birthdate)
    );

  return nextBirthdays;
}

/**
 *
 * @param {string} date1
 * @param {string} date2
 * @returns {number}
 */
function sortByMonthAndDate(date1, date2) {
  const number1 = convertToDate(date1);
  const number2 = convertToDate(date2);
  number1.setFullYear(0);
  number2.setFullYear(0);

  return number1 > number2 ? 1 : -1;
}

/**
 *
 * @param {string} date
 * @returns {Date}
 */
function convertToDate(date) {
  const splitedDate = date.split(".");
  return new Date(
    parseInt(splitedDate[2]),
    parseInt(splitedDate[1]),
    parseInt(splitedDate[0])
  );
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

  phoneList.forEach((person) => {
    const monthNumber = parseInt(person.birthdate.split(".")[1]);
    const monthName = monthNames[monthNumber];

    if (monthList.some((month) => month.month === monthName))
      monthList.find((month) => month.month === monthName).friends.push(person);
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
  if (!Array.isArray(phoneList)) return [];

  let totalPrice = 0;

  const friendsList = phoneList.map((person) => {
    const cheapestWish = person.wishList?.sort((a, b) => a.price - b.price)[0];
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

const phoneList = [
  {
    name: "Александра",
    birthdate: "21.05.2001",
  },
  {
    name: "Егор",
    birthdate: "06.08.1976",
  },
  {
    name: "Роман",
    birthdate: "14.04.2000",
  },
  {
    name: "Василий",
    birthdate: "28.02.1980",
  },
];

const r = getNextBirthdays("28.02.1980", phoneList);
console.log(r);
