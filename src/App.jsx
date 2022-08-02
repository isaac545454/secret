
import Start from "./components/startScreen"
import Game from "./components/game"
import GameOver from "./components/gameOver"
import { useEffect, useState, useCallback} from "react"
import { wordsList } from "./data/data"
import './App.css'

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"}, 
  {id: 3, name: "end"}
]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [wrongLetters, setWordLetters] = useState([])
  const [score, setScore] = useState(0)
 

  const pickWordAndCategory = useCallback(()=>{
      const categories = Object.keys(words)
        const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
      const word = words[category][Math.floor(Math.random() * words[category].length)]
      return {word, category}
  }, [words])

  const startGame = useCallback(()=>{

    clearLetterrsStates()

    const {word, category} = pickWordAndCategory()
    console.log(word, category);
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l)=> l.toLowerCase())
    console.log(wordLetters);
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)
 
    setGameStage(stages[1].name)
  }, [pickedWord])

  const verifyLetter = (letter)=>{
    const normalizedLetter = letter.toLowerCase()

     if(guessedLetters.includes(normalizedLetter) ||
        wrongLetters.includes(normalizedLetter)){
          return
        }

        if(letters.includes(normalizedLetter)){
          setGuessedLetters((actualGuessedLetters)=>[
            ...actualGuessedLetters,
            normalizedLetter
          ])

        }else{

           setWordLetters((actualWrongLetters)=>[
            ...actualWrongLetters,
            normalizedLetter
          ])

          setGuesses((actualGuesses)=> actualGuesses - 1)

        }
        console.log(guessedLetters)
        console.log(wrongLetters)
  }

  const clearLetterrsStates = () =>{
     setGuessedLetters([])
      setWordLetters([])
  }

  useEffect(()=>{


    if(guesses <= 0){
      clearLetterrsStates()
      setGameStage(stages[2].name)
    }

  }, [guesses])


  useEffect(()=>{

    const uniqueLetters = [... new Set(letters)]
    if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name){
    setScore((actualScore)=> actualScore += 100)
    startGame()

    }
     
  }, [guessedLetters, letters, startGame])

  const retry = ()=>{

    setScore(0)
    setGuesses(3)
    setGameStage(stages[0].name)
     

  }

 

  return (
    <div className="App">
      {gameStage === "start" && <Start startGame={startGame} />}
      {gameStage === "game" && 
      <Game 
      verifyLetter={verifyLetter} 
      pickedWord={pickedWord} 
      pickedCategory={pickedCategory}
      letters={letters}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}
      />}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    
    </div>
  )
}

export default App
