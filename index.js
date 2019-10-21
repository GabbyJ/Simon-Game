var buttonColors = ["red", "blue", "green", "yellow"];
//stores the random sequence
var gamePattern = [];
//stores what the user clicks
var userClickedPattern = [];
//game isn't started until true
var started = false;
//first level
var level = 0;
//count
//var i = 0;

//what happens when 1st key is pressed
    //level 0 starts and first sequence shows
$("body").keydown(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//what happens when user clicks a button
    //sound plays and button lights up
$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    //$("#" + userChosenColor).fadeOut(200).fadeIn(200);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

//check for correct answer
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    }
    else{
        console.log("wrong")
        var audio_wrong = new Audio("sounds/wrong.mp3");
        audio_wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
    }
};

//what the sequences do
    //play sound and fade out/in of random colors
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(200).fadeIn(200);
    playSound(randomChosenColor);
    console.log(randomChosenColor);
    console.log(gamePattern);
   

};

//assigns sound to specific color
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

//clicked button lights up
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
};
    
//restart game
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

