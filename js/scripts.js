//utility functions
function getRandom() {
  return Math.ceil(Math.random() * 6);
}
//business logic

function Game() {
  this.players = {};
  this.status = true;
  this.turnCounter = 0;
  //this.currentPlayer

}

Game.prototype.addPlayer = function(player) {
  this.players[player.name] = player;
};

Game.prototype.changeTurn = function(player) {
  this.turnCounter++;
  return this.turnCounter;
};


// Game.prototype.play = function() {
//   if(this.getTurn()) 
// }


function Player(name) {
  this.name = name;
  this.total = 0;
  this.tempTotal = 0;
}
Player.prototype.roll = function() {
  //get number
  const diceRoll = getRandom();
  //add to temp
  this.tempTotal += diceRoll;
  //test if over 100
  if ((this.total + this.tempTotal) >= 100) {
    console.log("Game over. " + this.name + "wins!")
  } else {
    console.log("still playing");
  }
}

Player.prototype.updateScore = function() {
  this.total += this.tempTotal;
}

function changeTurns() {
  
}
http://localhost:5500
// const newGame = new Game;
// const player1 = new Player("bob");
// newGame.addPlayer(player1);








//ui logic
$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();
    const text = $("#input1").val();
    $("#display-text").text(text);
  });
});