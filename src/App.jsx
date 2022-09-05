import React from "react"
import { useEffect, useState } from "react"
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
import Start from "./components/Start"
import Quiz from "./components/Quiz"
import "./index.css"


export default function App() {
  const [questionsData, setQuestionsData] = useState([])
  const [startQuiz, setStartQuiz] = useState(false)
  const allCorrectAnswers = []

  useEffect(() => {
    async function getQuestions() {
      const url = "https://opentdb.com/api.php?amount=5"
      const res = await fetch(url)
      const data = await res.json()
      setQuestionsData(data.results)
    }
    getQuestions()
  }, [startQuiz])

  for(let i = 0 ; i < questionsData.length ; i++) {
    allCorrectAnswers.push(questionsData[i].correct_answer)
  }

  const questions = questionsData.map(question => {
    return (
      <Quiz 
        questionTitle={question.question} 
        correctAnswers={allCorrectAnswers}
        incorrectAnswers={question.incorrect_answers}
        questionOptions={[...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5)}
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