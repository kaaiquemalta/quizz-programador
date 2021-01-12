// Declaração de variáveis
const question = document.querySelector('#question');
const answerBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ['a', 'b', 'c', 'd'];
let points = 0;
let actualQuestion = 0;

//Perguntas
const questions = [
    {
      "question": "PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
  ]

//Substituição do quizz para a primeira pergunta
function init() {
    // Criar a primeira pergunta
    createQuestion(0);
}

//Cria uma pergunta
function createQuestion (i){

    //Limpar a questão anterior
    const oldButtons = answerBox.querySelectorAll('button');
    oldButtons.forEach(function(btn){
        btn.remove();
    });

    //Alterar o texto da pergunta
    const questionText = question.querySelector('#question-text');
    const questionNumber = question.querySelector('#question-number');

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // Insere as questões

    questions[i].answers.forEach(function(answer, i) {
      
      // cria template do botão do quizz
      const answerTemplate = document.querySelector('.answer-template').cloneNode(true);
      const letterBtn = answerTemplate.querySelector('.btn-letter');
      const answerText = answerTemplate.querySelector('.question-answer');

      letterBtn.textContent = letters[i];
      answerText.textContent = answer['answer'];
       
      answerTemplate.setAttribute('correct-answer', answer['correct']);

      //Remover hide e template class
      answerTemplate.classList.remove('hide');
      answerTemplate.classList.remove('answer-template');

      //Inserir a alternativa na tela
      answerBox.appendChild(answerTemplate);

      // Inserir um evento de click no botão
      answerTemplate.addEventListener('click', function() {
      checkAnswer(this);
      });

    });
    
    // Incrementar o número da questão
    actualQuestion++;
    
  }
function checkAnswer(btn) {

  const buttons = answerBox.querySelectorAll('button');
  
  buttons.forEach(function(button) {

    if (button.getAttribute('correct-answer') === 'true') {
      button.classList.add('correct-answer');

      if (btn == button) {
        points++;
      }
    } 
    else {
      button.classList.add('wrong-answer');
    }

  });

  //Exibir próxima pergunta
  nextQuestion();

}
//Exibir próxima pergunta do quizz
function nextQuestion(){
  //timer para usuário ver as respostas
  setTimeout(function(){

    if (actualQuestion >= questions.length) {
      //Apresentar mensagem de sucesso
      showSuccesMessage();
      return;
    } 

    createQuestion(actualQuestion);

  }, 1500);
}

//Exibe a tela final
function showSuccesMessage() {

  hiderOrShowQuizz();

  //Trocar dados para tela de sucesso

  //Calcular score
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector('#display-score');
  displayScore.textContent = score.toString();

  //Alterar o número de perguntas corretas
  const correctAnswers = document.querySelector('#correct-answers');
  correctAnswers.textContent = points;

  //Alterar o total de perguntas
  const totalQuestions = document.querySelector('#questions-qty');
  totalQuestions.textContent = questions.length;

}

//Mostre ou esconde o score

function hiderOrShowQuizz() {
  quizzContainer.classList.toggle('hide');
  scoreContainer.classList.toggle('hide');
}

//Reiniciar Quizz

const restartBtn = document.querySelector('#restart');

restartBtn.addEventListener('click', function(){

  //Zerar o jogo
  actualQuestion = 0;
  points = 0;
  hiderOrShowQuizz();
  init();

});

//Inicialização do quizz
init();