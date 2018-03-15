// The object questions for hangman.
var trivia = [
  {
    //question[i].question
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
var intervalId;
var sec = 5;
var questionArr = [];
var userAnswer = 0;
var answerOrder = [];
var cpuQuestion = "";
var cpuAnswer = "";
var transitionTimer = 3;
var reset = false;
var currentQuestion = 0;

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

// Loads a question for the advanced hw
function loadQuestion() {

  cpuQuestion = trivia[currentQuestion].question;
  cpuAnswer = trivia[currentQuestion].answer;

  //transfer trivia object to questionArr
  questionArr[0] = trivia[currentQuestion].answer;
  questionArr[1] = trivia[currentQuestion].dummy1;
  questionArr[2] = trivia[currentQuestion].dummy2;
  questionArr[3] = trivia[currentQuestion].dummy3;
  currentQuestion++;
}

// Randomly sets the orders of the answer positions
// Sets values from 0 to 3 to answerOrder array
function randomMachine() {
  // console.log(questionArr);

  var ranNums = shuffle([0, 1, 2, 3]);
  answerOrder[0] = ranNums.next().value;
  answerOrder[1] = ranNums.next().value;
  answerOrder[2] = ranNums.next().value;
  answerOrder[3] = ranNums.next().value;

  var temp = [];
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

// Timers Functions
function timer(countdown) {
  clearInterval(intervalId);
  intervalId = setInterval(countdown, 1000);
}

//  The decrement function.
function questionTimer() {

  sec--;
  // setTimeout(questionTimer, 1000);

  //  Show the number in the #show-number tag.
  $("#timer").html("<h2>" + sec + "</h2>");


  // console.log("sec: " + sec);

  //  Once number hits zero...
  if (sec === 0) {
    // console.log("sec is 0");

    //  ...run the stop function.
    stop();
  }
}

// decrements the timer to transition to a new game
function transitionDec() {

  //   console.log("Transition Timer is Over");

  transitionTimer--;
  //   setTimeout(transitionDec, 1000);


  // console.log("transitionTimer: " + transitionTimer);

  // Once number hits zero...
  if (transitionTimer === 0) {
    console.log("Transition Timer is Over");

    //enables restart
    reset = true;

    //  ...run the stop function.
    clearInterval(intervalId);
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

  timer(transitionDec);
  // console.log("after transtion");
}

function restart() {
  //reinitialized all variables
  sec = 5;
  questionArr = [];
  userAnswer = 0;
  answerOrder = [];
  cpuQuestion = "";
  cpuAnswer = "";
  transitionTimer = 5;
  reset = false;
  // currentQuestion = 0;
  $("#alert-noanswer").hide();
  $("#alert-correct").hide();
  $("#alert-wrong").hide();
  console.log("restart");
}

  //choose a question
  // questionRandomizer();

  console.log("Start Code");
  // do {

while(currentQuestion < 5) {
    console.log("Inside while");
  // }
  // loads question to the program
  loadQuestion();

  // sets random values to answerOrder array
  randomMachine();

  // Print all data to user
  presentQuestions();

  // Start Timer
  timer(questionTimer);

  // runs logic to get answer from user
  // getAnswer();

  // Restart game
  while (reset) {
    console.log("restart function");
    restart();
  }

}
