import React from "react"
import { useEffect, useState } from "react"
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
import Start from "./components/Start"
import Quiz from "./components/Quiz"
import "./index.css"


export default function App() {
  const [questionsData, setQuestionsData] = useState([])
  const [startQuiz, setStartQuiz] = useState(false)


  useEffect(() => {
    async function getQuestions() {
      const url = "https://opentdb.com/api.php?amount=5"
      const res = await fetch(url)
      const data = await res.json()
      setQuestionsData(data.results)
    }
    getQuestions()
  }, [])

  const questions = questionsData.map(question => {
    return (
      <Quiz 
        questionTitle={question.question} 
        correctAnswer={question.correct_answer}
        incorrectAnswers={question.incorrect_answers}
        questionOptions={[...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5)}
        key={nanoid()}
      />
    )})

          
  return (
      <main>
        {startQuiz ? 
          <section>
            <h1 className="title">Quizzical</h1>
            {questions}
            <button className="checkAnswers__btn">Check Answers</button>
          </section> : 
          <Start startGame={[startQuiz, setStartQuiz]} />}
      </main>
  )
}