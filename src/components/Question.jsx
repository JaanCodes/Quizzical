import React from "react"
import { useState, useEffect } from "react"
import { htmlDecode } from "./helperFunctions";

export default function Quiz(props) { 
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    setAnswers(props.questionOptions)
  },[])

  useEffect(() => {
    if(props.checkAnswersProp[0]) {
      setAnswers(prev => {
        return prev.map(ans => {
          return (
            ans.selected ?
              ans.correct ?
                {...ans, style: {"backgroundColor": "green", "color": "white"}} && props.correctAnswersProp(prev => prev + 1)
              :
                {...ans, style: {"backgroundColor": "red", "color": "white"}}
            :
              ans.correct ?
                {...ans, style: {"backgroundColor": "#ADF7B6", "color": "white"}}
              :
                {...ans}
          )
        })
      }),
      props.showResultProp[1](true)
    }
  },[props.checkAnswersProp[0]])

  
  function selectAnswer(id) {
    if(!props.completedProp[0]) {
      setAnswers(prevAnswers => prevAnswers.map(answer => {
        return (
          answer.id === id ? 
            {...answer, selected: true} :
            {...answer, selected: false}
        )
      }))
    }
  }
  

  const optionElements = answers.map((answer) => {
    return (
      <li
        key={answer.id}
        onClick={() => selectAnswer(answer.id)}
        style={{...answer.style}}
        className={answer.selected && !props.completedProp[0] ? "answer selected" : "answer"}
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