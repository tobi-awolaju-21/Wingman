const quizData = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "3", correct: false, explanation: "2 + 2 is not equal to 3." },
      { text: "4", correct: true, explanation: "2 + 2 is equal to 4." },
      { text: "5", correct: false, explanation: "2 + 2 is not equal to 5." },
    ],
  },
  {
    question: "What is the capital of France?",
    answers: [
      {
        text: "London",
        correct: false,
        explanation: "The capital of France is not London.",
      },
      {
        text: "Berlin",
        correct: false,
        explanation: "The capital of France is not Berlin.",
      },
      {
        text: "Paris",
        correct: true,
        explanation: "The capital of France is Paris.",
      },
    ],
  },
];

const modal = document.getElementById("modal");
const modalText = document.getElementById("modal-text");
const closeBtn = document.getElementById("close");

const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const resultsContainer = document.getElementById("results");

function buildQuiz() {
  quizData.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `<p style="font-weight:bold; color:black;">${index + 1}: ${question.question}</p>`;

    question.answers.forEach((answer, answerIndex) => {
      const answerLabel = document.createElement("label");
      const answerInput = document.createElement("input");
      answerInput.type = "radio";
      answerInput.name = `question-${index}`;
      answerInput.value = answer.text;
      answerLabel.appendChild(answerInput);
      answerLabel.innerHTML += answer.text;
      questionDiv.appendChild(answerLabel);

      const explainButton = document.createElement("button");
      explainButton.textContent = "Hint";
      // Set a class for the button
      explainButton.classList.add("actionbt3");
      explainButton.addEventListener("click", () => {
        modal.style.display = "block";
        modalText.textContent = answer.explanation;
      });
      questionDiv.appendChild(explainButton);
    });

    quizContainer.appendChild(questionDiv);
  });
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll(".question");
  let score = 0;

  quizData.forEach((question, index) => {
    const answerContainer = answerContainers[index];
    const selector = `input[name=question-${index}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    question.answers.forEach((answer) => {
      if (userAnswer === answer.text && answer.correct) {
        score++;
      }
    });
  });

  resultsContainer.innerHTML = `<p>You scored ${score} out of ${quizData.length}</p>`;
}

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

buildQuiz();

submitButton.addEventListener("click", showResults);
