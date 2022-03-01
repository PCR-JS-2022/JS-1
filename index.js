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
 * @param {string} date
 * @param {Array<Person>} phoneList
 * @returns {Array<Person>}
 */
 function getNextBirthdays(date, phoneList) {
    const referenceDate = getDateType(date);
	const referenceDay = getBirthday(referenceDate);
    
	if (!getNextBirthdaysIsValid(date, phoneList)) {return [];}

	return phoneList
		.filter(friend => {
			const friendBirthDate = getDateType(friend.birthdate);
			const friendBirthday = getBirthday(friendBirthDate);
			return friendBirthday >= referenceDay && friendBirthDate <= referenceDate;
		}).sort((freind1, friend2) => getBirthday(getDateType(freind1.birthdate)) - getBirthday(getDateType(friend2.birthdate)))
};

/**
 * @param {string} date
 * @param {Array<Person>} friends
 * @returns {boolean}
 */
function getNextBirthdaysIsValid(date, friends) {
	return Array.isArray(friends) && /^\d{2}.\d{2}.\d{4}$/.test(date);
};

/**
 * @param {Date} date
 * @returns {Date}
 */
function getBirthday(date) {
	return new Date(0, date.getUTCMonth(), date.getUTCDay());
};

/**
 * @param {string} date
 * @returns {Date}
 */
function getDateType(date) {
	const [dd, mm, yyyy] = date.split('.');
    return new Date(`${mm}/${dd}/${yyyy}`);
};

/**
 * @returns {function(Person, Person)}
 */


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
	};

	return phoneList
		.sort((person1, person2) => getBirthday(getDateType(person1.birthdate)) - getBirthday(getDateType(person2.birthdate)))
		.reduce((monthsList, person) => {
			const month = getDateType(person.birthdate).toLocaleString("ru", { month: "long" });

          if(monthsList.length === 0 ){monthsList.push({ month, friends: [person] });}
            
           else{
              if (monthsList.some(m => m.month === month)){
              const monthsListIndex = monthsList.findIndex(m => m.month === month);
              monthsList[monthsListIndex].friends.push(person);
              }
              else {
                  monthsList.push({ month, friends: [person] });
                };
            };
			return monthsList;}, 
        []);
};

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
    if (!Array.isArray(phoneList)) {return [];}

    const friendsList = phoneList.map(person => ({
        name: person.name,
        birthdate: person.birthdate,
        present: person.wishList?.sort((a, b) => a.price - b.price)[0],
    }));

    return {
        friendsList,
        totalPrice: friendsList.reduce((total, { present }) => {
        if(present)
            return total += present.price;
        else 
            return  total;
        }, 0),
    };
};

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
