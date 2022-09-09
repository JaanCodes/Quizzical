import React from "react"

export default function Start(props) {
  return (
    <div className="StartComponent">
      <h1 className="title">Quizzical</h1>
      <p className="start__p">Quizzical is a great app to conquer your cluelessness and  test your knowledge, or as a fun challenge with your friends (or alone). You will learn about history, science, literature and much more by answering to questions. I promise you won't leave Quizzical without learning something new!</p>
      <button className="start__btn" onClick={() => {props.startGame[1](true)}}>Start Quiz</button>
    </div>
  )
}