// var TriviaGame = {
//     vines = {},
//     numCorrect: 0,
//     numWrong: 0,
//     questionIndex: 0,
//     addVine: function(vineSentence, vineAnswer, vinePhoto) {
//         var vine = {sentence: "", answer: "", photo: "", currentQuestion: false};
//         vine.sentence = vineSentence;
//         vine.answer = vineAnswer;
//         vine.photo = vinePhoto;
//         this.vines.push(vine);
//     },
//     askCurrentQuestion: function() {
//         //Ask question
//         //Turn next object question to current and current to false
//     },
//     startGame: function() {
//         for(i=0;i<Object.keys(this.vines).length; i++) {
//             //Loop through all questions
//             this.askCurrentQuestion(i);
//         }
//     }
// }

// var win = false;
// var lose = false;
var numCorrect = 0;
var numWrong = 0;
var vinesArray = [];
var currentQuestionIndex = 0;
var timesUp = false; //Do I even need this?

function setTimer() {
    var time = 10;
    $("#timer").html(time);
    var intervalId = setInterval(function() {
        time -= 1;
        if (time >= 0) {
            $("#timer").html(time);
        }
        if (time === -1) { // -1 to make sure it counts 0
            timesUp = true;
            //Find a different way to display this
            clearInterval(intervalId);
            alert("Time's up! You got " + numCorrect + " correct and " + numWrong + " wrong"); //This if for the end
            
        }
    }, 1000);
};

function addVine(vineSentence, vineAnswer, vinePossibleAnswers, vinePhoto) {
    var vineObject = {sentence: "", answer: "", possibleAnswers: [], photo: "", answered: false};
    vineObject.sentence = vineSentence;
    vineObject.answer = vineAnswer;
    vineObject.photo = vinePhoto;
    vineObject.possibleAnswers = vinePossibleAnswers;
    vinesArray.push(vineObject);
}
// function askCurrentQuestion() {

// }

function playGame() {
    addVine("Woman: 'Hi' Him: '______'", "ok", ["hello", "ok", "how are you", "hey"], "assets/images/ok.gif");
    addVine("I smell like ______", "beef", ["beef", "potatos", "flowers", "berries"], "insert photo");
    addVine("______", "wow", ["cool", "whoa", "rad", "wow"], "insert photo");
    addVine("Look at all those ______", "chickens", ["ducks", "geese", "birds", "chickens"], "insert photo");
    setTimer();
    // for(i=0; i<vinesArray.length; i++) {
    //     $("#currentQuestion").html(vinesArray[i].sentence);
    // }
    $("#question").html(vinesArray[0].sentence);
    $("#photo").attr("src", vinesArray[0].photo);
    // Creates the possible answer buttons
    for(i=0; i<vinesArray[0].possibleAnswers.length; i++) {
        //Creates a button for each answer
        var answerButton = $("<button>").text(vinesArray[0].possibleAnswers[i]);
        // Adds indentifier to button
        answerButton.addClass("button" + (i + 1)); 
        // Adds the buttons to the answers div for the user to select from
        $("#answers").append(answerButton);
    }

}

// TriviaGame.addVine() x10 to populate
// TriviaGame.startGame() when start button pressed