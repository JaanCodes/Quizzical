import React from "react"
import { useState, useEffect } from "react"
import { htmlDecode } from "./helperFunctions";

export default function Quiz(props) { 
  const [answers, setAnswers] = useState([])
  let correctAnswers = 0
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    setAnswers(props.questionOptions)
  },[])

  useEffect(() => {
    if(props.checkAnswersProp) {
      setAnswers(prev => {
        return prev.map(ans => {
          return (
            ans.correct ?
              ans.selected ?
                ({...ans, style: {"backgroundColor": "green"}},
                correctAnswers += 1)
              :
                {...ans, style: {"backgroundColor": "green"}}
            :
            {...ans, style: {"backgroundColor": "red"}}
          )
        })
      })
    }
  },[props.checkAnswersProp])

  function selectAnswer(id) {
    setAnswers(prevAnswers => prevAnswers.map(answer => {
      return (
        answer.id === id ? 
          {...answer, selected: true} :
          {...answer, selected: false}
      )
    }))
  }
  

  const optionElements = answers.map((answer) => {
    return (
      <li
        key={answer.id}
        onClick={() => selectAnswer(answer.id)}
        style={{...answer.style}}
        className={answer.selected ? "answer selected" : "answer"}
      >
        {htmlDecode(answer.answer)}
      </li>
    )
  })


  return (
    <div className="quiz">
        <h2 className="question">{htmlDecode(props.questionTitle)}</h2>
        <ul className="answers">
            {optionElements}
        </ul>
    </div>
  )
}