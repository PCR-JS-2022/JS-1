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

	const friendsList = phoneList.filter(person => {
		const personDate = getDate(person.birthdate)
		if (personDate > normedDate) {
			return person
		}
	})

	return friendsList.sort((a, b) => {
		const aDate = getDate(a.birthdate)
		const bDate = getDate(b.birthdate)

		return aDate - bDate
	})
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

	let monthsList = []

	for (const person of phoneList) {
		const birthdate = getDate(person.birthdate)
		const month = birthdate.toLocaleString('default', { month: 'long' }).toLowerCase()
		let monthItem = monthsList.find(item => item.month === month)
		if (monthItem) {
			monthItem.friends.push(person)
		} else {
			monthsList.push({ month, friends: [person] })
		}
	}
	return monthsList.sort((a, b) => monthsNumbers[a.month] - monthsNumbers[b.month])
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

	let result = { totalPrice: 0, friendsList: [] }

	for (const person of phoneList) {
		if (!person.wishList) {
			result.friendsList.push({ ...person, present: undefined })
		} else {
			person.wishList.sort((a, b) => a.price - b.price)
			result.totalPrice += person.wishList[0].price
			result.friendsList.push({ name: person.name, birthdate: person.birthdate, present: person.wishList[0] })
		}
	}

	return result
}

/**
 * @param {string} date - дата
 * @returns {SplitDate | undefined}
 */
function getSplitDate(date) {
	const sd = date.split('.')
	if (sd.length !== 3)
		return undefined

	const [day, month, year] = date.split('.')

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

const monthsNumbers = {
	'январь': 0, 'февраль': 1, 'март': 2,
	'апрель': 3, 'май': 4, 'июнь': 5,
	'июль': 6, 'август': 7, 'сентябрь': 8,
	'октябрь': 9, 'ноябрь': 10, 'декабрь': 11
}

module.exports = {getNextBirthdays, getMonthsList, getMinimumPresentsPrice};
