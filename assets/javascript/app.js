// The object questions for Trivia Game.
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

//  game variables
var cpuQuestion = "";
var cpuAnswer = "";
var questionArr = [];
var intervalId;
var questionTime = 15;
var alertTime = 3;
var userCorrect = 0;
var userIncorrect = 0;
var reset = false;
var questionIndex = 0

// loads question to the program
loadQuestion(questionIndex);

// sets random values to answerOrder array
randomMachine();

// Print all data to user
presentQuestions();

// Start question timer
timerONE();

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
    var ranNums = shuffle([0, 1, 2, 3]);
    var temp = [];

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

// Shuffle values in ranNums
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

// Question timerONE
function timerONE() {
    clearInterval(intervalId);
    intervalId = setInterval(questionDecrement, 1000);
}

//  The decrement function.
function questionDecrement() {
    // debugger;
    questionTime--;


    //  Show the number in the #show-number tag.
    $("#countdown-clock").html("<h2>" + questionTime + "</h2>");

    // console.log("questionTime: " + questionTime);

    //  Once number hits zero...
    if (questionTime === 0) {
        // console.log("questionTime is 0");

        //  ...run the stop function.
        stop();
    }
}

//  The stop function
function stop() {
    //  Clears our intervalId
    //  We just pass the name of the interval
    //  to the clearInterval function.
    clearInterval(intervalId);
    getAnswer();
}

// gets ansswer from radio and sees if it's right
function getAnswer() {
    userAnswer = $("input[name='trivia-answers']:checked").val();


    if (userAnswer == null) {
        console.log("User did not choose an answer");
        console.log("cpuAnswer: " + cpuAnswer);
        $("#alert").html(
            '<div class="alert alert-danger alert-dismissible" role="alert"><strong>You failed to select an answer!</strong> The answer is ' +
                cpuAnswer +
                "</div>"
        );
        $("#alert").slideDown();
        userIncorrect++;
    } else if (questionArr[userAnswer] === cpuAnswer) {
        console.log("correct");
        $("#alert").html(
            '<div class="alert alert-success alert-dismissible" role="alert"><strong>You are correct!</strong></div>'
        );
        $("#alert").slideDown();
        userCorrect++;
    } else {
        console.log("wrong");
        console.log("cpuAnswer: " + cpuAnswer);
        $("#alert").html(
            '<div class="alert alert-danger alert-dismissible" role="alert"><strong>You are Wrong. </strong> The answer is ' +
                cpuAnswer +
                '</div>');
        $("#alert").slideDown();
        userIncorrect++;
    }

    timerTWO();
    // console.log("after transtion");
}


// Alert timerTWO
function timerTWO() {
    clearInterval(intervalId);
    intervalId = setInterval(alertDecrement, 1000);
}

// decrements the timer to transition to a new game
function alertDecrement() {
    //   console.log("Transition Timer is Over");

    alertTime--;
    //   setTimeout(alertDecrement, 1000);

    // console.log("alertTime: " + alertTime);

    // Once number hits zero...
    if (alertTime === 0) {
        console.log("Transition Timer is Over");

        //  ...run the stop function.
        clearInterval(intervalId);

        if (questionIndex == 4) {
            // Load score board;
            scoreBoard();
        }

        nextQuestion();
    }
}

function nextQuestion() {
    //reinitialized all variables
    questionTime = 15;
    questionArr = [];
    userAnswer = 0;
    cpuQuestion = "";
    cpuAnswer = "";
    alertTime = 3;
    reset = false;
    questionIndex++;

    if (questionIndex <= 4) {
        // clear the radio selection
        $("#inlineRadio1").prop('checked', false);
        $("#inlineRadio2").prop('checked', false);
        $("#inlineRadio3").prop('checked', false);
        $("#inlineRadio4").prop('checked', false);

        $("#alert").hide();
        console.log("restart");

        // loads question to the program
        loadQuestion(questionIndex);

        // sets random values to answerOrder array
        randomMachine();

        // Print all data to user
        presentQuestions();

        // Start question timer
        timerONE();
    }



}

function scoreBoard() {

    $("#alert").hide();
    $("#alert").html(
        '<div class="alert alert-info alert-dismissible" role="alert"><strong>Game Over, your score is as follows: </strong><br><strong>Correct Answers: ' + userCorrect +
            '</strong><br><strong>Incorrect Answers: ' + userIncorrect + '</strong></div>');

    $("#alert").show();
}
