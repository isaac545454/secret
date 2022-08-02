import React from 'react'
import "./gamever.css"

const gameOver = ({retry, score}) => {
  return (
    <div>
        <h1>fim de jogo</h1>
        <h2>a sua pontuação foi: <span>{score}</span></h2>
        <button onClick={retry}>reiniciar</button>
    </div>
  )
}

export default gameOver