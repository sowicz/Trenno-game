import { useState } from "react";
import Letter from "./Letter";
import DisplayText from "./DisplayText";

export default function WritingTable({ word, onUpdateCurrentString }) {
  const [selectedLetters, setSelectedLetters] = useState({});
  const [currentString, setCurrentString] = useState('');

  const handleLetterClick = (letterId) => {
    if (!selectedLetters[letterId]) {
      setSelectedLetters((prev) => ({ ...prev, [letterId]: true }));
      const newString = currentString + word[letterId];
      setCurrentString(newString);
      onUpdateCurrentString(newString); // Update parent component with the new string
    }
  };

  const handleReset = () => {
    setSelectedLetters({});
    setCurrentString('');
    onUpdateCurrentString(''); // Notify parent component of reset
  };

  const handleUndo = () => {
    const lastLetterIndex = currentString.length - 1;
    if (lastLetterIndex >= 0) {
      const lastLetter = currentString[lastLetterIndex];
      const newSelectedLetters = { ...selectedLetters };

      const letterIdToUndo = Object.keys(selectedLetters).find(
        (key) => word[key] === lastLetter && selectedLetters[key]
      );

      if (letterIdToUndo) {
        delete newSelectedLetters[letterIdToUndo];
        setSelectedLetters(newSelectedLetters);
        const newString = currentString.slice(0, -1);
        setCurrentString(newString);
        onUpdateCurrentString(newString); // Update parent component with the new string
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-32 ">
      {/* <DisplayText draggedLetters={currentString.split('')} /> */}
      <div className="flex space-x-4 my-3">
        <button onClick={handleReset} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 shadow-md">
          Reset
        </button>
        <button onClick={handleUndo} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 shadow-md">
          Cofnij
        </button>
      </div>
      
      <div
        className="border border-gray-300 bg-gray-100 shadow-md rounded-xl mt-2 mx-auto p-4 max-h-[80vh] overflow-y-auto"
        style={{ gridTemplateColumns: `repeat(4, minmax(0, 1fr))` }}
      >
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(4, minmax(0, 1fr))` }}
        >
          {word.split('').map((letter, index) => (
            <Letter
              key={index}
              letter={letter}
              id={index}
              isSelected={!!selectedLetters[index]}
              isCurrentStringEmpty={currentString === ''}
              onClick={() => handleLetterClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
