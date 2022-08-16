const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const body = document.querySelector('body');
let randomNum;

slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)

function getRandomNum(min, max) {
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min
 }
 getRandomNum(20, 1)

let getTimeOfDay = (h) => {
    const timeOfDay = ['morning', 'evening', 'afternoon', 'night'];
    let index = Math.floor(h/6) - 1;
    return timeOfDay[index]
};

function setBg() {
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay = getTimeOfDay(hours)
    let bgNum = randomNum.toString().padStart(2, "0")
    const img = new Image();
    img.src = `https://github.com/rolling-scopes-school/stage1-tasks/blob/assets/images/${timeOfDay}/${bgNum}.jpg?raw=true` 
    img.onload = () => {       
        body.style.backgroundImage = `url('https://github.com/rolling-scopes-school/stage1-tasks/blob/assets/images/${timeOfDay}/${bgNum}.jpg?raw=true')`
    }
}
setBg()

function getSlideNext() {
    randomNum +=1
    if (randomNum > 20) randomNum = 1
    setBg()
}
function getSlidePrev() {
    randomNum -= 1 
    if (randomNum < 1) randomNum = 20
    setBg()
}