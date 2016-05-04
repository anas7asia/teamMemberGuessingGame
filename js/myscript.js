"use strict";

var imgArr = [
    {url : 'img/alexis.png', name : 'Alexis'},
    {url : 'img/anastasia.png', name : 'Anastasia'},
    {url : 'img/arnaud.png', name : 'Arnaud'},
    {url : 'img/axel.png', name : 'Axel'},
    {url : 'img/baptiste.png', name : 'Baptiste'},
    {url : 'img/brice.png', name : 'Brice'},
    {url : 'img/carine.png', name : 'Carine'},
    {url : 'img/damien-m.png', name : 'Damien M.'},
    {url : 'img/damien-v.png', name : 'Damien V.'},
    {url : 'img/hugues.png', name : 'Hugues'},
    {url : 'img/jennifer.png', name : 'Jennifer'},
    {url : 'img/jerome.png', name : 'Jerome'},
    {url : 'img/myriam.png', name : 'Myriam'},
    {url : 'img/noe.png', name : 'Noé'},
    {url : 'img/seb.png', name : 'Sebastien'},
    {url : 'img/thibaut.png', name : 'Thibaut'},
    {url : 'img/yoan.png', name : 'Yoan'},
    {url : 'img/alexandre.png', name : 'Alexandre'}   
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
    'Non...',
    'Mais ça va pas, non?',
    "Incorrect.",
    "Tu t'es trompé :(",
    'Oh la la!',
    'Dommage.',
    'Mais non!',
    'Mauvaise réponse...',
    'Pas de chance!',
    'No'
];

var img = document.getElementById('imgToGuess');
var btnContainer = document.getElementById('btn-container');
var count = 0;
var score = 0;
var teamQuantity = document.getElementById('teamQuantity');
var phrase = document.getElementById('phrase');
var restartBtn = document.getElementById('restart-btn');


// creates buttons, inserts first image dynamically and shuffles img array
function setEnvironment() {
    createButtons();
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


function createButtons() {
    // sorts imgArr alphabetically to to set buttons order properly
    imgArr.sort(function(a, b) {
        return a.name.localeCompare(b.name);
    });

    for (var i=0; i < imgArr.length; ++i) {
        var personBtn = document.createElement('button');
        personBtn.className = 'btn btn-default';
        personBtn.innerHTML = imgArr[i]['name'];
        personBtn.addEventListener('click', function(){countScore(this); restToGuess(); onBtnClick();}, false);
        btnContainer.appendChild(personBtn);
    }
}

// sorts imgArr randomly
// @param (array) initial image array
function shuffle(myArr) {
  myArr.sort(function() { 
      return (0.5 - Math.random());
  });
}

// counting function
// when last image was guessed, the result will be shown 
function onBtnClick() {
    if (count === imgArr.length - 1) {
        img.src = "img/gameOver.jpg";
        showResult();
        
    } else {
        count++;
        img.src = imgArr[count].url;
    } 
}

// counts good answers and number of guesses
// @param (string) btn is an html tag to get value from
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

// backward counting
function restToGuess() {
    teamQuantity.innerHTML = (imgArr.length - 1) - count;
}

// inserts random phrase, if this phrase was showns previously,
// it will try to choose a new one 
function insertCorrectPhrase() {
    var randomNum = Math.floor(Math.random() * (correctAnswer.length - 1));
    var alreadyThereRight = phrase.innerHTML;
    if (correctAnswer[randomNum] === alreadyThereRight) {
        insertCorrectPhrase();
    } else {
        phrase.innerHTML = correctAnswer[randomNum];
    }  
}

// same as previous
function insertIncorrectPhrase() {
    var randomNumber = Math.floor(Math.random() * (incorrectAnswer.length - 1));
    var alreadyThereWrong = phrase.innerHTML;
    if (incorrectAnswer[randomNumber] === alreadyThereWrong) {
        insertIncorrectPhrase();
    } else {
        phrase.innerHTML = incorrectAnswer[randomNumber] + " C'était " + imgArr[count].name;
    }
}

function changeAlertRight() {
    phrase.className = "alert alert-success";    
}

function changeAlertWrong() {
    phrase.className = "alert alert-danger";
}

function showResult() {
    // clear every div styling, should keep it
    phrase.className = "alert";
    // empty button container
    while (btnContainer.firstChild) {
        btnContainer.removeChild(btnContainer.firstChild);
    }
    
    
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

// this button is created manually in html document 
restartBtn.addEventListener('click', function(){setEnvironment();});

