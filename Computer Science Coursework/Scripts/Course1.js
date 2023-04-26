// get DOM elements
const questionContainer = document.getElementById("question-container");
const continueBtn = document.getElementById("continue-btn");

// create array of questions and answers
const questions = [
  {
    question: "What is the capital of France?",
    choices: [
      { answer: "London", isCorrect: false },
      { answer: "Berlin", isCorrect: false },
      { answer: "Paris", isCorrect: true },
    ],
  },
  {
    question: "What is the highest mountain in the world?",
    choices: [
      { answer: "Mount Kilimanjaro", isCorrect: false },
      { answer: "Mount Everest", isCorrect: true },
      { answer: "Mount Denali", isCorrect: false },
    ],
  },
  // add more questions and answers as needed
];

// create function to display question and answer choices
function displayQuestion(index) {
  const currentQuestion = questions[index];
  questionContainer.innerHTML = `
    <h2>Question ${index + 1}:</h2>
    <p>${currentQuestion.question}</p>
    <input type="radio" id="answer1" name="question${index + 1}" value="${currentQuestion.choices[0].isCorrect ? 'correct' : 'wrong'}">
    <label for="answer1">${currentQuestion.choices[0].answer}</label><br>
    <input type="radio" id="answer2" name="question${index + 1}" value="${currentQuestion.choices[1].isCorrect ? 'correct' : 'wrong'}">
    <label for="answer2">${currentQuestion.choices[1].answer}</label><br>
    <input type="radio" id="answer3" name="question${index + 1}" value="${currentQuestion.choices[2].isCorrect ? 'correct' : 'wrong'}">
    <label for="answer3">${currentQuestion.choices[2].answer}</label><br>
    <button id="continue-btn" enabled>Continue</button>
  `;
  
  // add event listener to answer choices
  const answerChoices = document.getElementsByName(`question${index + 1}`);
  answerChoices.forEach((choice) =>
    choice.addEventListener("click", () => checkAnswer(choice.value))
  );
}

// create function to check answer and display result
function checkAnswer(value) {
  if (value === "correct") {
    questionContainer.innerHTML += `<p style="color: green;">Correct</p>`;
	continueBtn.disabled = false;
    continueBtn.addEventListener("click", continueToNextQuestion);
  } else {
    questionContainer.innerHTML += `<p style="color: red;">Wrong</p>`;
    continueBtn.removeEventListener("click", continueToNextQuestion);
  }
}

// create function to continue to next question
function continueToNextQuestion() {
  const currentQuestionIndex = questions.findIndex(
    (question) => question.question === questionContainer.querySelector("p").textContent
  );
  if (currentQuestionIndex < questions.length - 1) {
    displayQuestion(currentQuestionIndex + 1);
    continueBtn.disabled = true;
  } else {
    questionContainer.innerHTML = "<h2>All questions completed!</h2>";
  }
}

// display first question
displayQuestion(0);