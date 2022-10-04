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

window.addEventListener('keyup', () => {

    if (event.keyCode == 73) {
        startTime()

        return;
    }
    
    if (event.keyCode == 80) {

        start.innerHTML = 'iniciar';
        pauseTime()
        return;
    }
    
})

function startTime() {
    
    
    if (isPause) {
        countTime()
        start.innerHTML = 'iniciar';
        start.classList.add('start')
        pauseTime()
        isPause = false;

    } else  {
        countTime()
        setTimes();

        campoHora.setAttribute('disabled', 'disabled');
        start.innerHTML = 'pause';
        interval = setInterval(countTime, 1000);
        isPause = true;
    }

}


function setTimes() {

    const time = campoHora.value.split(':').map(Number)

    hour = time[0];
    minute = time[1]
    second = time[2];

    time.innerHtml = `${formataTime(hour)}:${formataTime(minute)}:${formataTime(second)}`;
  
}

function countTime() {

    if (checkTime()) {
        cancelaTime();
        return false
    }


    if (second == 0) {

        if (minute == 0) {
            hour = hour - 1;
        }

        minute == 00 ? minute = 59 : minute = minute - 1;
        second = 59;
    }

    time.innerHTML = `${formataTime(hour)}:${formataTime(minute)}:${formataTime(second)}`

    second--;

}


function pauseTime() {

    clearTimeout(interval)
    start.addEventListener('click', startTime)
    isPause = false;

}

function cancelaTime() {

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
        cancelaTime()
        alert('🚨-----FIM DO TEMPO-------🚨')

        return true;
    }
    else {
        return false
    }

}

function formataTime(time) {
    if (time < 10) {
        return `0${time}`

    } else {
        return time
    }
}


