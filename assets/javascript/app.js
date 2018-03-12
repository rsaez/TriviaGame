// The object questions for hangman.
var trivia = [
  {//question[i].question
    question: "This river flows through the cradle of civilization",
    answer: "Tigris and Euphratis",
    dummy1: "The Nile",
    dummy2: "The Rhine, Maas, and Waal",
    dummy3: "The Amazon",
  },
  {
    question: "This mountain is the highest in the world",
    answer: "Everest",
    dummy1: "Kilimanjaro",
    dummy2: "Fuji",
    dummy3: "Reiner",
  },
  {
    question: "This Civilization built their capital at Macchu Picchu",
    answer: "Inca",
    dummy1: "Aztec",
    dummy2: "Mayans",
    dummy3: "Chipewa",
  },
  {
    question: "This land is closest to Antartica",
    answer: "Tierra del Fuego",
    dummy1: "New Zealand",
    dummy2: "Madagascar",
    dummy3: "Sri Lanka",
  },
  {
    question: "This region is mostly made of ice.",
    answer: "Greenland",
    dummy1: "ICeland",
    dummy2: "Newfoundland",
    dummy3: "Ireland",
  }
];

//  Variable that will hold our interval ID when we loead the page
var intervalId;
var sec = 30;
var questionSet = 0;
var i = 99;

// Declare game variables

// Timers Functions
function run() {
  clearInterval(intervalId);
  intervalId = setInterval(decrement, 1000 * sec);
}

//  The decrement function.
function decrement() {

  //  Decrease number by one.
  sec--;

  //  Show the number in the #show-number tag.
  $("#timer").html("<h2>" + sec + "</h2>");


  //  Once number hits zero...
  if (sec === 0) {

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
}

//Choose a question
function questionRandomizer() {
  i = Math.floor(Math.random() * trivia.length);
  console.log(i);
  questionSet = trivia[i];
}

function presentQuestions() {
  $("#question").html(questionSet.question);

  // present answer radials
  $("#answer").html(questionSet.answer);
  $("#dummy1").html(questionSet.dummy1);
  $("#dummy2").html(questionSet.dummy2);
  $("#dummy3").html(questionSet.dummy3);

}

//Start Timer
run();

//choose a question
questionRandomizer();
presentQuestions();
