import { useState } from "react";
import WritingTable from "./WritingTable/WritingTable";
import Word from "./Word";
import Hint from "./Hint";
import GameNavbar from "./GameNavbar";


export default function GameBoard() {
  const wordsAndHints = [
    { word: "sprawiedliwość", hint: "Justice or fairness" },
    { word: "przyjaźń", hint: "Friendship" },
    { word: "miłość", hint: "Love or affection" },
    { word: "szczęście", hint: "Happiness or luck" },
    { word: "odwaga", hint: "Courage or bravery" },
    { word: "prawda", hint: "Truth or honesty" },
    { word: "wolność", hint: "Freedom or liberty" },
    { word: "piękno", hint: "Beauty or aesthetic" }
  ];

  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const [buttonStates, setButtonStates] = useState(
    wordsAndHints.map(({ word, hint }) => ({
      word,
      hint,
      currentString: '',
      selectedLetters: {},
      history: [],
      isComplete: false,
      isIncorrect: false
    }))
  );

  const updateButtonState = (index, newString, selectedLetters) => {
    setButtonStates((prevStates) => {
      const newStates = [...prevStates];
      const { word, currentString } = newStates[index];
      
      // Sprawdź, czy hasło zostało poprawnie odgadnięte
      const isComplete = currentString === word;
      
      // Jeśli hasło nie zostało odgadnięte, a długość zgadywanego słowa jest taka sama
      const isIncorrect = !isComplete && newString.length === word.length;
  
      newStates[index] = { 
        ...newStates[index], 
        currentString: newString, 
        selectedLetters,
        isComplete,
        isIncorrect
      };
  
      return newStates;
    });
  };

  const handleButtonClick = (index) => {
    setActiveButtonIndex(index);
  };

  const handleLetterClick = (index, letterIndex) => {
    setButtonStates((prevStates) => {
      const newStates = [...prevStates];
      const { selectedLetters, word, currentString, history } = newStates[index];
  
      if (!selectedLetters[letterIndex]) {
        const newSelectedLetters = { ...selectedLetters, [letterIndex]: true };
        const newString = currentString + word[letterIndex];
        const newHistory = [...history, { letterIndex, letter: word[letterIndex] }];
  
        newStates[index] = {
          ...newStates[index],
          selectedLetters: newSelectedLetters,
          currentString: newString,
          history: newHistory
        };
  
        // Update stanu przycisku
        updateButtonState(index, newString, newSelectedLetters);
      }
  
      return newStates;
    });
  };

  const handleUndo = () => {
    if (activeButtonIndex === null) return;
  
    setButtonStates((prevStates) => {
      const newStates = [...prevStates];
      const { history, word, currentString, selectedLetters } = newStates[activeButtonIndex];
  
      if (history.length > 0) {
        const lastAction = history[history.length - 1];
        const { letterIndex } = lastAction;
  
        const newSelectedLetters = { ...selectedLetters };
        delete newSelectedLetters[letterIndex];
  
        const newString = currentString.slice(0, -1);
        const newHistory = history.slice(0, -1);
  
        newStates[activeButtonIndex] = {
          ...newStates[activeButtonIndex],
          selectedLetters: newSelectedLetters,
          currentString: newString,
          history: newHistory
        };
  
        // Aktualizacja stanu po cofnięciu
        updateButtonState(activeButtonIndex, newString, newSelectedLetters);
      }
  
      return newStates;
    });
  };

  const handleReset = (index) => {
    setButtonStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = { 
        ...newStates[index], 
        currentString: '', 
        selectedLetters: {}, 
        history: [], 
        isComplete: false,
        isIncorrect: false 
      };
      return newStates;
    });
  };

  return (
    <div className="flex flex-col justify-between items-center max-h-screen p-4">
      <div className="flex space-x-2 mb-4">
        {wordsAndHints.map((_, index) => (
          <button
            key={index}
            className={`w-8 h-8 text-white rounded-full flex items-center justify-center transition-colors duration-500 ease-in-out ${
              buttonStates[index]?.isComplete
                ? 'bg-green-500'
                : 'bg-gray-800'
            }`}
            onClick={() => handleButtonClick(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {activeButtonIndex !== null && (
        <>
          <Hint hint={buttonStates[activeButtonIndex].hint} />
          <Word 
            word={buttonStates[activeButtonIndex].word}
            currentString={buttonStates[activeButtonIndex].currentString}
            onWordClick={() => {}} 
          />
          {buttonStates[activeButtonIndex].isComplete ? (
            // Animacja po odgadnięciu hasła
            <div className="p-4 bg-green-500 text-white rounded-xl animate-bounce text-center mt-16">
              Hasło odgadnięte!
            </div>
          ) : (
            <WritingTable 
              word={buttonStates[activeButtonIndex].word}
              selectedLetters={buttonStates[activeButtonIndex].selectedLetters}
              currentString={buttonStates[activeButtonIndex].currentString}
              onUpdateCurrentString={(newString) => updateButtonState(activeButtonIndex, newString, buttonStates[activeButtonIndex].selectedLetters)}
              onLetterClick={(letterIndex) => handleLetterClick(activeButtonIndex, letterIndex)}
              onReset={() => handleReset(activeButtonIndex)}
              onUndo={handleUndo}
            />
          )}
        </>
      )}
    </div>
  );
}
