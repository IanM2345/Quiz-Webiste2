const questions = [
  {
    question: "Who are the current Premier League champions?",
    options: ["Liverpool", "Manchester City", "Chelsea", "Manchester United"],
    correctAnswer: "Manchester City",
    type:"radio"
},
{
    question: "Who is well known by the nickname 'the final boss'?",
    options: ["Mike Tyson", "Manny Pacquiao", "Floyd Mayweather Jr.", "Anderson Silva"],
    correctAnswer: "Anderson Silva",
    type:"text"
},
{
    question: "What is the square root of 64?",
    options: ["4", "6", "8", "10"],
    correctAnswer: "8",
    type:"dropDown"
},
{
    question: "What year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: "1945",
    type:"dropDown"
},
{
    question: "Who is the president of Kenya?",
    options: ["Uhuru Kenyatta", "Raila Odinga", "William Ruto", "Mwai Kibaki"],
    correctAnswer: "William Ruto",
    type:"dropDown"
},
{
    question: "What is the chemical symbol for Gold?",
    options: ["Au", "Ag", "Fe", "Pb"],
    correctAnswer: "Au",
    type:"text"
},
{
    question: "When did Man City first reach a Champions League semi-final?",
    options: ["2016", "2019", "2020", "2021"],
    correctAnswer: "2016",
    type:"radio"
},
{
    question: "Who won the 2022 World Cup?",
    options: ["France", "Brazil", "Argentina", "Germany"],
    correctAnswer: "Argentina",
    type:"radio"
},
{
    question: "Who painted 'Starry Night'?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    correctAnswer: "Vincent van Gogh",
    type:"text"
},
{
    question: "What is the currency of Japan?",
    options: ["Yuan", "Won", "Yen", "Peso"],
    correctAnswer: "Yen",
    type:"radio"
},
{
    question: "Who is known as the 'Father of Computers'?",
    options: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"],
    correctAnswer: "Charles Babbage",
    type:"text"
},
{
    question: "Who came up with the theory of relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Niels Bohr"],
    correctAnswer: "Albert Einstein",
    type:"text"
},
{
    question: "Which company is the creator of the God of War franchise?",
    options: ["Sony", "Santa Monica Studios", "Nintendo", "EA"],
    correctAnswer: "Santa Monica Studios"
},
{
    question: "Who is the king of the seas?",
    options: ["Poseidon", "Neptune", "Triton", "Aquaman"],
    correctAnswer: "Poseidon"
},
{
    question: "Why did the chicken cross the road?",
    options: ["To get to the other side", "To escape the farmer", "To find food", "To meet other chickens"],
    correctAnswer: "To get to the other side"
},
{
    question: "What is the meaning of life?",
    options: ["42", "Love", "Happiness", "Purpose"],
    correctAnswer: "42",
    text:"dropDown"
},
{
    question: "Who is not a son of Zeus?",
    options: ["Apollo", "Ares", "Hermes", "Thor"],
    correctAnswer: "Thor",
    type:"dropDown"
},
{
    question: "Which one is the tallest mountain in Africa?",
    options: ["Mount Kilimanjaro", "Mount Kenya", "Mount Everest", "Mount Elbrus"],
    correctAnswer: "Mount Kilimanjaro"
},
{
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean"
},
{
    question: "Who scored the goal that won Man City the 11/12 Premier League title?",
    options: ["Sergio Agüero", "Yaya Touré", "David Silva", "Carlos Tevez"],
    correctAnswer: "Sergio Agüero"
}
];

// Event listener for submitting the name form
document.getElementById('name-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    startQuiz(); //Call startQuiz function
});

// Function to start the quiz
function startQuiz() {
  if (nameInput.value === '') {// If name is empty
      alert('Please enter your name');
      return; // Exit function
  }
  displayQuestion(currentQuestionIndex); // Call displayQuestion function
  document.getElementById('welcome-message').style.display = 'none'; // Hide the welcome message
  document.getElementById('start-btn').style.display = 'none';// Hide the start button
  document.getElementById('next-btn').style.display = 'block';// Show the next button
  
}

// Constant declarations
const quizContainer = document.getElementById('quiz-container');
const nameInput = document.getElementById('name-input');
const startBtn = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const contentContainer = document.getElementById('content-container');

// Variable declarations
let currentQuestionIndex = 0;
let score = 0;

// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle questions array and select first 5 questions
shuffle(questions);
const selectedQuestions = questions.slice(0, 5);

// Inside the displayQuestion function

function displayQuestion(index) {
  const currentQuestion = selectedQuestions[index];
  const questionContainer = document.getElementById('question-container');
  const choicesContainer = document.querySelector('.choices');
  
  // Clear previous content
  questionContainer.innerHTML = '';
  choicesContainer.innerHTML = '';

  // Display question
  const questionHeader = document.createElement('h2');
  questionHeader.textContent = `Question ${index + 1}`;
  questionContainer.appendChild(questionHeader);

  const questionTitle = document.createElement('h3');
  questionTitle.textContent = currentQuestion.question;
  questionContainer.appendChild(questionTitle);

  // Display options based on question type
  if (currentQuestion.type === 'dropdown') {
      const dropdown = document.createElement('select');
      currentQuestion.options.forEach(option => {
          const optionItem = document.createElement('option');
          optionItem.textContent = option;
          dropdown.appendChild(optionItem);
      });
      choicesContainer.appendChild(dropdown);
  } else if (currentQuestion.type === 'text') {
      const textInput = document.createElement('input');
      textInput.setAttribute('type', 'text');
      choicesContainer.appendChild(textInput);
  } else {
      const optionsList = document.createElement('ul');
      currentQuestion.options.forEach(option => {
          const optionItem = document.createElement('li');
          const optionButton = document.createElement('button');
          optionButton.textContent = option;
          optionButton.addEventListener('click', () => selectOption(index, option));
          optionItem.appendChild(optionButton);
          optionsList.appendChild(optionItem);
      });
      choicesContainer.appendChild(optionsList);
  }

  // Show/hide next button
  if (index === selectedQuestions.length - 1) {
      nextBtn.style.display = 'none';
      submitBtn.style.display = 'block';
  } else {
      nextBtn.style.display = 'block';
      submitBtn.style.display = 'none';
  }
}



// Function to show the next question
function showNextQuestion() {
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
    prevBtn.style.display = 'block';
    if (currentQuestionIndex === selectedQuestions.length - 1) {
        nextBtn.style.display = 'none';
        if (currentQuestionIndex === 4) {
            submitBtn.style.display = 'block';
        }
    }
}

// Function to show the previous question
function showPrevQuestion() {
    currentQuestionIndex--;
    displayQuestion(currentQuestionIndex);
    nextBtn.style.display = 'block';
    if (currentQuestionIndex === 0) {
        prevBtn.style.display = 'none';
    }
}

// Function to select an option for a question
function selectOption(questionIndex, selectedOption) {
  const currentQuestion = selectedQuestions[questionIndex];
  if (selectedOption === currentQuestion.correctAnswer) {
      score++;
  }

  // Remove the 'selected' class from all option buttons
  const optionButtons = document.querySelectorAll('.choices button');
  optionButtons.forEach(button => {
      button.classList.remove('selected');
  });

  // Add the 'selected' class to the clicked option button
  event.target.classList.add('selected');

  const inputElement = document.querySelector('.choices input[type="text"]');
    
    if (currentQuestion.type === 'text') {
        const enteredText = inputElement.value.trim().toLowerCase();
        if (enteredText === currentQuestion.correctAnswer.toLowerCase()) {
            score++;
        }
    } else {
        if (selectedOption === currentQuestion.correctAnswer) {
            score++;
        }
    }

    if (currentQuestion.type === 'dropdown') {
      const dropdown = document.querySelector('.choices select');
      const selectedValue = dropdown.options[dropdown.selectedIndex].text;
      if (selectedValue === currentQuestion.correctAnswer) {
          score++;
      }
  } else {
      if (selectedOption === currentQuestion.correctAnswer) {
          score++;
      }
  }

}


// Event listeners for buttons
startBtn.addEventListener('click', () => {
    if (nameInput.value === '') {
        alert('Please enter your name');
        return;
    }
    displayQuestion(currentQuestionIndex);
    startBtn.style.display = 'none';
    nextBtn.style.display = 'block';
});

nextBtn.addEventListener('click', () => {
    showNextQuestion();
});

prevBtn.addEventListener('click', () => {
    showPrevQuestion();
});

submitBtn.addEventListener('click', () => {
  const percentageScore = Math.min((score / selectedQuestions.length) * 100, 100); // Ensure the percentage doesn't exceed 100%
    let message = '';

    if (percentageScore === 100) {
        message = `CONGRATULATIONS ${nameInput.value.toUpperCase()}! YOU GOT 100%! AMAZING JOB!`;
    } else if (percentageScore > 70) {
        message = `Well done ${nameInput.value}, you got ${percentageScore}% correct! Keep it up!`;
    } else if (percentageScore >= 40) {
        message = `Good effort ${nameInput.value}, you got ${percentageScore}% correct!`;
    } else {
        message = `Better luck next time ${nameInput.value}, you got ${percentageScore}% correct!`;
    }

  // Hide the quiz content, not the entire container
  document.getElementById('question-container').style.display = 'none';
  document.querySelector('.choices').style.display = 'none';
  document.getElementById('prev-btn').style.display = 'none';
  document.getElementById('next-btn').style.display = 'none';
  submitBtn.style.display = 'none';

  // Create a new div to display score and message
  const resultDiv = document.createElement('div');
  resultDiv.innerHTML = `<h2>Quiz Result</h2><p>${message}</p>`;
  contentContainer.innerHTML = ''; // Clear previous content
  contentContainer.appendChild(resultDiv);
});

document.getElementById('show-answers-btn').addEventListener('click', function() {
  revealAnswers();
});

function revealAnswers() {
  // Iterate through questions
  selectedQuestions.forEach((question, index) => {
      // Find the container for the current question
      const questionContainer = document.getElementById(`question-${index}`);
      if (questionContainer) {
          // Find the correct answer element within the question container
          const correctAnswerElement = questionContainer.querySelector('.correct-answer');
          if (correctAnswerElement) {
              // Show the correct answer element
              correctAnswerElement.style.display = 'block';
          }
      }
  });
}
