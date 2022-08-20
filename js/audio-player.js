const play = document.querySelector('.play');
const audioNext = document.querySelector('.play-next');
const audioPrev = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list');
import playList from './playList.js';

const currentSong = document.querySelector('.current-song');
const progressTime = document.querySelector('.progress-time');
const progressSound = document.querySelector('.progress-sound');
const sound = document.querySelector('.sound');
const progress = document.querySelector('.progress');



let isPlay = false;
let playNum = 0;
const audio = new Audio();
let timerId;


play.addEventListener('click', toggleBtn);
audioNext.addEventListener('click', playNext);
audioPrev.addEventListener('click', playPrev);
audio.addEventListener('ended', playNext);

playList.forEach(el => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = el.title;
    playListContainer.append(li);
})



function setStyleActive() {
    const playItems = document.querySelectorAll('.play-item');
    if(!isPlay) {
        playItems[playNum].classList.remove('item-active')
    } else {
        playItems[playNum].classList.add('item-active')
    }
    currentSong.textContent = playList[playNum].title
}
function removeStyleActive() {
    const playItems = document.querySelectorAll('.play-item');
    playItems[playNum].classList.remove('item-active')
}

audio.volume = progressSound.value;

function playAudio() {
    if (audio.src != playList[playNum].src) {
       audio.src = playList[playNum].src 
    }
    audio.currentTime = 0;
    if(!isPlay) {
        isPlay = true;
        audio.play();
        
        timerId = setInterval(function() {

            let audioTimeRound = Math.round(audio.currentTime);
            let audioLength = Math.round(audio.duration);

            var currentMinutes = Math.floor(audioTimeRound / 60);
            var currentSeconds = (audioTimeRound - currentMinutes * 60);

            var durationMinutes = Math.floor(audioLength / 60);
            var durationSeconds = (audioLength - durationMinutes * 60);

            progressTime.textContent = `${(currentMinutes < 10 ? '0' : '') + currentMinutes}:${(currentSeconds < 10 ? '0' : '') + currentSeconds} / 
            ${(durationMinutes < 10 ? '0' : '') + durationMinutes}:${(durationSeconds < 10 ? '0' : '') + durationSeconds}`;

        }, 1000)
    } else {
        isPlay = false;  
        audio.pause();
        clearInterval(timerId)
        audio.currentTime = (progress.value * audio.duration) / 100
    }
    setStyleActive();
    
}

function toggleBtn() {
    play.classList.toggle('pause');
    playAudio()
}
function playNext() {
    isPlay = false;
    removeStyleActive();
    if (playNum === playList.length - 1) {
        playNum = 0
    } else {
        playNum += 1; 
    }
    playAudio();
    setStyleActive();
}
function playPrev() {
    isPlay = false;
    removeStyleActive();
    if (playNum === 0) {
        playNum = playList.length - 1
    } else {
        playNum -= 1;
    }
    playAudio();
    setStyleActive();
}



progress.addEventListener('input', function () {
    audio.currentTime = (audio.duration * progress.value) / 100;
}, false);

progressSound.addEventListener('input', function () {
    audio.volume = progressSound.value;
}, false);

audio.addEventListener('volumechange', function () {
    const persent = progressSound.value * 100;
    progressSound.style.background = `linear-gradient(to right, #FF940A 0%, #FF940A ${persent}%, #FFFFFF ${persent}%, #FFFFFF 100%)`;
    if (persent === 0) {
        audio.muted = true;
    } else if(persent !== 0){
        audio.muted = false;
    }
    if (audio.muted) {
        sound.style.backgroundImage = "url('../assets/svg/soundMuted.svg')";
        
    } else if(audio.muted === false){
        sound.style.backgroundImage = "url('../assets/svg/sound.svg')";
        
    }
}, false);

sound.addEventListener('click', toggleMute);

function toggleMute() {
    if (audio.muted) {
        audio.muted = false;
        progressSound.value = audio.volume;
    } else {
        audio.muted = true;
        progressSound.value = 0;
    }
}

progress.addEventListener('input', function() {
    audio.currentTime = (audio.duration * progress.value) / 100;
}, false);

audio.addEventListener('timeupdate', progressLine, false)

function progressLine() {
    const persent = (audio.currentTime / audio.duration) * 100;
    progress.style.background = `linear-gradient(to right, #FF940A 0%, #FF940A ${persent}%, #FFFFFF ${persent}%, #FFFFFF 100%)`;
    progress.value = persent;
}