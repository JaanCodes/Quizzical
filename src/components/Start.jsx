import React from "react"

export default function Start(props) {

  return (
    <div className="StartComponent">
      <h1 className="title">Quizzical</h1>
      <p className="start__p">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, quia cumque amet similique deleniti maiores dolor rem eligendi! Quasi, nobis.</p>
      <button className="start__btn" onClick={() => {props.startGame[1](!props.startGame[0])}}>Start Quiz</button>
    </div>

  )
}