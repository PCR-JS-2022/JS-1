const { getMinimumPresentsPrice } = require("../");


const phoneList = [
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

answer = getMinimumPresentsPrice(phoneList);


console.log(answer)