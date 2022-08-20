const time = document.querySelector('.time');
const ourDate = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const yourName = document.querySelector('.name');


window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

let getTimeOfDay = (h) => {
    const timeOfDay = ['morning', 'afternoon', 'evening', 'night'];
    if (h <= 5) {
        return timeOfDay[3]
    } else {
       let index = Math.floor(h/6) - 1;
        return timeOfDay[index] 
    }
};


function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;

    function showGreeting() {
        const hours = date.getHours();
        greeting.textContent = `Good ${getTimeOfDay(hours)}`;
    };
    showGreeting();

    setTimeout(showTime, 1000);
}
showTime()

function showDate() {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString('en-US', options);
    ourDate.textContent = currentDate;
    setTimeout(showDate, 1000)
}
showDate()

function setLocalStorage() {
    localStorage.setItem('name', yourName.value);
}

function getLocalStorage() {
    if(localStorage.getItem('name')) {
        yourName.value = localStorage.getItem('name')
    }
}