let start = document.querySelector('.start');
let pause = document.querySelector('.paulsa');
let cancel = document.querySelector('.cancelar');
let time = document.querySelector('#time')

//Input Time
let campoHora = document.querySelector('input[type="time"]');

start.addEventListener('click', startTime)
cancel.addEventListener('click', cancelTime);

let hour;
let minute;
let second;
let isPause = false;
let interval;

window.addEventListener('keyup', () => {
    console.log(KeyboardEvent.code)

    if(event.keyCode == 73){
        startTime()
        
        return
    }

    if(event.keyCode == 80){
        pauseTime()
        return
    }

})

function startTime() {

    
    if (isPause) {
        countTime()
        start.innerHTML = 'iniciar';
        start.classList.add('start')
        pauseTime()
        isPause = false;
        
    } else {
        setTimes();
        countTime()

        campoHora.setAttribute('disabled', 'disabled');
        start.innerHTML = 'pause';
        interval = setInterval(countTime, 10);
        isPause = true;

    }

}


function setTimes() {

    const time = campoHora.value.split(':').map(Number)

    hour = time[0];
    minute = time[1]
    second = time[2];

    time.innerHtml = `${formatTime(hour)}:${formatTime(minute)}:${formatTime(second)}`

}

function countTime() {

    if (checkTime()) {
        cancelTime();
        return false
    }


    if (second == 0) {

        if(minute == 0){
            hour = hour - 1 ;
        }

        minute == 00 ? minute = 59 : minute = minute - 1;
        second = 59;
    }



    time.innerHTML = `${formatTime(hour)}:${formatTime(minute)}:${formatTime(second)}`

    second--;

}


function pauseTime() {

    clearTimeout(interval)
    start.addEventListener('click', startTime)
    isPause = false;

}

function cancelTime() {

    campoHora.removeAttribute('disabled')
    clearTimeout(interval)

    time.innerHTML = '00:00:00'
    start.addEventListener('click', startTime)

    start.innerHTML = 'iniciar';

    isPause = false;
}

function checkTime() {

    if (hour == 00 && minute == 00 && second == 00) {

        pauseTime()
        cancelTime()
        alert('fim do tempo')

        return true;

    }
    else {
        return false
    }

}

function formatTime(time) {
    if (time < 10) {
        return `0${time}`
    } else {
        return time
    }
}


