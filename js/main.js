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
var run = 300;
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
        spiner.style.animation = "stop";
        addscoore();
    }
};

function addscoore() {
    setTimeout(() => {
        if(highscores.length<5){
            yourname = prompt("Write your name here :")
        }else if (scoreval> highscores[highscores.length - 1].score) {
            yourname = prompt("Write your name here :")
        }
            alert(yourname + " your score is " + scoreval)
            score.innerHTML = "0";
            nextlevele.innerHTML = "10";
            levele.innerHTML = "1";         
            missedclicks.innerHTML = "0";  

            var scoores = scoreval;       
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
            scoreval = 0;
            nextleveleval = 10;
            leveleval = 1;
            missedclicksval = 0;
            timeval = 60;
            time.innerHTML = "60";
            yourname=[];
        }
    }, 100);

    function addstoraga() {
        var highscoresJSON = JSON.stringify(highscores);
        localStorage.setItem("allscores", highscoresJSON);
        createHTML();
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
    setTimeout(() => {
        spiner.style.top = Math.floor(Math.random() * 550) + 20 + "px";
        spiner.style.right = Math.floor(Math.random() * 750) + 20 + "px";
    }, run);
}

// // ----------------------------------------------------------------------------------------
// לוח המשחק
var score = document.getElementById("score")
var scoreval = 0;
var nextlevele = document.getElementById("next levele")
var nextleveleval = 10;
var levele = document.getElementById("levele")
var leveleval = 1;
var missedclicks = document.getElementById("missed clicks")
var missedclicksval = 0;

// לוח המשחק קליקים טובים
function clickin() {
    if (leveleval > 5) {
        funcs.stop(bagin);
        levele.innerHTML = "5";
        nextlevele.innerHTML = "10";
    } else if (nextleveleval != 1) {
        scoreval += 10 * leveleval;
        score.innerHTML = scoreval;
        nextleveleval--;
        nextlevele.innerHTML = nextleveleval;
    } else {
        nextleveleval = 10;
        nextlevele.innerHTML = nextleveleval;
        leveleval++;
        levele.innerHTML = leveleval;
        timeval += 10;
        dur -= 0.25;
        run -= 50;
    }
};
// לוח המשחק קליקים מזויפים
var black = document.getElementById("black");

function clickout() {
    missedclicksval++;
    missedclicks.innerHTML = missedclicksval;
    scoreval -= 1 * leveleval;
    score.innerHTML = scoreval;
};