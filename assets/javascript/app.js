var numCorrect = 0;
var numWrong = 0;
var numNotAnswered = 0;
var vinesArray = [];
var currentQuestionIndex = 0;
var time = 0;
var intervalId = 0;
function addVine(vineSentence, vineAnswer, vinePossibleAnswers, vinePhoto, vineGif) {
    var vineObject = { sentence: "", answer: "", possibleAnswers: [], photo: "", gif: ""};
    vineObject.sentence = vineSentence;
    vineObject.answer = vineAnswer;
    vineObject.possibleAnswers = vinePossibleAnswers;
    vineObject.photo = vinePhoto;
    vineObject.gif = vineGif;
    vinesArray.push(vineObject);
}
function setTimer() {
    time = 10;
    $("#timer").html("<h6>Time: " + time + "</h6>");   
    intervalId = setInterval(function () {    
        time -= 1;
        if (time >= 0) {
            $("#timer").html("<h6>Time: " + time + "</h6>");
        }
        if (time === -1) { // -1 to make sure it counts 0
            clearInterval(intervalId);
            numNotAnswered++;
            showQuestionResult("Times up!");
        }
    }, 1000);
};
function setGame() {
    $("#instructions").hide();
    $("#start").hide();
    // $("#footer").text("Madeleine Prak 2019.");
    $("#quiz").show();
    $("#result").html("");
    setTimer();
    displayQuestion(currentQuestionIndex);
}
function displayQuestion(currentQuestionIndex) {
    $("#answers").html("");
    $("#question").html("<h3>" + vinesArray[currentQuestionIndex].sentence + "</h3>");
    $("#photo").attr("src", vinesArray[currentQuestionIndex].photo).height(300).width(300).css("object-fit", "cover");
    // Creates the possible answer buttons
    for (i = 0; i < vinesArray[currentQuestionIndex].possibleAnswers.length; i++) {
        //Creates a button for each answer
        var answerButton = $("<button>").text(vinesArray[currentQuestionIndex].possibleAnswers[i]);
        // Adds indentifier to button
        answerButton.addClass("answer-button"); 
        answerButton.attr("data-number", i + 1);
        // Adds the buttons to the answers div for the user to select from
        $("#answers").append(answerButton);
    }
}
function showQuestionResult(outcome) {
    $("#timer").html("");
    $("#photo").attr("src", vinesArray[currentQuestionIndex].gif);
    $("#question").html("");
    $("#answers").html("");
    $("#result").html("<h4>" + outcome + " The correct answer is \"" + vinesArray[currentQuestionIndex].answer + "\".</h4>");
    currentQuestionIndex++;
    if (currentQuestionIndex < vinesArray.length) {
        setTimeout(setGame, 5000);
    } else {
        currentQuestionIndex = 0;
        setTimeout(showQuizResult, 5000);
    }
}
function showQuizResult(){
    $("#quiz").hide();
    // $("#footer").text("");
    $("#start").show();
    $("#result").html("<h4>Nice! You got " + numCorrect + " correct, " + numWrong + " wrong and " + numNotAnswered + " not answered.</h4>");
}
$(document).on("click", ".answer-button", function () {
    var playerAnswer = $(this).text();
    var correctAnswer = vinesArray[currentQuestionIndex].answer;
    clearInterval(intervalId);
    if (correctAnswer === playerAnswer) {
        numCorrect++;
        showQuestionResult("You got it right!");
    } else {
        numWrong++;
        showQuestionResult("Wrong!");
    }
});
addVine("\"______.\"", "ok", ["hello", "ok", "how are you", "hey"], "assets/images/ok.jpg", "assets/images/ok.gif");
addVine("\"I smell like ______.\"", "beef", ["beef", "potatos", "flowers", "berries"], "assets/images/beef.jpg", "assets/images/beef.gif");
addVine("\"______.\"", "wow", ["cool", "whoa", "rad", "wow"], "assets/images/wow.jpg", "assets/images/wow.gif");
addVine("\"Look at all those ______!\"", "chickens", ["ducks", "geese", "birds", "chickens"], "assets/images/chickens.jpg", "assets/images/chickens.gif");