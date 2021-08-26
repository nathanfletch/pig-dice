//utility functions
function getRandom() {
  return Math.ceil(Math.random() * 6);
}
//business logic

function Game() {
  this.players = {};
  this.turnCounter = 1;
  this.currentId = 0;
  // this.history = {}
}

Game.prototype.addPlayer = function (player) {
  this.currentId++;
  player.id = this.currentId;
  this.players[player.id] = player;
};

Game.prototype.changeTurn = function () {
  this.turnCounter++;
  return this.turnCounter;
};

Game.prototype.getCurrentPlayer = function () {
  if (this.turnCounter % 2 === 0) {
    return this.players[2];
  } else {
    return this.players[1];
  }
};

function Player(name) {
  this.name = name;
  this.total = 0;
  this.tempTotal = 0;
  this.computer = false;
}

Player.prototype.roll = function () {
  console.log("Called by the computer?", this.computer);
  //business logic - roll2
  //could add a button to opening and game over screens
  //click
  // const diceRoll1 = getRandom();
  // const diceRoll2 = getRandom();
  // if (diceRoll1 === 1 || diceRoll2 === 1) {

  //get number
  const diceRoll = getRandom();
  console.log(diceRoll);
  // if diceRoll is 1 then end turn
  if (diceRoll === 1) {
    this.tempTotal = 0;
    return diceRoll;
  } else {
    //add to temp
    this.tempTotal += diceRoll;
    //test if over 100
    if (this.total + this.tempTotal >= 100) {
      this.tempTotal = 0;
      return "Game over. " + this.name + "wins!";
    }
  }
  return diceRoll;
};

//at end of the turn
Player.prototype.updateScore = function () {
  this.total += this.tempTotal;
  this.tempTotal = 0;
};

Player.prototype.resetScores = function () {
  this.total = 0;
};

//ui logic
const game = new Game();
const player1 = new Player("player1");
const player2 = new Player("player2");
game.addPlayer(player1);
game.addPlayer(player2);

function displayTotalScores(player1, player2) {
  $("#score-1").text(player1.total);
  $("#score-2").text(player2.total);
}

function displayTurn(player, currentDiceRoll) {
  $("#turn-score-display").text(player.tempTotal);
  $("#current-player-display").text(player.name);
  $("#roll-display").text(currentDiceRoll);

  $("#wrappity-wrap").removeClass();
  $("#wrappity-wrap").addClass("player" + player.id);
}

function computerTurn() {
  $(".btn").hide();
  // console.log(Date.now());
  $("#roll")[0].click();
  console.log("rolling", Date.now());
  if (game.turnCounter % 2 === 0) {
    setTimeout(function () {
      //this simulates a user click and triggers the roll click handler - ui function
      console.log("time to roll again", Date.now());
      $("#roll")[0].click();
      if (game.turnCounter % 2 === 0) {
        setTimeout(function () {
          $("#hold")[0].click();
        }, 4000);
      }
    }, 4000);
  }
}

$(document).ready(function () {
  //   $("form").submit(function (event) {
  //     event.preventDefault();
  // const inputName = $("#input1").val();

  $("#player1-form").submit(function (event) {
    event.preventDefault();
    const player1Input = $("#player1-name-input").val();
    player1.name = player1Input;
    $("#player1-name-display").text(player1.name);
  });

  $("#player2-form").submit(function (event) {
    event.preventDefault();
    const player2Input = $("#player2-name-input").val();
    player2.name = player2Input;
    $("#player2-name-display").text(player2.name);
    player1.resetScores();
    player2.resetScores();
    displayTotalScores(player1, player2);
    player2.computer = false;
  });
  
  $("#computer-easy").click(function () {
    player2.name = "Computer";
    player2.computer = true;
    player1.resetScores();
    player2.resetScores();
    displayTotalScores(player1, player2);
    $("#player2-name-display").text(player2.name);
  });
  displayTotalScores(player1, player2);
  displayTurn(game.getCurrentPlayer());

  $("#roll").click(function () {
    let currentPlayer = game.getCurrentPlayer();

    // updates temp total, checks to see if game end, returns dice roll
    let currentDiceRoll = currentPlayer.roll();
    if (currentDiceRoll === 1) {
      console.log("computer rolled a one")
      displayTurn(game.getCurrentPlayer(), currentDiceRoll);
      game.changeTurn();
      $(".btn").hide();

      setTimeout(function () {
        //moved everything into the setTimeout callback
        if (!game.getCurrentPlayer().computer) {
          $(".btn").show();
        }
        displayTurn(game.getCurrentPlayer(), "");
        // pass to computer if true
        if (game.getCurrentPlayer().computer) {
          computerTurn();
        }
      }, 3000);
    } else if (currentDiceRoll > 1 && currentDiceRoll <= 6) {
      // check if dice roll is 1, change turn, call displayturn with other other player
      //display both player stats and dice roll
      displayTurn(currentPlayer, currentDiceRoll);
    } else {
      //reset everything
      //display game over, play again? button
      $("#winner-display").text(currentPlayer.name);
      $("#game-over-page").toggle();
      $("#game-page").toggle();
      player1.resetScores();
      player2.resetScores();
    }
  });

  $("#hold").click(function () {
    let currentPlayer = game.getCurrentPlayer();

    //update total
    currentPlayer.updateScore();
    //increment
    game.changeTurn();
    if (!game.getCurrentPlayer().computer) {
      $(".btn").show();
    }
    //update display
    displayTotalScores(player1, player2);
    displayTurn(game.getCurrentPlayer(), "");

    //pass to the computer
    if (game.getCurrentPlayer().computer) {
      computerTurn();
    }
  });

  $("#play-again").click(function () {
    displayTotalScores(player1, player2);
    game.changeTurn();
    displayTurn(game.getCurrentPlayer(), "");
    $("#game-page").toggle();
    $("#game-over-page").toggle();
  });
});
