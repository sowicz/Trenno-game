import { useState, useEffect } from "react";
import Letter from "./Letter";

export default function WritingTable({
  word,
  selectedLetters,
  currentString,
  onUpdateCurrentString,
  onLetterClick,
  onReset,
  onUndo
}) {
  const [shuffledLetters, setShuffledLetters] = useState([]);

  // Funkcja do tasowania liter (algorytm Fisher-Yates)
  const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  useEffect(() => {
    const letters = word.split('');
    const shuffled = shuffleArray(
      letters.map((letter, index) => ({ letter, index }))
    ); // przetasuj litery wraz z indeksami
    setShuffledLetters(shuffled);
  }, [word]); // Tasowanie, gdy zmienia się słowo

  const handleLetterClick = (shuffledIndex) => {
    const originalIndex = shuffledLetters[shuffledIndex].index;
    onLetterClick(originalIndex);
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex space-x-4 my-4">
        <button onClick={onReset} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 shadow-md">
          Reset
        </button>
        <button onClick={onUndo} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 shadow-md">
          Undo
        </button>
      </div>
      
      <div
        className="border border-gray-300 bg-gray-100 shadow-md rounded-xl mt-2 mx-auto p-4 max-h-[80vh] overflow-y-auto w-screen sm:w-full"
        style={{ gridTemplateColumns: `repeat(4, minmax(0, 1fr))` }}
      >
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(4, minmax(0, 1fr))` }}
        >
          {shuffledLetters.map(({ letter, index }, shuffledIndex) => (
            <Letter
              key={shuffledIndex}
              letter={letter}
              id={index}
              isSelected={!!selectedLetters[index]}
              isCurrentStringEmpty={currentString === ''}
              onClick={() => handleLetterClick(shuffledIndex)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
