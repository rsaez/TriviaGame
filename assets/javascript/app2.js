// The object questions for the Trivia Game.
var trivia = [
    {
        //trivia[i].question
        question: "This river flows through the cradle of civilization",
        answer: "Tigris and Euphratis",
        dummy1: "The Nile",
        dummy2: "The Rhine, Maas, and Waal",
        dummy3: "The Amazon"
    },
    {
        question: "This mountain is the highest in the world",
        answer: "Everest",
        dummy1: "Kilimanjaro",
        dummy2: "Fuji",
        dummy3: "Rainier"
    },
    {
        question: "This Civilization built their capital at Macchu Picchu",
        answer: "Inca",
        dummy1: "Aztec",
        dummy2: "Mayans",
        dummy3: "Chipewa"
    },
    {
        question: "This land is closest to Antartica",
        answer: "Tierra del Fuego",
        dummy1: "New Zealand",
        dummy2: "Madagascar",
        dummy3: "Sri Lanka"
    },
    {
        question: "This region is mostly made of ice.",
        answer: "Greenland",
        dummy1: "Iceland",
        dummy2: "Newfoundland",
        dummy3: "Ireland"
    }
];

//  Variable that will hold our interval ID when we loead the page
var cpuQuestion = "";
var cpuAnswer = "";
var questionArr = [];
var intervalId;
var sec = 5;
var alertTimer = 3;
var userCorrect = 0;
var userIncorrect = 0;

// functions calls
for (var i = 0; i < trivia.length; i++) {
    console.log("Question #" + i);
    // loads question to the program
    loadQuestion(i);

    // sets random values to answerOrder array
    randomMachine();

    // Print all data to user
    presentQuestions();

    // Start Timer answer countdown
    timerOne();
    console.log("after question timer");

    // runs logic to get answer from user
    getAnswer();

    //Start timer for alert
    timer(transitionDec);

    //reset all variables
    restart();
}

// Loads a question for the advanced hw
function loadQuestion(currentQuestion) {
    cpuQuestion = trivia[currentQuestion].question;
    cpuAnswer = trivia[currentQuestion].answer;

    //transfer trivia object to questionArr
    questionArr[0] = trivia[currentQuestion].answer;
    questionArr[1] = trivia[currentQuestion].dummy1;
    questionArr[2] = trivia[currentQuestion].dummy2;
    questionArr[3] = trivia[currentQuestion].dummy3;
}

// Randomly sets the orders of the answer positions
// Sets values from 0 to 3 to answerOrder array
function randomMachine() {
    // console.log(questionArr);
    var answerOrder = [];
    var temp = [];

    var ranNums = shuffle([0, 1, 2, 3]);
    answerOrder[0] = ranNums.next().value;
    answerOrder[1] = ranNums.next().value;
    answerOrder[2] = ranNums.next().value;
    answerOrder[3] = ranNums.next().value;

    // This sorts questionArr with new random order
    for (i = 0; i < questionArr.length; i++) {
        temp[i] = questionArr[answerOrder[i]];
    }
    questionArr = temp;
    // console.log(answerOrder);
    // console.log(questionArr);
}

// Shuffle values in ranNums, not used for advance assingment
function* shuffle(array) {
    var i = array.length;

    while (i--) {
        yield array.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    }
}

// Prints all data to the screen
// questionArr contains selected question object
function presentQuestions() {
    $("#question").html(cpuQuestion);

    // present answer radials
    $("#answer").html(questionArr[0]);
    $("#dummy1").html(questionArr[1]);
    $("#dummy2").html(questionArr[2]);
    $("#dummy3").html(questionArr[3]);
}

//  The stop function
function stop() {
    //  Clears our intervalId
    //  We just pass the name of the interval
    //  to the clearInterval function.
    clearInterval(intervalId);
}

// gets ansswer from radio and sees if it's right
function getAnswer() {
    var userAnswer = $("input[name='trivia-answers']:checked").val();

    // Check CPU to user answer
    // computer selected answer is in questionArr[0]
    // console.log("CPU selected answer : " + cpuAnswer);
    // console.log("index chosen by user: " + userAnswer + " question at user chosen index: " + questionArr[userAnswer]);

    if (userAnswer == null) {
        console.log("User did not choose an answer");
        $("#answer-fail").html(cpuAnswer);
        $("#alert-noanswer").slideDown();
    } else if (questionArr[userAnswer] === cpuAnswer) {
        console.log("correct");
        $("#alert-correct").slideDown();
    } else {
        console.log("wrong");
        $("#answer-fail").html(cpuAnswer);
        $("#alert-incorrect").slideDown();
    }
}

// decrements the timer to transition to a new question
// function questionTimer() {
//     console.log("inside question timer");
//     sec--;
//     setTimeout(function() {}, 1000);
//
//     // show countdown on the console
//     // console.log("alertTimer: " + alertTimer);
//
//     // Once number hits zero...
//     if (sec === 0) {
//         console.log("Transition Timer is Over");
//
//         //  ...run the stop function.
//         stop();
//     }
// }

// decrements the timer to transition to a new question
function transitionDec() {
    console.log("inside alert timer");
    alertTimer--;
    setTimeout(function() {}, 1000);

    // show countdown on the console
    // console.log("alertTimer: " + alertTimer);

    // Once number hits zero...
    if (alertTimer === 0) {
        console.log("Transition Timer is Over");

        //  ...run the stop function.
        stop();
    }
}

function restart() {
    //reinitialized all variables
    var cpuQuestion = "";
    var cpuAnswer = "";
    var questionArr = [];
    var intervalId;
    var sec = 5;
    var alertTimer = 3;

    $("#alert-noanswer").hide();
    $("#alert-correct").hide();
    $("#alert-wrong").hide();
    console.log("restart");
}

// Timers Functions
function timer(countdown) {
    console.log("inside timer");
    clearInterval(intervalId);
    intervalId = setInterval(countdown, 1000);
}

function timerOne() {
    questionIntervalId = setInterval(questionTimer, 1000);
}

function questionTimer() {
    sec--;
    $("#countdown-clock").html(sec);

    if(sec == 0){
        sec = 30;
        clearInterval(questionIntervalId);
    }
}

////////////////////////////////////////

// Randomly chooses a question from the question array
// used for easy hw, not used for advanced
function questionRandomizer() {
    var i = getRndInteger(0, trivia.length);
    // console.log("trivia.length: " + trivia.length);
    // console.log("i: " + i);

    cpuQuestion = trivia[i].question;
    cpuAnswer = trivia[i].answer;

    //transfer trivia object to questionArr
    questionArr[0] = trivia[i].answer;
    questionArr[1] = trivia[i].dummy1;
    questionArr[2] = trivia[i].dummy2;
    questionArr[3] = trivia[i].dummy3;

    //next function to run presentQuestions()
}

// Get random number, this does nothing I just liked the function, I eventually did use it to choose the question randomly.
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
