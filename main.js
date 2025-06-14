let hours = parseFloat(document.getElementById('hours').innerText);
let mins = parseFloat(document.getElementById('mins').innerText);
let secs = parseFloat(document.getElementById('secs').innerText);
let millisecs = parseFloat(document.getElementById('millisecs').innerText);
let holders = document.getElementsByClassName('holder');

let isRunning = false;
let clock;

function start(){

if(isRunning == false){
    document.getElementById('startBtn').innerText = "START";
    clock = setInterval(() => {
    isRunning=true;
    if(millisecs<99){

         millisecs++;

         document.getElementById('millisecs').innerText = millisecs;

} else if(millisecs==99){

    millisecs=0;

    secs++;

    document.getElementById('secs').innerText = secs;

    if(secs==59){

        secs=0;

        mins++;

        document.getElementById('mins').innerText = mins;

    } else if(mins==59){

            mins=0;

            hours++

            document.getElementById('hours').innerText = hours;

    }

}

}, 10);

}

}


function pause(param){
    isRunning = false;
    clearInterval(clock);
    document.getElementById('startBtn').innerText = param;
}

function reset(){
    //alert(holders);...[{div1},div{2}....]
    hours = 0;
    mins = 0;
    secs = 0;
    millisecs = 0;
    pause("START");
    for(i=0; i<holders.length; i++){
        holders[i].innerText=0;
    }

}