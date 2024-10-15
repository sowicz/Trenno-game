import { useState } from "react";
import Letter from "./Letter";
import DisplayText from "./DisplayText";

export default function WritingTable({ word }) {
  const [password, setPassword] = useState(word);
  const [selectedLetters, setSelectedLetters] = useState({});
  const [currentString, setCurrentString] = useState('');

  const handleLetterClick = (letterId) => {
    if (!selectedLetters[letterId]) {
      setSelectedLetters((prev) => ({ ...prev, [letterId]: true }));
      setCurrentString((prevString) => prevString + password[letterId]);
    }
  };

  const handleReset = () => {
    setSelectedLetters({});
    setCurrentString('');
  };

  const handleUndo = () => {
    const lastLetterIndex = currentString.length - 1;
    if (lastLetterIndex >= 0) {
      const lastLetter = currentString[lastLetterIndex];
      const newSelectedLetters = { ...selectedLetters };
      
      // Znajdź ID ostatniej litery w currentString
      const letterIdToUndo = Object.keys(selectedLetters).find(
        (key) => password[key] === lastLetter && selectedLetters[key]
      );

      // Usuń zaznaczenie dla tej litery
      delete newSelectedLetters[letterIdToUndo];
      setSelectedLetters(newSelectedLetters);
      setCurrentString((prevString) => prevString.slice(0, -1));
    }
  };

  const rows = 4;

  const getGridTemplateColumns = () => {
    const numCols = Math.ceil(password.length / rows);
    return `repeat(${numCols}, minmax(0, 1fr))`;
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <DisplayText draggedLetters={currentString.split('')} />
      <div className="flex space-x-4 mt-3">
        <button onClick={handleReset} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Reset
        </button>
        <button onClick={handleUndo} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          Cofnij
        </button>
      </div>
      <div
        className="border border-blue-500 mt-5 mx-auto p-4 max-h-[80vh] overflow-y-auto"
        style={{
          gridTemplateColumns: getGridTemplateColumns(),
        }}
      >
        <div className="grid gap-2" style={{ gridTemplateColumns: getGridTemplateColumns() }}>
          {password.split('').map((letter, index) => (
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
