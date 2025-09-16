let moment = require("moment")()
function getDate(){
    return moment.format("y/D/M H:m:s")
}
function getCurrentDay(isString = true){
    /* 
    21313
    */
    let day = isString ? moment.format("dddd") : moment.format("d")
    console.log(`current day is ${ day }`)
    
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