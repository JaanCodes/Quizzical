import React from "react"
import Start from "./components/Start"
import Question from "./components/Question"
import { htmlDecode, shuffle } from "./components/helperFunctions"
import { useEffect, useState } from "react"
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'


export default function App() {
  const [startQuiz, setStartQuiz] = useState(false)
  const [quizData, setQuizData] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [checkAnswers, setCheckAnswers] = useState(false)

  useEffect(() => {
    async function getQuestions() {
      const url = "https://opentdb.com/api.php?amount=5"
      const res = await fetch(url)
      const data = await res.json()
      startQuiz && setQuizData(data.results)
      setDataLoaded(true)
    }
    getQuestions()
  }, [startQuiz])


  const questions = quizData.map(question => {
    return (
      <Question 
        questionTitle={question.question}
        questionid = {nanoid()}
        correctAnswer={question.correct_answer}
        incorrectAnswers={question.incorrect_answers}
        questionOptions={shuffle([...question.incorrect_answers, question.correct_answer]).map(answer => {
          return {
            answer: answer,
            id: nanoid(),
            selected: false,
            correct: answer === question.correct_answer ? true : false
        }
        })}
        startGame={[startQuiz, setStartQuiz]}
        checkAnswersProp={[checkAnswers, setCheckAnswers]}
      />
    )})


          
  return (
      <main>
        {startQuiz ?
         dataLoaded ?
          <section>
            <h1 className="title">Quizzical</h1>
            {questions}
            <button className="checkAnswers checkAnswers__btn" onClick={() => setCheckAnswers(true)}>Check Answers</button>
          </section>
          :
          <div className="spinner__container">
            <div className="spinner"></div>
          </div>
        :
        <Start startGame={[startQuiz, setStartQuiz]} />}
      </main>
  )
}