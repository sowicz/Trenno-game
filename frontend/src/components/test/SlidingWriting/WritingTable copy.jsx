import { useState, useEffect } from "react"

import Letter from "./Letter"
import DisplayText from "./DisplayText"


export default function WritingTable() {

  const [password, setPassword] = useState('');
  const [draggedLetters, setDraggedLetters] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState({}); // {id: true} - zarządzanie zaznaczeniem liter
  const [currentString, setCurrentString] = useState('');


  useEffect(() => {
    fetch('/words.json')
      .then((response) => response.json())
      .then((data) => {
        setPassword(data.password);
      })
      .catch((error) => console.error('Błąd podczas wczytywania JSON:', error));
  }, []);


  const handleDragStart = (letterId) => {
    setIsDragging(true);
    setDraggedLetters([letterId]);
    setCurrentString(password[letterId]); // Rozpoczynamy nowy ciąg od litery, z którą zaczynamy przeciąganie
    setSelectedLetters(password.split('').reduce((acc, _, index) => ({
      ...acc,
      [index]: false
    }), {})); // Resetujemy zaznaczenie
  };

  const handleDragOver = (letterId) => {
    if (isDragging) {
      if (!draggedLetters.includes(letterId)) {
        setDraggedLetters((prevLetters) => [...prevLetters, letterId]);
        setCurrentString(prevString => prevString + password[letterId]); // Aktualizujemy ciąg podczas przeciągania
      }
    }
  };

  const handleDrop = () => {
    setIsDragging(false);
    const newSelectedLetters = draggedLetters.reduce((acc, id) => ({ ...acc, [id]: true }), {});
    setSelectedLetters(prev => ({ ...prev, ...newSelectedLetters }));
    console.log(currentString);
    // Optionally, reset the dragged letters after drop
    // setDraggedLetters([]);
  };

  // const handleTouchMove = (e) => {
  //   const touch = e.touches[0];
  //   const target = document.elementFromPoint(touch.clientX, touch.clientY);
  //   if (target && target.dataset.id) {
  //     handleDragOver(target.dataset.id);
  //   }
  // };
  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (target && target.dataset.id) {
      handleDragOver(parseInt(target.dataset.id, 10)); // Przekazujemy poprawny indeks
    }
  };


  return(
    <div>
      <div
        // className="container-sm border border-primary mt-5 mx-auto p-2"
        className="container-sm border border-primary mt-5 mx-auto p-2 d-flex flex-wrap"
        style={{}}
        onTouchEnd={handleDrop}
      >
        {password.split('').map((letter, index) => (
          <Letter
            key={index}
            letter={letter}
            id={index}
            isSelected={!!selectedLetters[index] || draggedLetters.includes(index)}
            isCurrentStringEmpty={currentString === ''}
            onDragStart={() => handleDragStart(index)}
            onDragOver={() => handleDragOver(index)}
            onDrop={handleDrop}
            onTouchMove={handleTouchMove}
          />
        ))}

      </div>
        <DisplayText draggedLetters={currentString.split('')} />
    </div>
  )

}