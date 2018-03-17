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
var questionTime = 5;
var alertTime = 3;
var userCorrect = 0;
var userIncorrect = 0;
var reset = false;

// functions calls
for (var i = 0; i < trivia.length; i++) {

    console.log("Question #" + i);

    // loads question to the program
    loadQuestion(i);

    // sets random values to answerOrder array
    randomMachine();

    // Print all data to user
    presentQuestions();

    // Start question timer
    timerONE();
    console.log("Step 2.0 after timer ONE");

    // runs logic to get answer from user
    getAnswer();

    // Start alert timer
    timerTWO();

    // Restart game
    while (reset) {
        console.log("Step 3.0 restart");
        restart();
    }
    console.log("End of Loop");
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
    console.log("Step 1.0: timerONE.beginning");

    clearInterval(intervalId);
    console.log("Cleared interval Id: ");
    console.log(intervalId);
    // intervalId = setInterval(questionDecrement, 1000);
    intervalId = setTimeout(questionDecrement, 1000);
    console.log("Step 1.9: timerONE.end");
}

//  The decrement function.
function questionDecrement() {
    console.log("Step 1.2: questionDecrement.begining")
    console.log("Interval Id value: ")
    console.log(intervalId);
    console.log("questionTime: " + questionTime);
    questionTime--;
    // setTimeout(questionDecrement, 1000);

    //  Show the number in the #show-number tag.
    $("#countdown-clock").html("<h2>" + questionTime + "</h2>");

    // console.log("questionTime: " + questionTime);

    //  Once number hits zero...
    if (questionTime === 0) {
        console.log("questionTime is 0");

        //  ...run the stop function.
        stop();
        console.log("Step 1.86 getAnswer.end");
    }
}

//  The stop function
function stop() {
    //  Clears our intervalId
    //  We just pass the name of the interval
    //  to the clearInterval function.
    console.log("Step 1.3 questionTimer Stop");
    clearInterval(intervalId);
    questionTime = 5;
    // getAnswer();
    console.log("Step 1.85 getAnswer.end");
}

// gets ansswer from radio and sees if it's right
function getAnswer() {
    console.log("Step 1.4 getAnswer.beginning");
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
    } else if (questionArr[userAnswer] === cpuAnswer) {
        console.log("correct");
        $("#alert").html(
            '<div class="alert alert-success alert-dismissible" role="alert"><strong>You are correct!</strong></div>'
        );
        $("#alert").slideShow();
    } else {
        console.log("wrong");
        console.log("cpuAnswer: " + cpuAnswer);
        $("#alert").html(
            '<div class="alert alert-danger alert-dismissible" role="alert"><strong>You are Wrong. </strong> The answer is ' +
                cpuAnswer +
                '</div>');
        $("#alert").slideDown();
    }

    // timerTWO();
    console.log("Step 1.8 getAnswer.end");
}



// Alert timerTWO
function timerTWO() {
    console.log("Step 1.5 timerTwo.begining");
    clearInterval(intervalId);
    intervalId = setInterval(alertDecrement, 1000);
    console.log("Step 1.7 timerTwo.end");
}

// decrements the timer to transition to a new game
function alertDecrement() {
    console.log("Step 1.6 alertDecrement.begining");

    alertTime--;
    //   setTimeout(alertDecrement, 1000);

    // console.log("alertTime: " + alertTime);
    $("#countdown-clock").html("<h2>Alert Timer: " + questionTime + "</h2>");

    // Once number hits zero...
    if (alertTime === 0) {
        console.log("Step 1.65 timerTwo hits 0");

        //enables restart
        reset = true;

        //  ...run the stop function.
        alertTime = 5;
        clearInterval(intervalId);
    }
}

function restart() {
    //reinitialized all variables
    cpuQuestion = "";
    cpuAnswer = "";
    questionArr = [];
    // questionTime = 5;
    // alertTime = 3;
    userCorrect = 0;
    userIncorrect = 0;
    reset = false;

    $("#alert").hide();
    console.log("Step 3.1 inside restart");
}
