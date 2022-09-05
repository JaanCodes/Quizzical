import React from "react"
import { useState, useEffect } from "react"
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
import { decodeEntity } from 'html-entities';

function unEscape(htmlStr) {
    htmlStr = htmlStr.replace(/&lt;/g , "<");	 
    htmlStr = htmlStr.replace(/&gt;/g , ">");     
    htmlStr = htmlStr.replace(/&quot;/g , "\"");  
    htmlStr = htmlStr.replace(/&#039;/g , "\'");   
    htmlStr = htmlStr.replace(/&amp;/g , "&");
    return htmlStr;
}

export default function Quiz(props) { 
  const [answers, setAnswers] = useState([])
  const selectedAnswers = []
  const allCorrectAnswers = props.correctAnswers
  let correctAnswers = 0
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    setAnswers(props.questionOptions)
  },[])


  function handleClick(option) {
    selectedAnswers.push(option)
    console.log(selectedAnswers);
  }

  function checkCorrectAnswers() {
    selectedAnswers.map(answer => {
      if(allCorrectAnswers.includes(answer)){
        correctAnswers += 1
      }
    })
    setShowResult(true)
  }

  const optionElements = answers.map((option) => {
    return (
      <li
        key={nanoid()} 
        onClick={() => handleClick(option)}
        className={selectedAnswers.includes(option) ? "answer active" : "answer"}
      >
        {option}
      </li>
  )})

  return (
    <div className="quiz">
        <h2 className="question">{decodeEntity(unEscape(props.questionTitle))}</h2>
        <ul className="answers">
            {optionElements}
        </ul>
        {showResult ? 
          <div className="checkAnswers__container">
            <h3 className="checkAnswers checkAnswers__text">You have guessed {correctAnswers}/5 questions</h3>
            <button className="checkAnswers checkAnswers__btn restartGame__btn" onClick={() => {props.startGame[1](!props.startGame[0])}}>Restart Quiz</button>
          </div> : 
          <button className="checkAnswers checkAnswers__btn" onClick={() => {checkCorrectAnswers()}}>Check Answers</button>}
    </div>
  )
}