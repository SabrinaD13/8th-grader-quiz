const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timerDisplay = document.querySelector('#timerDisplay');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
{
question: "What country was the United States fighting against during the War of 1812?",
choice1:"Great Britain",
choice2:"France",
choice3:"Canada",
choice4:"Mexico",
answer: 1,
},
{
question: "What is the name of the mountain range that extends from New Mexico to Canada?",
choice1:"Great Smoky Mountains",
choice2:"Rocky Mountains",
choice3:"Appalachian Mountains",
choice4:"Alleghany Mountains",
answer: 2,
},
{
question: "What does a wave carry?",
choice1:"Energy",
choice2:"Mass",
choice3:"Speed",
choice4:"Liquid",
answer: 1,
},
{
question: "What is 3 5/6 in decimal form, rounded to 2 decimal places?",
choice1:'15.00',
choice2:'3.56',
choice3:'2.33',
choice4:'3.83',
answer: 4,
 },
{
question: "Where was the First Continental Congress held?",
choice1:'Boston',
choice2:'Washington D.C',
choice3:'Richmond',
choice4:'Philadelphia',
answer: 4,
},
{
question: "What is the reaction between a base and an acid called?",
choice1:'Synthesis',
choice2:'Catalyzation',
choice3:'Polymerization',
choice4:'Amination',
answer: 2,
},  
{
question: "Who was the first emperor of Rome?",
choice1:'Julius Caesar',
choice2:'Little Caesar',
choice3:'Augustus Caesar',
choice4:'Claudius Caesar',
answer: 3,
}, 
{
question: "Who was the 16th president of the United States?",
choice1:'Frabklin Pierce',
choice2:'Abraham Lincoln',
choice3:'John Adams',
choice4:'Ulysses S. Grant',
answer: 2,
},  
{
question: "What is another word for zoo?",
choice1:'Menagerie',
choice2:'Menagere',
choice3:'Menagerry',
choice4:'Monagerie',
answer: 1,
},  
{
question: "Who wrote the poems Fire and Ice and The Road Not Taken?",choice1:'Robert Tanner',
choice2:'Edgar Allan Poe',
choice3:'Robert Frost',
choice4:'Nathaniel Frost',
answer: 3,
}
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('https://sabrinad13.github.io/8th-grader-quiz/end.html')
}


questionCounter++
progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
currentQuestion = availableQuestions[questionsIndex]
question.innerText = currentQuestion.question

choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
})

availableQuestions.splice(questionsIndex, 1)

acceptingAnswers = true
} 

choices.forEach(choice => {
    choice.addEventListener('click', e => {
if(!acceptingAnswers) return

acceptingAnswers = false
const selectedChoice = e.target
const selectedAnswer = selectedChoice.dataset['number']

let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

if(classToApply === 'correct') {
    incrementScore(SCORE_POINTS)
}

selectedChoice.parentElement.classList.add(classToApply)

setTimeout(() => {
    selectedChoice.parentElement.classList.remove(classToApply)
    getNewQuestion()

        }, 1000)

    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()