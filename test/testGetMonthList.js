const { getMonthsList } = require("../");


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
        birthdate: "27.01.1980",
    },
    {
        name: "Вася",
        birthdate: "20.03.1980",
    },
    {
        name: "Вася",
        birthdate: "20.04.1980",
    },
    {
        name: "Вася",
        birthdate: "20.10.1980",
    },
    {
        name: "Вася",
        birthdate: "20.06.1980",
    },
    {
        name: "Вася",
        birthdate: "20.07.1980",
    },
    {
        name: "Вася",
        birthdate: "20.09.1980",
    },
    {
        name: "Вася",
        birthdate: "20.11.1980",
    },
    {
        name: "Вася",
        birthdate: "20.12.1980",
    },
    {
        name: "Вася",
        birthdate: "20.02.1980",
    },
];


answer = getMonthsList(phoneList);


console.log(answer);