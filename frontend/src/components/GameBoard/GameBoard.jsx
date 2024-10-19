import { useState, useEffect } from "react";
import GameNavbar from "./GameNavbar";
import WritingTable from "../WritingTable/WritingTable";
import Word from "./Word";
import Leaderboard from "./Leaderboard";

export default function GameBoard({wordsAndHints, initialTimeleft, usersOnline, sendSummary, sendFinishWords, leaderboard, nickname}) {

  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const [buttonStates, setButtonStates] = useState([]);
  const [timeleft, setTimeleft] = useState(initialTimeleft);
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    if (wordsAndHints.length > 0) {
      setButtonStates(
        wordsAndHints.map(({ word }) => ({
          word,
          currentString: '',
          selectedLetters: {},
          history: [],
          isComplete: false,
          isIncorrect: false
        }))
      );
    }
  }, [wordsAndHints]);

  useEffect(() => {
    if (initialTimeleft > 0) {
      setTimeleft(initialTimeleft);
    }
  }, [initialTimeleft]);

  useEffect(() => {
    if (timeleft > 0) {
      const timerId = setTimeout(() => {
        setTimeleft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (timeleft === 0) {
      handleSendSummary();
      setGameFinished(false);
    }
  }, [timeleft]);

  useEffect(() => {
    const allWordsGuessed = buttonStates.length > 0 && buttonStates.every(state => state.isComplete);
    if (allWordsGuessed && !gameFinished) {
      send();
      setGameFinished(true);
    }
  }, [buttonStates]);

  const handleSendSummary = () => {
    const pointsPerWord = 10;
    let totalPoints = 0;

    buttonStates.forEach((state) => {
      if (state.isComplete) {
        totalPoints += pointsPerWord;
      }
    });
    sendSummary(totalPoints);
  };

  const send = () => {
    const pointsPerWord = 10;
    let totalPoints = 0;

    buttonStates.forEach((state) => {
      if (state.isComplete) {
        totalPoints += pointsPerWord;
      }
    });
    totalPoints += timeleft;
    sendFinishWords(totalPoints);
  };

  const updateButtonState = (index, newString, selectedLetters) => {
    setButtonStates((prevStates) => {
      const newStates = [...prevStates];
      const { word, currentString } = newStates[index];
      const isComplete = currentString === word;
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

        updateButtonState(index, newString, newSelectedLetters);
      }

      return newStates;
    });
  };

  const handleUndo = () => {
    if (activeButtonIndex === null) return;

    setButtonStates((prevStates) => {
      const newStates = [...prevStates];
      const { history, currentString, selectedLetters } = newStates[activeButtonIndex];

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
    <div className="flex flex-col items-center max-h-screen">
      <GameNavbar timeleft={timeleft} usersOnline={usersOnline} />

      <div className="flex flex-col justify-between items-center max-h-screen p-4">
        {gameFinished ? <Leaderboard scores={leaderboard} nickname={nickname}/> : wordsAndHints.length === 0 ? (
          <Leaderboard scores={leaderboard} nickname={nickname}/>
        ) : (
          <>
            <div className="flex justify-center space-x-2 mb-4 flex-wrap w-80">
              {wordsAndHints.map((_, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 my-1 text-white rounded-full flex items-center justify-center transition-colors duration-500 ease-in-out ${buttonStates[index]?.isComplete ? 'bg-green-500' : 'bg-gray-800'}`}
                  onClick={() => handleButtonClick(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {activeButtonIndex === null && (
              <div className="text-gray-500 mt-4">Kliknij w numer, aby rozpocząć</div>
            )}

            {activeButtonIndex !== null && (
              <>
                <Word 
                  word={buttonStates[activeButtonIndex]?.word}
                  currentString={buttonStates[activeButtonIndex]?.currentString}
                  onWordClick={() => {}}
                />
                {buttonStates[activeButtonIndex]?.isComplete ? (
                  <div className="p-4 bg-green-500 text-white rounded-xl animate-bounce text-center mt-16">
                    Hasło odgadnięte!
                  </div>
                ) : (
                  <WritingTable 
                    word={buttonStates[activeButtonIndex]?.word}
                    selectedLetters={buttonStates[activeButtonIndex]?.selectedLetters}
                    currentString={buttonStates[activeButtonIndex]?.currentString}
                    onUpdateCurrentString={(newString) => updateButtonState(activeButtonIndex, newString, buttonStates[activeButtonIndex]?.selectedLetters)}
                    onLetterClick={(letterIndex) => handleLetterClick(activeButtonIndex, letterIndex)}
                    onReset={() => handleReset(activeButtonIndex)}
                    onUndo={handleUndo}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
