
ui functions

buttons
displayRoll
displayScore

~~~Rules of Pig dice:
Each player takes turns rolling the dice
    one player rolls and they can decide to either keep rolling Hold their points => add to score
        or if the roll a 1, they gain no score and their turn ends

    •    What will happen when a user clicks "Play"?
    creates game object
    creates player scores    

    •    What objects will you need?
    player 1 -
        player {
            score: 0 (starts at 0) adds when player decides to hold
            total wins:
            temp score: current active score
            name:
                }
    player 2 -  same constructor
    
game - 
            game{
                Game total/history:
                dice -
                active score = (starts a zero and adds dice value)
                playerturn = number val. Turn determined by whether the turn is odd or even
                Turn total:
                }

Game.prototype.Roll(dice)
    dice roll generate a random number 1-6 Math.floor((Math.random()*6 ) + 1) //test in console//
    return value

Game.prototype.Hold{
    active score => player bank
    

Game.prototype.turnCounter{
    increment by 1
    i = game.playerturn
    if (i %2 === 0) then true
    else if I % 2 === 1 then false

Game.prototype.turn(




    •    What key-value pairs will each object need to contain in order for the game to work?
    game{
                Game total/history:
                dice -
                active score = (starts a zero and adds dice value)
                playerturn = number val. Turn determined by whether the turn is odd or even
                Turn total:
                }

    •    What functions?
    •    Game.prototype.Roll(dice)
    •    Game.prototype.Hold{
    •    Game.prototype.turnCounter{
    •    How will these be triggered throughout the gameplay?
    •    play button shows game board
    •    hold button
    •       Roll button
    •    How will information be collected from the user? How will it be displayed?through buttons and displayed through UI

    •    When you have a broad overview of how you want to build your game, identify the simplest behavior, and perhaps what behaviors to tackle after that. Remember to start simple and work one step at a time.

Simplest:
    1. Player and game constructors
        Initializes the game
        initialize TWO players
    2. Dice roll function
        if one add 0 and change turn
        else add value of dice
    3.  END Turn function

    4. Hold function
        4.5. Score function: add turn score to total score 

    6. Is game over turn or false


Business
Roll
Score
End turn
Game and player constructor


User
Start game
    play button
        create game + payers
Hold button
    add score to player total
    change turn
Roll
    if 1 then  reset to 0
    else
    add val of dice to turn score




Wishlist:
  clean up styling
  add an opening page
  instructions
  enter names for p1 and p2
  

  add a computer player 2 or vs computer

  game total/history
  Dice animations and img
  Background color change to indicate turn


  comp:
  setup - button (play against comp), name of player2 submit handler
  easy setting
  
  display - computer turn (colors, etc)
  called when we hold - pass to comp

  pause
  -setTimeout(2000);

  announce somehow the computers actions
  -div: the computer rolls/holds...
  pause everytime
  modified roll function?
    computerRoll();
    pause
    computerRoll();
    pause
    computerHold();

    player constructor comp property


  