import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [solution, setSolution] = useState("percy")
  const [guesses, setGuesses] = useState(Array(6).fill(null))
  const [currentGuess, setCurrentguess] = useState("")
  const [isGameOver, setIsGameOver] = useState(false)

  

  useEffect(() => {
    //API Request for word
    // const randomWordFromAPI =
    // setSolution(randomWordFromAPI)

    function onKeyPressed (e) {
      const char = e.key
      const regex = /^[a-z]$/;

      if (isGameOver){
        return
      }
  
      //When pressed enter and when chars is not greater than 5 submit to guess
      if (char === 'Enter' && currentGuess.length === 5){
        const newGuessArray = [...guesses]

        const indexOfGuess = guesses.findIndex(val => !val)

        newGuessArray[indexOfGuess] = currentGuess

        setCurrentguess("")
        setGuesses(newGuessArray)

        if ( currentGuess === solution) {
          setIsGameOver(true)
        }
      }

      if (char === 'Backspace') {
        setCurrentguess(currentGuess.slice(0,-1))
      }

      //Listen to only a to z
      if (regex.test(char) ){
        //Generate word of user input
        setCurrentguess(currentGuess.length === 5 ? currentGuess : currentGuess + char)
      }
    }

    window.addEventListener("keydown", onKeyPressed)

    if (guesses.every(value => value)){
      setIsGameOver(true)
    }
    
    return () => {
      window.removeEventListener("keydown", onKeyPressed)
    }
  },[currentGuess, guesses, isGameOver])
  
  const Line = ({ guess, isCurrenGuess }) => {
    const boxes = []

    for(let i = 0; i < solution.length; i++){
      const char = guess[i]

      const  classnameForStateBox = char === solution[i] ? "correct" : solution.includes(char) ? "close" : "incorrect"
        
      boxes.push(<div key={i} className={`box ${isCurrenGuess ? "incorrect" : classnameForStateBox}`}>{char}</div>)
    }

    return <div className='line'>{boxes}</div>
  }

  const resetGameHandler = () =>{
    setSolution("money")
    setGuesses(Array(6).fill(null))
    setCurrentguess("")
    setIsGameOver(false)
  }

  return (
    <div className='game'> 
      <h1>Wordle clone</h1>
      {guesses.map((guess, idx) => {
        const isCurrenGuess = idx === guesses.findIndex(value => !value)
        return <Line key={idx} guess={isCurrenGuess ? currentGuess : guess ? guess: ""} isCurrenGuess={isCurrenGuess} />
      })}
      <div style={{display: isGameOver ? "block": "none"}}>
        <h1 >Solution is: {solution}</h1>
        <button onClick={resetGameHandler}>Play again!</button>
      </div>
    </div>
  );
}

export default App;
