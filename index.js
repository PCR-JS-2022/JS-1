const phoneList1 = [
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
const phoneList2 = [
	{
		name: 'Александра',
		birthdate: '21.05.2001',
		wishList: [
			{
				title: 'Книга "Изучаем программирование на JavaScript"',
				price: 250,
			},
			{
				title: 'Билет на концерт Макса Коржа',
				price: 1500,
			},
			{
				title: 'Книга "Чистый код. Создание, анализ и рефакторинг"',
				price: 200,
			},
		],
	},
	{
		name: 'Егор',
		birthdate: '06.08.1976',
		wishList: [
			{
				title: 'Годовой абонимент в библиотеку',
				price: 400,
			},
			{
				title: 'Шариковая ручка',
				price: 750,
			},
		],
	},
	{
		name: 'Роман',
		birthdate: '14.05.2000',
	},
	{
		name: 'Василий',
		birthdate: '27.02.1980',
		wishList: [
			{
				title: 'Годовой курс обучения на ИРИТ-РтФ',
				price: 100500,
			},
			{
				title: 'Путешествие на Марс',
				price: 999999999,
			},
		],
	},
];
console.log(JSON.stringify(getNextBirthdays('28.02.1980', phoneList1)));
console.log()
console.log(JSON.stringify(getMonthsList(phoneList1)));
console.log()
console.log(JSON.stringify(getMinimumPresentsPrice(phoneList2)));

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
	if (!getNextBirthdaysIsValid(dateAsString, friends)) {
		return [];
	}

	const birthDate = getBirthDate(dateAsString);
	const birthday = getBirthday(birthDate);

	return friends
		.filter(friend => {
			const friendBirthDate = getBirthDate(friend.birthdate);
			const friendBirthday = getBirthday(friendBirthDate);
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
function getMonthsList(phoneList) {
	if (!Array.isArray(phoneList)) {
		return [];
	}

	return phoneList
		.sort(getBirthdayComparer())
		.reduce((monthsList, person) => {
			const date = getBirthDate(person.birthdate);
			const month = date.toLocaleString("ru", { month: "long" });

			if (monthsList.some(m => m.month === month)) {
				monthsList[monthsList.findIndex(m => m.month === month)].friends.push(person);
			} else {
				monthsList.push({ month, friends: [person] });
			}
			return monthsList;
		}, []);
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
function getMinimumPresentsPrice(phoneList) {
	if (!Array.isArray(phoneList)) {
		return [];
	}

	return phoneList.reduce((presents, person) => {
		const present = person.wishList?.sort((a, b) => a.price - b.price)[0];
		presents.friendsList.push({
			name: person.name,
			birthdate: person.birthdate,
			present
		});
		presents.totalPrice += present?.price ?? 0;
		return presents;
	}, { friendsList: [], totalPrice: 0 })
}

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
