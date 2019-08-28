// Sets the answers, questions and the correct answer as an array of objects
let questions = [
  {
    question: "Who won in the Best New Artist category in the 2008 EMA?",
    answers: ["Miley Cyrus", "Katy Perry", "Tokio Hotel", "Metro Station"],
    correctId: 2,
    pictureSource: "Images/tokio_hotel.gif"
  },
  {
    question: "Which music artist is the highest earning artist?",
    answers: ["Madonna", "Metallica", "Rolling Stones", "Taylor Swift"],
    correctId: 3,
    pictureSource: "Images/taylor-swift.gif"
  },
  {
    question:
      "Which music artist is the first independent artist to win a Grammy?",
    answers: [
      "XXXTentacion",
      "Chance the Rapper",
      "Macklemore",
      "Earl Sweatshirt"
    ],
    correctId: 1,
    pictureSource: "Images/chance-grammy.gif"
  },
  {
    question: "How did ABBA get popular?",
    answers: [
      "Eurovision",
      "A Swedish Film",
      "Their Debut Record",
      "Their Dog"
    ],
    correctId: 0,
    pictureSource: "Images/abba.gif"
  },
  {
    question: "How many grammys does Madonna have?",
    answers: ["3", "7", "1000", "1"],
    correctId: 1,
    pictureSource: "Images/madonna.gif"
  },
  {
    question: "Why was autotune first created?",
    answers: [
      "To search for oil deposits underground",
      "To fix a singer's tune ",
      "To disguise a singer's voice",
      "None of the above"
    ],
    correctId: 0,
    pictureSource: "Images/oil.gif"
  }
];
// Sets variables
var timer;
let correctAnswer = 0;
let incorrectAnswer = 0;
let skippedQuestion = 0;
let questionId = -1;
let failPicSource = "Images/dr_phil_l.png";

// Starts the game with the 1st question and the next after player chooses answer or timer runs out
function nextQuestion() {
  questionId += 1;
  if (questionId < questions.length) {
    populateQuestion(questionId);
  } else {
    endQuiz();
  }
}
// Puts the questions on the page.
function populateQuestion(id) {
  $(".container").toggle();
  let currentQuestion = questions[id];
  $("#question").text(currentQuestion.question);
  for (let index = 0; index < currentQuestion.answers.length; index++) {
    const answer = currentQuestion.answers[index];
    $("#answer" + index).text(answer);
  }
  // Sets the timer to count from 15 on the page on every question.
  var timerCount = 16;
  timer = setInterval(function() {
    timerCount -= 1;
    $("#timer").text(timerCount + " seconds left");
    if (timerCount === 0) {
      showCorrectAnswer(-1);
    }
  }, 1000);
}
// Toggles the divs respectively depending on the answer chosen.
function showCorrectAnswer(choiceId) {
  $(".container").toggle();
  $(".show-answer").toggle();
  clearInterval(timer);
  const currentQuestion = questions[questionId];
  let text = "The correct answer is: ";
  text += currentQuestion.answers[currentQuestion.correctId];
  if (choiceId == currentQuestion.correctId) {
    text += ", you are right!";
    correctAnswer++;
    // Allows the correct picture to be shown when the player chooses the rigth answer
    let pic = $("#successpicture");
    pic.attr("src", currentQuestion.pictureSource);
    pic.show();
  } else {
    text += ", you suck! Take the L.";
    let failPic = $("#failpicture");
    failPic.attr("src", failPicSource);
    failPic.show();
    if (choiceId == -1) {
      skippedQuestion++;
    } else {
      incorrectAnswer++;
    }
  }
  // Lets 3 seconds pass before toggling the show answer div, automatically going to the next question.
  $("#realanswer").text(text);
  setTimeout(function() {
    $("#successpicture").hide();
    $(".show-answer").toggle();
    nextQuestion();
  }, 3000);
}
// When the skip button is clicked, the right answer is shown but the wrong answer counter is incremented.
function buttonClick(element) {
  const id = element.id;

  if (id !== "skip") {
    const index = parseInt(id.replace("answer", ""));
    showCorrectAnswer(index);
  } else {
    showCorrectAnswer(-1);
  }
}
// Calls the endQuiz function
function endQuiz() {
  $(".results").show();
  $("#correct").text("Correct answers: " + correctAnswer);
  $("#wrong").text("Incorrect answers: " + incorrectAnswer);
  $("#skipped").text("Skipped questions: " + skippedQuestion);
}

// Allows the game to start when the Start button is pressed
function startQuiz() {
  correctAnswer = 0;
  incorrectAnswer = 0;
  skippedQuestion = 0;
  questionId = -1;
  $(".start").hide();
  $(".results").hide();
  nextQuestion();
}
