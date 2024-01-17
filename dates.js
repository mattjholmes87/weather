const todaysDateAgain = new Date();
console.log(todaysDateAgain);
console.log("todaysDate", todaysDateAgain.toLocaleString());
const nextMonth = new Date(todaysDateAgain.getTime());
const newMonthNumber = todaysDateAgain.getMonth() + 1;
nextMonth.setMonth(newMonthNumber);
const nextMonthString = nextMonth.toLocaleDateString();
console.log("Next Month", nextMonthString);

const todaysDate = new Date();
console.log(todaysDate);
const present = todaysDate.getTime();
console.log(present);
