// Finding elements

const playBtn = document.querySelector('.play_button');
const navBtns = document.querySelectorAll('.nav_item')
const solovey = document.querySelector('.solovey')
const drozd = document.querySelector('.drozd')
const zarynka = document.querySelector('.zarynka')
const javoronok = document.querySelector('.javoronok')
const slavka = document.querySelector('.slavka')
const forest = document.querySelector('.logo')
const backgrnd = document.querySelector('.content')
const controlVol = document.getElementById('volume');
const muteBtn = document.querySelector('.volume_icon')
const audio = new Audio();


// Setting up
audio.src = './assets/audio/forest.mp3'
let isPlay = false;
const birdsArr = ['forest', 'solovey', 'drozd', 'zarynka', 'javoronok', 'slavka']


// Functions

const playAudio = () => {
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
}

const pauseAudio = () => {
    audio.pause();
    isPlay = false;
}

function updateVol(){
    let volume = controlVol.value;
    audio.volume = volume / 100;
}

function preloadImages() {
    birdsArr.forEach( (bird) => {
      const img = new Image();
      img.src = `./assets/img/${bird}.jpg`;
    })
}


// Listeners

playBtn.addEventListener('click', () => {
    if (isPlay === true) {
        playBtn.classList.toggle('on_pause')
        pauseAudio()
    } else {
        playBtn.classList.toggle('on_pause')
        playAudio()
    }
})

forest.addEventListener('click', () =>{
        navBtns.forEach( (item) => {
            item.classList.remove('nav_item_active')
        })
    event.target.classList.add('nav_item_active')
    audio.src = "./assets/audio/forest.mp3"
    backgrnd.style.background = 'url(./assets/img/forest.jpg)'
    isPlay = true
    playBtn.classList.add('on_pause')
    playAudio()
    
})

solovey.addEventListener('click', () =>{
        navBtns.forEach( (item) => {
            item.classList.remove('nav_item_active')
        })
    event.target.classList.add('nav_item_active')
    audio.src = "./assets/audio/solovey.mp3"
    backgrnd.style.background = 'url(./assets/img/solovey.jpg)'
    isPlay = true
    playBtn.classList.add('on_pause')
    playAudio()
    
})

drozd.addEventListener('click', () =>{
    navBtns.forEach( (item) => {
        item.classList.remove('nav_item_active')
    })
    event.target.classList.add('nav_item_active')
    audio.src = "./assets/audio/drozd.mp3"
    backgrnd.style.background = 'url(./assets/img/drozd.jpg)'
    isPlay = true
    playBtn.classList.add('on_pause')
    playAudio()
})

zarynka.addEventListener('click', () =>{
    navBtns.forEach( (item) => {
        item.classList.remove('nav_item_active')
    })
    event.target.classList.add('nav_item_active')
    audio.src = "./assets/audio/zarynka.mp3"
    backgrnd.style.background = 'url(./assets/img/zarynka.jpg)'
    isPlay = true
    playBtn.classList.add('on_pause')
    playAudio()
})

javoronok.addEventListener('click', () =>{
    navBtns.forEach( (item) => {
        item.classList.remove('nav_item_active')
    })
    event.target.classList.add('nav_item_active')
    audio.src = "./assets/audio/javoronok.mp3"
    backgrnd.style.background = 'url(./assets/img/javoronok.jpg)'
    isPlay = true
    playBtn.classList.add('on_pause')
    playAudio()
})

slavka.addEventListener('click', () =>{
    navBtns.forEach( (item) => {
        item.classList.remove('nav_item_active')
    })
    event.target.classList.add('nav_item_active')
    audio.src = "./assets/audio/slavka.mp3"
    backgrnd.style.background = 'url(./assets/img/slavka.jpg)'
    isPlay = true
    playBtn.classList.add('on_pause')
    playAudio()
})

controlVol.addEventListener('input', () =>{
    controlVol.style.cssText = `background: linear-gradient(90deg, #bdae82 ${controlVol.value}%, rgba(255, 255, 255, 0.2) ${controlVol.value}%)`
})

controlVol.addEventListener('input', () =>{
    updateVol()  
    if ( muteBtn.classList.contains('volume_muted') && controlVol.value !== 0) {
        muteBtn.classList.remove('volume_muted')
    }
});

muteBtn.addEventListener('click', () => {
    
    if (audio.volume !== 0) {
        audio.volume = 0
        muteBtn.classList.add('volume_muted')
        controlVol.value = 0
        controlVol.style.cssText = `background: linear-gradient(90deg, #bdae82 ${controlVol.value}%, rgba(255, 255, 255, 0.2) ${controlVol.value}%)`
    } else {
        audio.volume = 1
        muteBtn.classList.remove('volume_muted')
        controlVol.value = 100
        controlVol.style.cssText = `background: linear-gradient(90deg, #bdae82 ${controlVol.value}%, rgba(255, 255, 255, 0.2) ${controlVol.value}%)`
}})


// Getting ready
preloadImages();