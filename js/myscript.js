"use strict";

var btnAxel = document.getElementById('btn-axel');
var btnMyriam = document.getElementById('btn-myriam');
var btnNoe = document.getElementById('btn-noe');
var btnAlexis = document.getElementById('btn-alexis');
var btnJerome = document.getElementById('btn-jerome');
var btnYoan = document.getElementById('btn-yoan');
var btnJen = document.getElementById('btn-jen');
var btnBrice = document.getElementById('btn-brice');
var btnThb = document.getElementById('btn-thb');
var btnDamienV = document.getElementById('btn-damien-v');
var btnCarine = document.getElementById('btn-carine');
var btnDamienM = document.getElementById('btn-damien-m');
var btnAlxdr = document.getElementById('btn-alxdr');
var btnBaptiste = document.getElementById('btn-baptiste');
var btnHug = document.getElementById('btn-hug');
var btnSeb = document.getElementById('btn-seb');
var btnArnaud = document.getElementById('btn-arnaud');
var btnAnst = document.getElementById('btn-anst');

var imgArr = [
    {url : 'img/alexandre_carrere.jpg', name : 'Alexandre'},
    {url : 'img/alexis.jpg', name : 'Alexis'},
    {url : 'img/anastasia_oudin.jpg', name : 'Anastasia'},
    {url : 'img/axel_darraba.jpg', name : 'Axel'},
    {url : 'img/baptiste.png', name : 'Baptiste'},
    {url : 'img/carine.jpg', name : 'Carine'},
    {url : 'img/damienMachado.jpg', name : 'Damien M.'},
    {url : 'img/hugues.png', name : 'Hugues'},
    {url : 'img/jennifer_villeroy.jpg', name : 'Jennifer'},
    {url : 'img/jerome_boucherie.jpg', name : 'Jerome'},
    {url : 'img/noe.jpg', name : 'Noé'},
    {url : 'img/seb.png', name : 'Sebastien'},
    {url : 'img/thibaut.jpg', name : 'Thibaut'},
    {url : 'img/yoan.jpg', name : 'Yoan'},
    {url : 'img/brice.jpg', name : 'Brice'},
    {url : 'img/myriam.jpg', name : 'Myriam'},
    {url : 'img/arnaud.jpg', name : 'Arnaud'}
];

var correctAnswer = [
    'Yes!',
    'Tu as raison!',
    'Correct!',
    'Super!',
    'Tu as une bonne memoire!',
    'There you go!',
    'Cool'
];

var incorrectAnswer = [
    'No...',
    'Mais ça va pas, non?',
    "C'est incorrect",
    'Demande son prénom pendant la pause',
    "N'hésite pas à redemander son prénom",
    "Tu t'es trompé :(",
    'Oh la la!',
    'Dommage'
];

var img = document.getElementById('imgToGuess');
var count = 0;
var score = 0;
var teamQuantity = document.getElementById('teamQuantity');
var phrase = document.getElementById('phrase');
var restartBtn = document.getElementById('restart-btn');


// inserts first image dynamically and shuffles img array
function setEnvironment() {
    shuffle(imgArr); // arrange array randomly
    count = 0; 
    score= 0;
    img.src = imgArr[count].url; // load the first img
    teamQuantity.innerHTML = imgArr.length;
    restartBtn.className = 'restart-btn_hidden'; // hide restart button
    phrase.className = "alert";
    phrase.innerHTML = "";
}

setEnvironment(); // call this function on document load


function shuffle(myArr) {
  myArr.sort(function() { 
      return (0.5 - Math.random());
  });
}


function onBtnClick() {
    
    if (count === imgArr.length - 1) {
        img.src = "img/gameOver.jpg";
        showResult();
        
    } else {
        count++;
        img.src = imgArr[count].url;
    } 
}

function countScore(btn) {
    var correctAnswer = btn.innerHTML;
    
    if (imgArr[count].name == correctAnswer) {
        score++;
        insertCorrectPhrase();
        changeAlertRight();
    } else {
        insertIncorrectPhrase();
        changeAlertWrong();
    }
}

function restToGuess() {
    teamQuantity.innerHTML = (imgArr.length - 1) - count;
}

function insertCorrectPhrase() {
    var randomNum = Math.floor(Math.random() * (correctAnswer.length - 1));
    var alreadyThereRight = phrase.innerHTML;
    if (correctAnswer[randomNum] === alreadyThereRight) {
        insertCorrectPhrase();
    } else {
        phrase.innerHTML = correctAnswer[randomNum];
    }  
}

function insertIncorrectPhrase() {
    var randomNumber = Math.floor(Math.random() * (incorrectAnswer.length - 1));
    var alreadyThereWrong = phrase.innerHTML;
    if (incorrectAnswer[randomNumber] === alreadyThereWrong) {
        insertIncorrectPhrase();
    } else {
        phrase.innerHTML = incorrectAnswer[randomNumber];
    }
}

function changeAlertRight() {
    phrase.className += " alert-success";
    phrase.className = phrase.className.replace( /(?:^|\s)alert-danger(?!\S)/g , '' );
    
}

function changeAlertWrong() {
    phrase.className += " alert-danger";
    phrase.className = phrase.className.replace( /(?:^|\s)alert-success(?!\S)/g , '' );

}

function showResult() {
    // clear every div styling
    phrase.className = phrase.className.replace( /(?:^|\s)alert-danger(?!\S)/g , '' );
    phrase.className = phrase.className.replace( /(?:^|\s)alert-success(?!\S)/g , '' );
    
    
    if (score <= 5) {
        phrase.innerHTML = "Ton resultat est : " + score + "<br> T'es trop nul";
        phrase.className += " final-alert_bad";
        
    } else if (score >= 6 && score <= 10) {
        
        phrase.className += " final-alert_middle";
        phrase.innerHTML = "Ton resultat est : " + score + "<br> Mmm, tu connais juste un moitier, fait un effort";
        
    } else if (score > 10 && score <= 15) {
        phrase.className += " final-alert_good";
        phrase.innerHTML = "Ton resultat est : " + score + "<br> Ça va pour l'instant, fait connaissance avec les autres";
    } else {
        phrase.className += " final-alert_good";
        phrase.innerHTML = "Ton resultat est : " + score + "<br> Nickel, tu es super fort!";
    }
    
    restartBtn.className += " restart-btn_visible";
    restartBtn.className = restartBtn.className.replace( /(?:^|\s)restart-btn_hidden(?!\S)/g , '' );
}


btnAlxdr.addEventListener('click', function(){countScore(btnAlxdr); restToGuess(); onBtnClick();});

btnAlexis.addEventListener('click', function(){countScore(btnAlexis); restToGuess(); onBtnClick();});

btnAnst.addEventListener('click', function(){countScore(btnAnst); restToGuess(); onBtnClick();});

btnArnaud.addEventListener('click', function(){countScore(btnArnaud); restToGuess(); onBtnClick();});

btnAxel.addEventListener('click', function(){countScore(btnAxel); restToGuess(); onBtnClick();});

btnBaptiste.addEventListener('click', function(){countScore(btnBaptiste); restToGuess(); onBtnClick();});

btnBrice.addEventListener('click', function(){countScore(btnBrice); restToGuess(); onBtnClick();});

btnCarine.addEventListener('click', function(){countScore(btnCarine); restToGuess(); onBtnClick();});

btnDamienM.addEventListener('click', function(){countScore(btnDamienM); restToGuess(); onBtnClick();});

btnHug.addEventListener('click', function(){countScore(btnHug); restToGuess(); onBtnClick();});

btnJen.addEventListener('click', function(){countScore(btnJen); restToGuess(); onBtnClick();});

btnJerome.addEventListener('click', function(){countScore(btnJerome); restToGuess(); onBtnClick();});

btnMyriam.addEventListener('click', function(){countScore(btnMyriam); restToGuess(); onBtnClick();});

btnNoe.addEventListener('click', function(){countScore(btnNoe); restToGuess(); onBtnClick();});

btnSeb.addEventListener('click', function(){countScore(btnSeb); restToGuess(); onBtnClick();});

btnThb.addEventListener('click', function(){countScore(btnThb); restToGuess(); onBtnClick();});

btnYoan.addEventListener('click', function(){countScore(btnYoan); restToGuess(); onBtnClick();});



restartBtn.addEventListener('click', function(){setEnvironment();});

