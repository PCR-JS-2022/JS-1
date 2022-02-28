/**
 * @typedef Person
 * @type {object}
 * @property {string} name
 * @property {string} birthdate
 */

/**
 * @typedef Gift
 * @type {object}
 * @property {string} title
 * @property {number} price
 */

/**
 * @param {string} dateAsString
 * @param {Array<Person>} friends
 * @returns {Array<Person>}
 */
export function getNextBirthdays(dateAsString, friends) {
	if (!getNextBirthdaysIsValid(dateAsString, friends)) {
		return [];
	}

	let birthDate = getBirthDate(dateAsString);
	let birthday = getBirthday(birthDate);

	return friends
		.filter(friend => {
			let friendBirthDate = getBirthDate(friend.birthdate);
			let friendBirthday = getBirthday(friendBirthDate);
			return friendBirthDate <= birthDate && friendBirthday >= birthday;
		})
		.sort(getBirthdayComparer())
}

/**
 * @param {string} dateAsString
 * @param {Array<Person>} friends
 * @returns {boolean}
 */
function getNextBirthdaysIsValid(dateAsString, friends) {
	return Array.isArray(friends) && typeof dateAsString === "string" && /^\d{2}.\d{2}.\d{4}$/.test(dateAsString)
}

/**
 * @param {Date} date
 * @returns {Date}
 */
function getBirthday(date) {
	return new Date(0, date.getMonth(), date.getDay())
}

/**
 * @param {string} dateAsString
 * @returns {Date}
 */
function getBirthDate(dateAsString) {
	return new Date(dateAsString.split(".").reverse().join("-"));
}

/**
 * @returns {function(Person, Person)}
 */
function getBirthdayComparer() {
	return (a, b) => getBirthday(getBirthDate(a.birthdate)) - getBirthday(getBirthDate(b.birthdate))
}

/**
 * @param {Array<Person>} phoneList
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */
export function getMonthsList(phoneList) {
	if (!Array.isArray(phoneList)) {
		return [];
	}

	let monthsList = [];
	phoneList
		.sort(getBirthdayComparer())
		.forEach(person => {
			let date = getBirthDate(person.birthdate);
			let month = date.toLocaleString("ru", {month: "long"});
			if (monthsList.some(m => m.month === month)) {
				monthsList[monthsList.findIndex(m => m.month === month)].friends.push(person);
			} else {
				monthsList.push({month: month, friends: [person]});
			}
		})
	return monthsList;
}

/**
 * @param {Array<{
 *    name: string,
 *    birthdate: string,
 *    wishList: Array<Gift>
 *  }>} phoneList
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
	if (!Array.isArray(phoneList)) {
		return [];
	}

	let total = 0;
	let presents = []

	phoneList.forEach(person => {
		let present = person.wishList?.sort((a, b) => a.price - b.price)[0];
		presents.push({
			name: person.name,
			birthdate: person.birthdate,
			present: present
		})
		total += present?.price ?? 0;
	})

	return {
		friendsList: presents,
		totalPrice: total
	}
}

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
