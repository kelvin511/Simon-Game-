
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var started = false;
var gameLevel = 0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+gameLevel);
    nextSequence();
    started= true;
  }
});


$(".btn").click(function(){
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);
});


function startOver(){
   gameLevel=0;
   gamePattern= [];
   started = false;
}

function checkAnswer(currentLevel){
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
   } 
   else {
    console.log("Error");
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press any key to restart");

    startOver();
   }
}



function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3")
    audio.play();
    
}

function nextSequence(){

    userClickedPattern =[];
    gameLevel++;
    $("#level-title").text("level "+gameLevel);

    var randomNumber = Math.round(Math.random()*3);
    var randomChoosenColor  = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    $("#" +randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChoosenColor);
    animatePress(randomChoosenColor);

}

function animatePress(currentColor){
$("#"+currentColor).addClass("pressed");
setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
},100);
}




