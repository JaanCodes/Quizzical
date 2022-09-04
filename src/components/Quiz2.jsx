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
  // const [isHeld, setIsHeld] = useState(false)
  const [answers, setAnswers] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const allCorrectAnswers = props.correctAnswers
  const [correctAnswers, setCorrectAnswers] = useState(0)
  // const styles = {
  //   backgroundColor:    ? "lightblue" : "white"
  // }

  useEffect(() => {
    setAnswers(props.questionOptions)
  },[])

  function handleClick(option) {
    setSelectedAnswers(oldAnswers => [...oldAnswers, option])
  }

  function checkCorrectAnswers() {
    selectedAnswers.map(answer => {
      if(allCorrectAnswers.includes(answer)){
        setCorrectAnswers(prev => prev + 1)
      }
    })
  }

  const optionElements = answers.map((option) => {
    return (
      <li 
        key={nanoid()} 
        className={selectedAnswers.includes(option) ? "answer active" : "answer"}
        onClick={() => handleClick(option)}
        // style={styles}
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
        <button className="checkAnswers__btn" onClick={() => {checkCorrectAnswers}}>Check Answers</button>
    </div>
  )
}