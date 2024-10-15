

export default function DisplayText({ draggedLetters }) {
  return (
    <div className="mt-3">
      <h2>Current String:</h2>
      <p className="fs-3">{draggedLetters.join('')}</p> {/* Wypisywanie ciągu liter */}
    </div>
  );
}