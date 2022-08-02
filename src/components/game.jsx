import React, {useState, useRef } from 'react'
import "./game.css"

const game = (
    {verifyLetter,
    pickedWord,
    pickedCategory,
    letters,
    guessedLetters,
    guesses,
    score,
    wrongLetters,

}) => {
    const [letter, setLetters] = useState("")
    const letterInputRef = useRef(null)
    const handleSubmit = (e) =>{
        e.preventDefault()
        verifyLetter(letter)
        setLetters("")
        letterInputRef.current.focus()
    }
  return (
    <div className="game">

        <p className="points">
            <span> pontuação: {score}</span>
        </p>
        <h3 className="tip">
                    Dica sobre a palavra: <span>{pickedCategory}</span>
        </h3>

        <p>você ainda tem {guesses} tentativa(s)</p>

        <div className="wordContainer">
                    {letters.map((letter, i)=>(
                        guessedLetters.includes(letter)? (
                            <span key={i} className="letter">{letter}</span>
                        ):(
                            <span key={i} className="blankSquare"></span>
                        )
                    ))}
            
        </div>

        <div className="letterContainer">
            <p>tente adivinhar uma letra da palavra</p>

            <form onSubmit={handleSubmit}>
                <input
                 type="text" 
                 name="letter"
                  maxLength="1" 
                   required 
                   onChange={(e)=> setLetters(e.target.value)}
                   value={letter}
                   ref={letterInputRef}
                   />
                <button>jogar</button>
            </form>
        </div>

        <div className="wrongLettersContainer">
            <p>letras já utilizadas:</p>
            {wrongLetters.map((letter, i)=>(
                <span key={i}>{letter},</span>
            ))}
            
        </div>


    
    </div>
  )
}

export default game