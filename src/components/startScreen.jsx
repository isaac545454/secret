import React from 'react'
import "./startScren.css"
const startScreen = ({startGame}) => {
  return (
    <div className="start">
        <h1>secret word</h1>
        <p>clique no botão abaixo para começar a jogar</p>
        <button onClick={startGame}>começar a jogar</button>
    </div>
  )
}
 export default startScreen