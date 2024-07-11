const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStart = true;
let level = 0;

$(document).keydown(function () {
  if (gameStart) {
    console.log("game started");
    gameStart = false;
    nextSequence();
  }
});

let nextSequence = () => {
  let randomColor =
    buttonColours[Math.floor(Math.random() * buttonColours.length)];
  $("h1").text("Level " + ++level);
  gamePattern.push(randomColor);
  $(`#${randomColor}`).fadeOut(100).fadeIn(100);
  playSound(randomColor);
  console.log(gamePattern);
};

let playSound = (name) => {
  new Audio("./sounds/" + name + ".mp3").play();
};

let startOver = () => {
  $("h1").text("Game Over, Press Any Key to Restart");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  gamePattern = [];
  level = 0;
  userClickedPattern = [];
  gameStart = true;
};

$(".btn").click(function () {
  let chosenColour = $(this).attr("id");
  userClickedPattern.push(chosenColour);
  playSound(chosenColour);
  $(`#${chosenColour}`).addClass("pressed");
  setTimeout(() => {
    $(`#${chosenColour}`).removeClass("pressed");
  }, 100);
  if (
    userClickedPattern[userClickedPattern.length - 1] !==
    gamePattern[userClickedPattern.length - 1]
  ) {
    console.log("wrong");
    console.log("game over");
    startOver();
  } else {
    console.log("right");
    if (userClickedPattern.length === level) {
      console.log("level cleared");
      setTimeout(() => {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  }
});