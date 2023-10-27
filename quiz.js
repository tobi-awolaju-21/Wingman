
var renamedData = {};


var quizData = [
  {
    question: "What is the difference between a concept and a fact?",
    answers: [
      {
        text: "A concept is an abstract idea, while a fact is a specific piece of information.",
        correct: true,
        explanation: "Concepts are general, while facts are specific.",
      },
      {
        text: "A concept is a concrete object, while a fact is an abstract idea.",
        correct: false,
        explanation: "Concepts are not concrete objects, but rather abstract ideas.",
      },
      {
        text: "A concept is a fact, while a fact is a concept.",
        correct: false,
        explanation: "Concepts and facts are two different things.",
      },
    ],
  },
  {
    question: "What are the key components of a good explanation?",
    answers: [
      {
        text: "Clarity, accuracy, and relevance",
        correct: true,
        explanation: "A good explanation is clear, accurate, and relevant to the audience.",
      },
      {
        text: "Complexity, difficulty, and ambiguity",
        correct: false,
        explanation: "A good explanation should not be complex, difficult, or ambiguous.",
      },
      {
        text: "Brevity, simplicity, and conciseness",
        correct: false,
        explanation: "A good explanation should not be brief, simple, or concise.",
      },
    ],
  },
];


// Remove the declaration of quizData
// const quizData = [...]; // Keep your JSON data separate

const modal = document.getElementById("modal");
const modalText = document.getElementById("modal-text");
const closeBtn = document.getElementById("close");

const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const resultsContainer = document.getElementById("results");

function buildQuiz(quizData) {
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




function build(){

const type = typeof newQuestion;
console.log(type);

function removeJsonTags(string) {
  if (string.startsWith("```json")) {
    string = string.substring(7);
  }
  if (string.endsWith("```")) {
    string = string.substring(0, string.length - 3);
  }
  return string;
}

const string = "`json{\"key\": \"value\"}`";
newQuestion = removeJsonTags(newQuestion);

console.log(newQuestion);
const array = JSON.parse(newQuestion);
console.log(array);
buildQuiz(array);
}


submitButton.addEventListener("click", showResults);
