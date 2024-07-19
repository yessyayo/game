
//Selection of elements for functionality
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

const score1 = document.querySelector('#score--0');
const score2 = document.querySelector('#score--1');
const dice = document.querySelector('.dice');

const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');

const current1 = document.querySelector('#current--0');
const current2 = document.querySelector('#current--1');



let scores, currentScore, activePlayer, playGame;

//starting condition
const init = function(){
    score1.textContent = 0;
    score2.textContent = 0;
    dice.classList.add("hidden");

    
    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    playGame = true;

    current1.textContent = 0;
    current2.textContent = 0;

    dice.classList.add("hidden");
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
}
//initializing starting condition
init();



//Switch player function: this is placed here to avoid repetition.
const switchPlayer = function(){

    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
}

//roll dice fuctionality
rollBtn.addEventListener("click", function(){
    if(playGame){
        //Show the dice
        dice.classList.remove("hidden");

        //generate random dice roll
        const diceRoll = Math.trunc(Math.random() * 6) + 1;
        console.log(diceRoll);

        //Change dice image at each roll
        dice.src = `./images/dice-${diceRoll}.png`;

        //Update current score or switch player
        if (diceRoll !==1){
            currentScore += diceRoll; 
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } 
        else{
        switchPlayer();
        }    
    }
})

//hold button functionality
//When a player clicks on hold his score from the roll dices is assigned to his score including the current score.
holdBtn.addEventListener('click', function(){
    if(playGame){
        //Add current score to active player's total score
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

        // Check if player's score is >= 100 to finish the game
         if(scores[activePlayer] >= 100) {
            playGame = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
            dice.classList.add("hidden");
        } 
        else{
            switchPlayer();
        }
        
    }
})

// new game button fuctionality
//When any player clicks on new game the whole game reset to the default state.
newGame.addEventListener('click', init);

