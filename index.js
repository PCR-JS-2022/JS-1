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
		birthdate: "27.02.1980",
	},
];

let res = getNextBirthdays('1.1.2200', phoneList);
console.log(JSON.stringify(res));

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
function getNextBirthdays(dateAsString, friends) {
	if (!getNextBirthdaysIsValid) {
		return [];
	}

	let birthDate = getBirthDate(dateAsString);
	let birthday = getBirthday(birthDate);

	return friends
		.filter(friend => {
			let friendBirthDate = getBirthDate(friend.birthdate);
			let friendBirthday = getBirthday(friendBirthDate);
			return friendBirthDate < birthDate && friendBirthday > birthday;
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
function getMonthsList(phoneList) {
	if (Array.isArray(phoneList)) {
		return [];
	}
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

};

module.exports = {getNextBirthdays, getMonthsList, getMinimumPresentsPrice};
