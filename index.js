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

const phoneList1 = [
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
const phoneList2 = [
    {
        name: 'Александра',
        birthdate: '11.05.2001',
    },
    {
        name: 'Егор',
        birthdate: '06.08.1976',
    },
    {
        name: 'Роман',
        birthdate: '02.05.2000',
    },
    {
        name: 'Василий',
        birthdate: '27.02.1980',
    },
];


function getNextBirthdays(date, phoneList) {
    let forcompare = 0;
    const futureBD = [];
    if (date != '' && typeof (date) == 'string') {
        const day = date.split('.')[0];
        const month = date.split('.')[1] - 1;
        const mlength = date.split('.')[1];
        const year = date.split('.')[2];
        date = new Date(year, month, day);
        if (year.length !== 4 ||
            mlength.length !== 2 ||
            day.length !== 2 ||
            date.getFullYear() != year ||
            date.getMonth() != month ||
            date.getDate() != day
        ) {
            forcompare = Infinity;
        };
        if (Array.isArray(phoneList)) {
            phoneList.forEach(el => {
                if (el &&
                    el.name &&
                    el.birthdate &&
                    typeof (el) === 'object' &&
                    typeof (el.name) === 'string' &&
                    typeof (el.birthdate) === 'string' &&
                    el.name != '' &&
                    el.birthdate != ''
                ) {
                    const bday = el.birthdate.split('.');
                    const elMonth = parseInt(bday[1]) - 1;
                    const elDay = parseInt(bday[0]);
                    const elYear = parseInt(bday[2]);
                    //birthdate = new Date(bday[2], bday[1] - 1, bday[0]);
                    if (forcompare === 0) {
                        if (elYear <= parseInt(year)) {
                            if (elMonth > parseInt(month)) {
                                futureBD.push(el);
                            };
                            if (elMonth === parseInt(month) &&
                                elDay >= parseInt(day)) {
                                futureBD.push(el)
                            };
                        };
                    };
                };
            });
        };
        futureBD.sort((a, b) => a.birthdate.split('.')[0] >= b.birthdate.split('.')[0] ? 1 : -1)
            .sort((a, b) => a.birthdate.split('.')[1] >= b.birthdate.split('.')[1] ? 1 : -1);
    };


    // return JSON.stringify(futureBD);
    return futureBD;
};

/**
 * @param {Array<Person>} phoneList - список друзей из телефонной книги
 * @returns {Array<{
 *    month: string,
 *    friends: Array<Person>,
 *  }>}
 */

function getMonthsList(phoneList) {
    const list = [];
    if (Array.isArray(phoneList)) {
        phoneList.sort((a, b) => a.birthdate.split('.')[1] > b.birthdate.split('.')[1] ? 1 : -1);
        phoneList.forEach(el => {
            const bdayold = el.birthdate.split('.');
            const bday = new Date(bdayold[2], bdayold[1] - 1, bdayold[0]);
            const month = bday.toLocaleString('ru-RU', { month: 'long' });
            list.push(
                {
                    month: month,
                    friends: [el]
                }
            )
        });
        for (let i = 0; i < list.length; i++) {
            let nullEl = list[i];
            list.forEach(el => {
                if (el.month === nullEl.month) {
                    if (el.friends !== nullEl.friends) {
                        nullEl.friends = nullEl.friends.concat(el.friends)
                            .sort((a, b) => a.birthdate.split('.')[0] > b.birthdate.split('.')[0] ? 1 : -1);
                        list.splice(list.indexOf(el), 1);
                    };
                };
            });
        };
    };
    //console.log(JSON.stringify(list));
    //return JSON.stringify(list);
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
    const friendsList = [];
    let totalPrice = 0;
    let present;
    if (Array.isArray(phoneList)) {
        phoneList.forEach(el => {
            if (el.wishList) {
                el.wishList.sort((a, b) => parseInt(a.price) >= parseInt(b.price) ? 1 : -1);
                el.wishList.splice(1);
                totalPrice += parseInt(el.wishList[0].price);
                present = el.wishList[0];
            } else {
                present = undefined;
            };
            const formattedFriend = {
                name: el.name,
                birthdate: el.birthdate,
                present: present
            };
            friendsList.push(formattedFriend);
        });
        const totalObj = {
            friendsList: friendsList,
            totalPrice: totalPrice
        }
        return totalObj;
        // return JSON.stringify(totalObj);
    } else {
        return friendsList;
    };
};

// console.log(getNextBirthdays('14.01.1994', phoneList2));
// console.log(getMonthsList(phoneList2));
//  console.log(getMinimumPresentsPrice(phoneList1));

module.exports = { getNextBirthdays, getMonthsList, getMinimumPresentsPrice };
