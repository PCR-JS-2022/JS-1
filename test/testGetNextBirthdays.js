const { getNextBirthdays } = require("../");


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


answer = getNextBirthdays('28.02.1980', phoneList);


console.log(answer)