import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [solution, setSolution] = useState("percy")
  const [guesses, setGuesses] = useState(Array(6).fill(null))
  const [currentGuess, setCurrentguess] = useState("")

  

  useEffect(() => {
    //API Request for word
    // const randomWordFromAPI =
    // setSolution(randomWordFromAPI)

    function onKeyPressed (e) {
      const char = e.key
      const regex = /^[a-z]$/;
  
      //When pressed enter and when chars is not greater than 5 submit to guess
      if (char === 'Enter' && currentGuess.length === 5){
        const newGuessArray = [...guesses]

        const indexOfGuess = guesses.findIndex(val => !val)
        console.log(indexOfGuess)

        newGuessArray[indexOfGuess] = currentGuess

        setCurrentguess("")
        setGuesses(newGuessArray)
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
    
    return () => {
      window.removeEventListener("keydown", onKeyPressed)
    }
  },[currentGuess, guesses])
  
  const Line = ({ guess }) => {
    const boxes = []

    for(let i = 0; i < solution.length; i++){
      const char = guess[i]
      boxes.push(<div key={i} className='box'>{char}</div>)
    }

    return <div className='line'>{boxes}</div>
  }


  return (
    <div className='game'> 
      <h1>Wordle clone</h1>
      {guesses.map((guess, idx) => {
        const isCurrenGuess = idx === guesses.findIndex(value => !value)
        return <Line key={idx} guess={isCurrenGuess ? currentGuess : guess ? guess: ""} />
      })}
    </div>
  );
}

export default App;
