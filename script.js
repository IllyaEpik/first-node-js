let moment = require("moment")()
function getDate(){
    return moment.format("y/D/M H:m:s")
}
function getCurrentDay(){
    console.log(`current day is ${ moment.format("dddd")}`)
}
function getCurrentMouth(){
    console.log(`current mouth is ${moment.format("MMMM")}`)
}
function getCurrentYear(){
    console.log(`current year is ${moment.year()}`)
}
getCurrentYear()
getCurrentMouth()
getCurrentDay()
console.log(getDate())