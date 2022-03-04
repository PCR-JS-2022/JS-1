/* functions */
const removeDuplicates = (originalArray, prop) => {
 const newArray = [];
 const lookupObject = {};

 for (let i in originalArray) {
  lookupObject[originalArray[i][prop]] = originalArray[i];
 }
 console.log();
 for (i in lookupObject) {
  newArray.push(lookupObject[i]);
 }
 return newArray;
};
const isValidDate = (dateString) => {
 if (
     !/^\d{1,2}.\d{1,2}.\d{4}$/.test(dateString) ||
     typeof dateString !== "string"
 ) {
  return false;
 }
 const parts = dateString.split(".");
 const day = parseInt(parts[0], 10);
 const month = parseInt(parts[1], 10);
 const year = parseInt(parts[2], 10);
 if (month == 0 || month > 12) {
  return false;
 }

 const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
 if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
  monthLength[1] = 29;
 return day > 0 && day <= monthLength[month - 1];
};
const getNextBirthdays = (date, phoneList) => {
 let result = [];
 if (!isValidDate(date) || !Array.isArray(phoneList)) return [];
 const currentDateArr = date.split(".");
 const currentDateTime = new Date(
     currentDateArr[2],
     currentDateArr[1],
     currentDateArr[0]
 ).getTime();
 phoneList.forEach((friend) => {
  let friendArr = friend.birthdate.split(".");
  const friendDateTime = new Date(
      friendArr[2],
      friendArr[1],
      friendArr[0]
  ).getTime();
  if (friendDateTime < currentDateTime) {
   result.push(friend);
  }
 });
 return result.sort(
     (a, b) =>
         new Date(a.birthdate.split(".").reverse()).getTime() -
         new Date(b.birthdate.split(".").reverse()).getTime()
 );
};
const getMonthsList = (phoneList) => {
 let result = [];
 const months = Array.from({ length: 12 }, (e, i) => {
  return new Date(null, i + 1, null).toLocaleDateString("ru", {
   month: "long",
  });
 });
 phoneList.forEach((friend, i) => {
  const birthDateMonth = +friend.birthdate.split(".")[1];
  const phoneListFiltered = phoneList.filter(
      (person) => +person.birthdate.split(".")[1] === birthDateMonth
  );
  const object = {
   month: months[birthDateMonth - 1],
   friends: [...phoneListFiltered],
  };
  result.push(object);
 });
 console.log(removeDuplicates(result, "month"));
 return removeDuplicates(result, "month");
};
module.exports = { getMonthsList, getNextBirthdays };