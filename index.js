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
 * @typedef SplitDate
 * @type {object}
 * @property {number} day - день
 * @property {number} month - месяц
 * @property {number} year - год
 */

/**
 * @param {string} date - дата отсчета
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<Person>} массив друзей, у которых дни рождения после даты отсчета
 */
function getNextBirthdays(date, phoneList) {
	const normedDate = getDate(date)
	if (!Array.isArray(phoneList) || !normedDate)
		return []

	const friendsList = phoneList.filter(person => checkDate(getDate(person.birthdate), normedDate))

	return friendsList.sort((a, b) => sortByBirthday(getDate(a.birthdate), getDate(b.birthdate)))
}

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
function getMonthsList(phoneList) {
	if (!Array.isArray(phoneList)) return []
	const tempPhoneList = phoneList.sort((a, b) => sortByBirthday(getDate(a.birthdate), getDate(b.birthdate)))
	let monthsList = []

	for (const person of tempPhoneList) {
		const birthdate = getDate(person.birthdate)
		const month = birthdate.toLocaleString('ru-RU', { month: 'long' })
		let monthItem = monthsList.find(item => item.month === month)
		if (monthItem) {
			monthItem.friends.push(person)
		} else {
			monthsList.push({ month, friends: [person] })
		}
	}
	return monthsList
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
	if (!Array.isArray(phoneList)) return []
	const tempPhoneList = phoneList.sort((a, b) => sortByBirthday(getDate(a.birthdate), getDate(b.birthdate)))
	let result = { totalPrice: 0, friendsList: [] }

	for (const person of tempPhoneList) {
		if (person.wishList) {
			person.wishList.sort((a, b) => a.price - b.price)
			result.totalPrice += person.wishList[0].price
			result.friendsList.push({ name: person.name, birthdate: person.birthdate, present: person.wishList[0] })
		} else {
			result.friendsList.push({ ...person, present: undefined })
		}
	}

	return result
}

/**
 * @param {string} date - дата
 * @returns {SplitDate | undefined}
 */
function getSplitDate(date) {
	if (typeof date !== 'string')
		return undefined

	const sd = date.split('.')
	if (sd.length !== 3)
		return undefined

	const [day, month, year] = sd

	if (day.length !== 2 || month.length !== 2 || year.length !== 4)
		return undefined

	return {day: +day, month: +month, year: +year}
}

/**
 * @param {string} date - дата
 * @returns {Date | undefined}
 */
function getDate(date) {
	const sd = getSplitDate(date)
	if (!sd) return undefined

	const {day, month, year} = sd

	return new Date(year, month - 1, day)
}

/**
 * @param {Date} date - дата для проверки
 * @param {Date} currentDate - текущая переданная дата
 * @returns {boolean}
 */
function checkDate(date, currentDate) {
	if (date.getFullYear() < currentDate.getFullYear()) {
		if (currentDate.getMonth() === date.getMonth()) {
			return currentDate.getDate() <= date.getDate()
		}
		return currentDate.getMonth() < date.getMonth()
	}
	return date.getFullYear() === currentDate.getFullYear()
		&& currentDate.getMonth() === date.getMonth()
		&& currentDate.getDate() === date.getDate()
}

/**
 * @param {Date} a - первая дата
 * @param {Date} b - вторая дата
 * @returns {number}
 */
function sortByBirthday(a, b) {
	if (a.getMonth() > b.getMonth()) {
		return 1
	} else if (a.getMonth() === b.getMonth()) {
		if (a.getDate() === b.getDate()) {
			return a.getFullYear() - b.getFullYear()
		}
		return a.getDate() - b.getDate()
	}
	return -1
}

module.exports = {getNextBirthdays, getMonthsList, getMinimumPresentsPrice};
