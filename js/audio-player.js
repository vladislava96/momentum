const play = document.querySelector('.play');
const audioNext = document.querySelector('.play-next');
const audioPrev = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list');
import playList from './playList.js';


let isPlay = false;
let playNum = 0;
const audio = new Audio();

play.addEventListener('click', toggleBtn);
audioNext.addEventListener('click', playNext);
audioPrev.addEventListener('click', playPrev);


function playAudio() {
    if (audio.src != playList[playNum].src) {
       audio.src = playList[playNum].src 
    }
    
    audio.currentTime = 0;

    
    if(!isPlay) {
        isPlay = true;
        audio.play();  
    } else {
        isPlay = false;
        audio.pause()
    } 
}
function toggleBtn() {
    play.classList.toggle('pause');
    playAudio()
}
function playNext() {
    isPlay = false;
    playNum += 1;
    playAudio();
}
function playPrev() {
    isPlay = false;
    playNum -= 1;
    playAudio()
}

playList.forEach(el => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = el.title;
    playListContainer.append(li); 
})