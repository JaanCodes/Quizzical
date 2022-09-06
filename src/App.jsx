import React from "react"
import Start from "./components/Start"
import Quiz from "./components/Quiz"
import { htmlDecode, shuffle } from "./components/helperFunctions"
import { useEffect, useState } from "react"
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'


export default function App() {
  const [startQuiz, setStartQuiz] = useState(false)
  const [quizData, setQuizData] = useState([])
  const allCorrectAnswers = []

  useEffect(() => {
    async function getQuestions() {
      const url = "https://opentdb.com/api.php?amount=5"
      const res = await fetch(url)
      const data = await res.json()
      setQuizData(data.results)
    }
    getQuestions()
  }, [startQuiz])

  for(let i = 0 ; i < quizData.length ; i++) {
    allCorrectAnswers.push(quizData[i].correct_answer)
  }

  const questions = quizData.map(question => {
    return (
      <Quiz 
        questionTitle={question.question} 
        correctAnswers={allCorrectAnswers}
        incorrectAnswers={question.incorrect_answers}
        questionOptions={shuffle([...question.incorrect_answers, question.correct_answer])}
        key={nanoid()}
        startGame={[startQuiz, setStartQuiz]}
      />
    )})


          
  return (
      <main>
        {startQuiz ? 
          <section>
            <h1 className="title">Quizzical</h1>
            {questions}
          </section> :
          <Start startGame={[startQuiz, setStartQuiz]} />}
      </main>
  )
}