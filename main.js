let hours = parseFloat(document.getElementById('hours').innerText);
let mins = parseFloat(document.getElementById('mins').innerText);
let secs = parseFloat(document.getElementById('secs').innerText);
let millisecs = parseFloat(document.getElementById('millisecs').innerText);
let holders = document.getElementsByClassName('holder');

let isRunning = false;
let clock;

function start() {
    if (isRunning == false) {
        document.getElementById('startBtn').innerText = "START";
        clock = setInterval(() => {
            isRunning = true;
            if (millisecs < 99) {
                millisecs++;
                document.getElementById('millisecs').innerText = millisecs;
            } else if (millisecs == 99) {
                millisecs = 0;
                secs++;
                document.getElementById('secs').innerText = secs;
                if (secs == 59) {
                    secs = 0;
                    mins++;
                    document.getElementById('mins').innerText = mins;
                } else if (mins == 59) {
                    mins = 0;
                    hours++
                    document.getElementById('hours').innerText = hours;
                }
                
            }
            
        }, 10);
        
    }
}

function pause(param) {
    isRunning = false;
    clearInterval(clock);
    document.getElementById('startBtn').innerText = param;
}

function reset() {
    hours = 0;
    mins = 0;
    secs = 0;
    millisecs = 0;
    pause("START");
    for (i = 0; i < holders.length; i++) {
        holders[i].innerText = 0;
    }
}

let logger = document.getElementById('logger');
let item = document.getElementById('toolsHolder');
let colInpt = document.getElementById('colInpt');
let rangeInpt = document.getElementById("rangeInpt");
let disp_none = document.getElementsByClassName('disp_none');
let borderWidth_inpt = document.getElementById("borderWidth_inpt");

function showTools() {
    if (item.style.display == "none") {
        item.style.display = "flex";
        for (i = 0; i < disp_none.length; i++) {
            disp_none[i].style.display = "block";
        }
    } else {
        
        saveStyles(); // save styles when closing tools
        
        item.style.display = "none";
        document.getElementById("rangeInpt").style.display = "none";
        for (i = 0; i < disp_none.length; i++) {
            disp_none[i].style.display = "none";
        }
    }
}

let theItem;

function styleUp(item) {
    theItem = document.getElementById(item);
    logger.innerText = "element being styled is " + theItem.id;
}

function getCol() {
    theItem.style.background = colInpt.value;
}

function getRange() {
    theItem.style.borderRadius = rangeInpt.value + "px";
}

function changeBorder_wdth() {
    theItem.style.borderWidth = parseFloat(borderWidth_inpt.value) / 10 + "px";
}

function saveStyles() {
    
    const ids = [
        "bg", "hours", "mins", "secs", "millisecs",
        "startBtn", "pauseBtn", "resetBtn"
    ];
    
    let styles = {};
    
    ids.forEach(id => {
        const el = document.getElementById(id);
        
        styles[id] = {
            background: el.style.background,
            borderRadius: el.style.borderRadius,
            borderWidth: el.style.borderWidth
        };
    });
    
    localStorage.setItem("watchStyles", JSON.stringify(styles));
}

function loadStyles() {
    
    const saved = localStorage.getItem("watchStyles");
    if (!saved) return;
    
    const styles = JSON.parse(saved);
    
    for (let id in styles) {
        
        const el = document.getElementById(id);
        if (!el) continue;
        
        el.style.background = styles[id].background;
        el.style.borderRadius = styles[id].borderRadius;
        el.style.borderWidth = styles[id].borderWidth;
    }
}

window.onload = loadStyles;