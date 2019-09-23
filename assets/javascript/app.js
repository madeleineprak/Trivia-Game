// Sets up variables for game.
var numCorrect = 0;
var numWrong = 0;
var numNotAnswered = 0;
var vinesArray = [];
var currentQuestionIndex = 0;
var time = 0;
var intervalId = 0;
// Populates the vine array with chosen vines below.
function addVine(vineSentence, vineAnswer, vinePossibleAnswers, vinePhoto, vineGif) {
    var vineObject = { sentence: "", answer: "", possibleAnswers: [], photo: "", gif: ""};
    vineObject.sentence = vineSentence;
    vineObject.answer = vineAnswer;
    vineObject.possibleAnswers = vinePossibleAnswers;
    vineObject.photo = vinePhoto;
    vineObject.gif = vineGif;
    vinesArray.push(vineObject);
}
// Sets a timer for each question.
function setTimer() {
    time = 10;
    $("#timer").html("<h6>Time: " + time + "</h6>");   
    intervalId = setInterval(function () {    
        time -= 1;
        if (time >= 0) {
            $("#timer").html("<h6>Time: " + time + "</h6>");
        }
        if (time === -1) { // makes sure it counts 0
            clearInterval(intervalId);
            numNotAnswered++;
            showQuestionResult("Times up!");
        }
    }, 1000);
};
// Sets up with game with a timer and the current question.
function setGame() {
    $("#instructions").hide();
    $("#start").hide();
    $("#quiz").show();
    $("#result").html("");
    setTimer();
    displayQuestion(currentQuestionIndex);
}
// Retrieves from the vine array and sets up the current question.
function displayQuestion(currentQuestionIndex) {
    $("#answers").html("");
    $("#question").html("<h3>" + vinesArray[currentQuestionIndex].sentence + "</h3>");
    $("#photo").attr("src", vinesArray[currentQuestionIndex].photo).height(300).width(300).css("object-fit", "cover");
    // Creates the possible answer buttons
    for (i = 0; i < vinesArray[currentQuestionIndex].possibleAnswers.length; i++) {
        //Creates a button for each answer
        var answerButton = $("<button>").text(vinesArray[currentQuestionIndex].possibleAnswers[i]);
        answerButton.addClass("answer-button"); 
        answerButton.attr("data-number", i + 1);
        // Adds the buttons
        $("#answers").append(answerButton);
    }
}
// Gets called after user chooses answer for each question.
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
// Gets called at the end when all questions have been answered.
function showQuizResult(){
    var totalVines = vinesArray.length;
    $("#quiz").hide();
    // $("#footer").text("");
    $("#start").show();
    $("#result").html("<h4>Nice! You got " + numCorrect + " correct and " + numWrong + " wrong out of " + totalVines +" vines.</h4>");
}
// Registers which answer the user chooses and outputs if it is right or wrong accordingly.
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
// Adds all the vines.
addVine("\"______.\"", "O.K.", ["hello", "O.K.", "oi", "hey"], "assets/images/ok.jpg", "assets/images/ok.gif");
addVine("\"I smell like ______.\"", "beef", ["beef", "potatos", "flowers", "berries"], "assets/images/beef.jpg", "assets/images/beef.gif");
addVine("\"______.\"", "wow", ["cool", "whoa", "rad", "wow"], "assets/images/wow.jpg", "assets/images/wow.gif");
addVine("\"Look at all those ______!\"", "chickens", ["ducks", "geese", "birds", "chickens"], "assets/images/chickens.jpg", "assets/images/chickens.gif");
addVine("\"You almost made me drop my ______!\"", "croissant", ["croissant", "toast", "plate", "bread"], "assets/images/croissant.jpg", "assets/images/croissant.gif");
addVine("\"______ James.\"", "Lebron", ["Kevin", "Rick", "Lennie", "Lebron"], "assets/images/lebron.jpg", "assets/images/lebron.gif");
addVine("\"Oh my god. I love ______. ______'s my life.\"", "Chipotle", ["Chick-Fil-A", "Taco Bell", "Pizza Hut", "Chipotle"], "assets/images/chipotle.jpg", "assets/images/chipotle.gif");
addVine("Who is this boy?", "Gavin", ["Liam","Logan","Noah","Gavin"], "assets/images/gavin.jpg", "assets/images/gavin.gif");
addVine("______!!!", "Lauren", ["Carole", "Kate", "Lauren", "Stacy"], "assets/images/mcflurry.jpg", "assets/images/lauren.gif");
addVine("\"Who was the hottest __ driver you've ever had?\"", "Uber", ["Uber", "Lyft", "bus","taxi"], "assets/images/uber.jpg", "assets/images/uber.gif");
addVine("\"______!\"", "Hzzzzaaaah", ["Ahhhhhh","Skrrrrrrt","Eeeeeeek","Hzzzzaaaah"], "assets/images/rat.jpg", "assets/images/rat.gif");