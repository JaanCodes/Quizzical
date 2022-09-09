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
  const [showResult, setShowResult] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)


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


  function startQuizFn() {
    setStartQuiz(!startQuiz)
    setQuizData([])
    setDataLoaded(false)
    setCheckAnswers(false)
    setShowResult(false)
    setCompleted(false)
    setCorrectAnswers(0)
  }

  function handleClick() {
    setCheckAnswers(true)
    setShowResult(true)
    setCompleted(true)
  }

  


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
        showResultProp={[showResult, setShowResult]}
        completedProp={[completed, setCompleted]}
        correctAnswersProp={setCorrectAnswers}
      />
    )})


          
  return (
      <main>
        {startQuiz ?
         dataLoaded ?
          <section>
            <h1 className="title">Quizzical</h1>
            {questions}
            
            
              {showResult ? 
              <div className="checkAnswers__container">
                <h3 className="checkAnswers checkAnswers__text">You have guessed {correctAnswers}/5 questions</h3>
                <button className="checkAnswers checkAnswers__btn restartGame__btn" onClick={() => startQuizFn()}>Restart Quiz</button>
              </div>
              :
              <div className="checkAnswers__container">
                <button className="checkAnswers checkAnswers__btn" onClick={() => handleClick()}>Check Answers</button>
              </div>
              
              }
            
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