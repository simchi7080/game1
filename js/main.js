var pscoore = document.getElementsByClassName("winers")[0];
var tottelscoores = "";
var haed = document.getElementById("hadeline");
var time = document.getElementById("time");

var timeval = 60;
var bagin = null;
var yourname = [];
var highscores = [];

// להוציא מהאחסון את שמות המנצחים
var highscoresJSON = localStorage.getItem("allscores");
if (highscoresJSON != null) {
    highscores = JSON.parse(highscoresJSON);
}
createHTML();
// ------------------------------------------------
// הפעלת המשחק

function ternon() {
    funcs.start();
}
var spiner = document.getElementById("spiner");
var dur = 2;
const funcs = {
    start: function () {
        confirm("are you redy to start?");
        bagin = setInterval(() => {
            // spiner.addEventListener("mouseover", position);
            timeval--;
            time.innerHTML = timeval;
            spiner.style.animationDuration = dur + "s";
            spiner.addEventListener("click", clickin);
            black.addEventListener("click", clickout);
            if (timeval == 0) {
                this.stop(bagin);
            }
        }, 100)
    },
    stop: function (x) {
        clearInterval(x);
        this.finishgame();
    },
    finishgame: function () {
        spiner.style.animation= "stop";
        addscoore();
        alert(yourname + " your score is " + score.val)

    }
};

function addscoore() {
    yourname = prompt("Write your name here :");
    var scoores =score.val;
    var thedate = new Date;
    var newscoore = {
        player: yourname,
        score: scoores,
        date: thedate.toLocaleDateString(),
    }
    highscores.push(newscoore)
    checkwiner()
    if (highscores.length > 5) {
        highscores.pop()
    }
    addstoraga()

    function checkwiner() {
        highscores.sort((a, b) => {
            return b.score - a.score;
        })
    };

    function addstoraga() {
        var highscoresJSON = JSON.stringify(highscores);
        localStorage.setItem("allscores", highscoresJSON);
    }
};

function createHTML() {
    tottelscoores = "";
    highscores.forEach(createscoore);
    pscoore.innerHTML = tottelscoores;
}

function createscoore(scoore, i) {
    tottelscoores += `<p class"scoorlist">${(i+1)}-${scoore.player}-${scoore.score}<span class="mis">${scoore.date}</span></p>`
}
// ----------------------------------------------------------------------------------------
// הדיב הזז
var jamp = null

function position() {
    spiner.style.top = Math.floor(Math.random() * 550) + 20 + "px";
    spiner.style.right = Math.floor(Math.random() * 750) + 20 + "px";
};
// // ----------------------------------------------------------------------------------------
// לוח המשחק
var score = document.getElementById("score")
score.val = 0;
var nextlevele = document.getElementById("next levele")
nextlevele.val = 10;
var levele = document.getElementById("levele")
levele.val = 1;
var missedclicks = document.getElementById("missed clicks")
missedclicks.val = 0;

// לוח המשחק קליקים טובים
function clickin() {
    if (levele.val > 5) {
        funcs.stop(bagin);
        levele.innerHTML = "5";
        nextlevele.innerHTML ="10";
    } else if (nextlevele.val != 1) {
        timeval += 10;
        score.val += 10 * levele.val;
        score.innerHTML = score.val;
        nextlevele.val--;
        nextlevele.innerHTML = nextlevele.val;
    } else {
        nextlevele.val = 10;
        nextlevele.innerHTML = nextlevele.val;
        levele.val++;
        levele.innerHTML = levele.val;
        dur -= 0.25;
    }
};
// לוח המשחק קליקים מזויפים
var black = document.getElementById("black");

function clickout() {
    missedclicks.val++;
    missedclicks.innerHTML = missedclicks.val;
    score.val -= 1 * levele.val;
    score.innerHTML = score.val;
};