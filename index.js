const express = require("express")
const app = express()
var cors = require('cors')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(cors())
app.use(require('body-parser').urlencoded({ extended: false }))

app.listen(8080, () =>
    console.log(`Example app listening on port ${8080}!`),
)

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/projects', (req, res) => {
    res.render('projects')
})

app.get('/questions', (req, res) => {
    const questions = [
        {
            question: "What does SDLC stands for ?",
            answers: [
                "Software Design Life Cycle",
                "Software Development Life Cycle",
                "System Development Life Cycle"
            ]
        },
        {
            question: "In which step of SDLC actual programming of software code is done ?",
            answers: [
                "Development and Documentation",
                "Maintenance and Evaluation",
                "Design"
            ]
        },
        {
            question: "Software Debugging is known as ...",
            answers: [
                "identifying the task to be computerized",
                "creating program code",
                "finding and correcting errors in the program code"
            ]
        },
        {
            question: "Efficiency in a software product does not include ...",
            answers: [
                "licensing",
                "memory utilization",
                "processing time"
            ]
        },
        {
            question: "What is a Software ?",
            answers: [
                "Software is set of programs",
                "Software is documentation and configuration of data",
                "Software is set of programs, documentation & configuration of data"
            ]
        }
    ]

    return res.json(questions)
})

app.post('/answers', (req, res) => {
    const correctAnswers = [1, 0, 2, 0, 2]
    const userAnswers = req.body.answers
    const currentScore = getScore(correctAnswers, JSON.parse(userAnswers))

    return res.json(currentScore)
})

const getScore = (correctAnswers, userAnswers) => {
    let score = 0
    for (let i = 0; i < correctAnswers.length; i++) {
        if (correctAnswers[i] === userAnswers[i]) {
            score += 20
        }
    }

    return {score}
}
