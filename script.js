let start = document.querySelector('.start');
let pause = document.querySelector('.paulsa');
let cancel = document.querySelector('.cancelar');
let time = document.querySelector('#time')


//Input Time
let campoHora = document.querySelector('input[type="time"]');

start.addEventListener('click', startTime)
cancel.addEventListener('click', cancelaTime);


let hour;
let minute;
let second;
let isPause = false;
let interval;
let startOn;

window.addEventListener('keyup', () => {

    if (event.keyCode == 73) {
        start.innerHTML = 'PAUSE'
        startTime()
        return;
    }

    if (event.keyCode == 80) {

        pauseTime()
        return;
    }

})

function startTime() {

    if (isPause) {

        start.innerHTML = 'INICIAR'
        pauseTime()

    } else if (!isPause && startOn) {

        campoHora.setAttribute('disabled', 'disabled');

        start.innerHTML = 'PAUSAR'
        interval = setInterval(countTime, 1000);
        isPause = true;

    } else {

        setTimes()

        start.innerHTML = 'PAUSE'
        interval = setInterval(countTime, 1000);
        isPause = true;
        startOn = true;


    }

}


function setTimes() {

    const timeInput = campoHora.value.split(':').map(Number)

    hour = timeInput[0];
    minute = timeInput[1]
    second = timeInput[2];

    time.innerHTML = `${formataTime(hour)}:${formataTime(minute)}:${formataTime(second)}`;


    return true;

}

function countTime() {

    if (checkTime()) {
        cancelaTime();
        return;
    }

    if (second == 0) {

        if (minute == 0) {
            hour = hour - 1;
        }

        minute == 00 ? minute = 59 : minute = minute - 1;
        second = 59;
    }

    time.innerHTML = `${formataTime(hour)}:${formataTime(minute)}:${formataTime(second)}`;

    second--;

}

function pauseTime() {

    clearTimeout(interval)

    start.innerHTML = 'INICIAR'
    isPause = false;
    startOn = true;


}

function cancelaTime() {

    pauseTime()

    time.innerHTML = '00:00:00'

    campoHora.removeAttribute('disabled')

    isPause = false;
    startOn = false;
}

function checkTime() {

    if (hour == 0 && minute == 00 && second == 0) {

        pauseTime()
        cancelaTime()
        alert('🚨-----FIM DO TEMPO-------🚨')

        return true;
    }
    else{
        return false

    }

}

function formataTime(time) {
    if (time < 10) {
        return `0${time}`

    } 
    else{

        return time
    } 
    
}


