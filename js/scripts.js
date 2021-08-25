//utility functions
function getRandom() {
  return Math.ceil(Math.random() * 6);
}
//business logic

function Game() {
  this.players = {};
  this.status = true;
  this.turnCounter = 0;
  this.currentId = 0
  // this.currentPlayer = true

}

Game.prototype.addPlayer = function(player) {
  this.currentId++
  player.id = this.currentId
  this.players[player.id] = player
};

Game.prototype.changeTurn = function() {
  this.turnCounter++;
  return this.turnCounter;
};


Game.prototype.isPlayer2Turn = function() {
  if(this.turnCounter %2 === 0) {
    return true
  } else {
    return false
  }
}
// // UI 
// // if (Game.play()) {
//   player
// }

function Player(name) {
  this.name = name;
  this.total = 0;
  this.tempTotal = 0;
}
Player.prototype.roll = function() {
  //get number
  const diceRoll = getRandom();
  // if diceRoll is 1 then end turn
  if (diceRoll === 1) {
    this.tempTotal = 0
    return diceRoll
  } else {
    //add to temp
    this.tempTotal += diceRoll;
    //test if over 100
    if ((this.total + this.tempTotal) >= 100) {
      console.log("Game over. " + this.name + "wins!")
    } else {
      console.log("still playing");
    }
  }
  return diceRoll
}



//at end of the turn
Player.prototype.updateScore = function() {
  this.total += this.tempTotal;
}

// function changeTurns() {
//   //updating the turns - incrementing the counter
//   //if ...


// http://localhost:5500
// const newGame = new Game;
// const player1 = new Player("bob");
// newGame.addPlayer(player1);


//ui logic
const game = new Game;

function displayTotalScores(player1, player2) {
  $("#score-1").text(player1.total);
  $("#score-2").text(player2.total);
}

function displayTurn(player, currentDiceRoll) {
  $("#turn-score-display").text(player.tempTotal);
  $("#current-player").text(player.name);
  $("#roll-display").text(currentDiceRoll);
}

$(document).ready(function () {
//   $("form").submit(function (event) {
//     event.preventDefault();
    // const inputName = $("#input1").val();
  const player1 = new Player("Player1");
  const player2 = new Player("Player2");
  game.addPlayer(player1);
  game.addPlayer(player2);

  displayTotalScores(player1, player2);
  if (game.isPlayer2Turn()) {
    console.log("player2")
    displayTurn(player2);
  } else {
    console.log("player1")
    displayTurn(player1);
  }
  
  $("#roll").click(function() {
    //random
    // const diceRoll = getRandom();
    //
    let currentPlayer;
    let otherPlayer;  
  
    if (game.isPlayer2Turn()) {
      currentPlayer = player2;
      otherPlayer = player1
    } else {
      currentPlayer = player1;
      otherPlayer = player2;
    }
    // updates temp total, checks to see if game end, returns dice roll
    let currentDiceRoll = currentPlayer.roll();
    if (currentDiceRoll === 1) {
      game.changeTurn();
      displayTurn(otherPlayer, "");
    } else {
      // check if dice roll is 1, change turn, call displayturn with other other player
      //display both player stats and dice roll
      displayTurn(currentPlayer, currentDiceRoll);
    }
  });
  $("#hold").click(function() {

  })
  // player2.roll
});