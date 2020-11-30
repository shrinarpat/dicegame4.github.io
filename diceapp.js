var score,roundScore,activePlayer,dice,gamePlaying;
var diceSound = new Audio();
diceSound.src = "soundeffect/DICE.wav";

var holdAudioEffect = new Audio();
holdAudioEffect.src = "soundeffect/hold1.wav"; 

var winnerSound = new Audio();
winnerSound.src = "soundeffect/applause1.wav";
function init(){
    score = [0,0,0,0];
    roundScore = 0;
    //activePlayer = Math.floor(Math.random()*2);
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector('#player-' + activePlayer).classList.add('active');
    

  /*  alert(" Rule: 1. first Player with 100 Score will be the Winner, 2. if dice roll 1 then your current score is reduce to 0 and the control goes to next player, 3. using hold you can add your current score to main score and transfer the control to the next player");*/
    
}

init();

function toggleActiveClass(){
    document.getElementById('player-0').classList.remove('active');
    document.getElementById('player-1').classList.remove('active');
    document.getElementById('player-2').classList.remove('active');
    document.getElementById('player-3').classList.remove('active');
   
}

function playerTurn(){
    if(activePlayer === 0 || activePlayer === 1 || activePlayer === 2 ){
        activePlayer++;
    }else{
        activePlayer = 0;
    }
}


document.getElementById('roll-dice').addEventListener('click',function(){
   
    if(gamePlaying){
    dice = Math.floor(Math.random()*6)+1;
  
    document.getElementById('dice-image').src = 'image\\dice-' + dice + '.png';
    if(dice !== 1){
        diceSound.src = "soundeffect/DICE.wav";
        diceSound.play();
        roundScore += dice;
        document.getElementById('current-score-' + activePlayer).textContent = roundScore;  
         
    }else{
        diceSound.src = "soundeffect/aww.mp3";
        diceSound.play();
        roundScore = 0;
        document.getElementById('current-score-' + activePlayer).textContent = roundScore; 

       playerTurn();

       // activePlayer == 0?activePlayer = 1:activePlayer = 0;

        toggleActiveClass();
        document.getElementById('player-' + activePlayer).classList.add('active');
    }
    }
});


document.getElementById('hold').addEventListener('click',function(){ 
    holdAudioEffect.play();
    score[activePlayer] += roundScore;
    if(score[activePlayer] >= 100){

        diceSound.src = "";
        winnerSound.play();
        document.getElementById('global-score-' + activePlayer).textContent = score[activePlayer];

        document.querySelector('#player-0').classList.remove('active');
        document.querySelector('#player-1').classList.remove('active');
        
        document.querySelector('#player-2').classList.remove('active');
        document.querySelector('#player-3').classList.remove('active');

        document.querySelector('#player-' + activePlayer).classList.add('winner');

        document.getElementById('player-'+activePlayer).innerHTML = '<i>Winner!! <span class="glyphicon glyphicon-hand-down"></span></i>';

        document.getElementById('dice-image').src = 'image\\default-dice.png';
        roundScore = 0;
        document.getElementById('current-score-' + activePlayer).textContent = roundScore;
         gamePlaying = false;

    }else {

    document.getElementById('global-score-' + activePlayer).textContent = score[activePlayer];
    roundScore = 0;
    document.getElementById('current-score-' + activePlayer).textContent = roundScore;

     playerTurn();
    
    toggleActiveClass();
    document.getElementById('player-' + activePlayer).classList.add('active');
    }

    document.getElementById('new-game').addEventListener('click',function(){
        score = [0,0,0,0];
        roundScore = 0;
       
        gamePlaying = true;

        document.getElementById('dice-image').src = 'image\\default-dice.png';

        dice = Math.floor(Math.random()*6)+1;

        document.getElementById('global-score-0').textContent = '0';
        document.getElementById('global-score-1').textContent = '0';
        document.getElementById('global-score-2').textContent = '0';
        document.getElementById('global-score-3').textContent = '0';
        document.getElementById('current-score-0').textContent = '0';
        document.getElementById('current-score-1').textContent = '0';
        document.getElementById('current-score-2').textContent = '0';
        document.getElementById('current-score-3').textContent = '0';

        document.getElementById('player-0').innerHTML = '<b><span class="glyphicon glyphicon-hand-right"></span> Player-1</b>';
        document.getElementById('player-1').innerHTML = '<b><span class="glyphicon glyphicon-hand-right"></span> Player-2</b>';
        document.getElementById('player-2').innerHTML = '<b><span class="glyphicon glyphicon-hand-right"></span> Player-3</b>';
        document.getElementById('player-3').innerHTML = '<b><span class="glyphicon glyphicon-hand-right"></span> Player-4</b>';
        
        document.querySelector('#player-0').classList.remove('winner');
        document.querySelector('#player-1').classList.remove('winner');
        document.querySelector('#player-2').classList.remove('winner');
        document.querySelector('#player-3').classList.remove('winner');
        
        document.querySelector('#player-0').classList.remove('active');
        document.querySelector('#player-1').classList.remove('active');
        document.querySelector('#player-2').classList.remove('active');
        document.querySelector('#player-3').classList.remove('active');

        activePlayer = 0;

        document.querySelector('#player-' + activePlayer).classList.add('active');
    });
    
});



