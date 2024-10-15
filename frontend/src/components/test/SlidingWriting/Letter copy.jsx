


export default function Letter({ letter, id, isSelected, isCurrentStringEmpty, onDragStart, onDragOver, onDrop, onTouchMove  }) {

  const handleDragStart = () => {
    onDragStart(id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    onDragOver(id);
  };

  const handleDrop = () => {
    onDrop();
  };

  const handleTouchStart = () => {
    onDragStart(id);
  };

  // Kolor tła zmienia się tylko jeśli currentString nie jest pusty
  const backgroundColor = isCurrentStringEmpty ? 'white' : (isSelected ? 'lightblue' : 'white');

  return (
    <span
      className="fs-1 border border-info text-center mx-2 px-4 py-2 my-5 rounded-3"
      style={{
        // width: '60px',
        // height: '60px',
        cursor: 'grab',
        userSelect: 'none',
        backgroundColor: backgroundColor, // Ustalamy kolor tła
      }}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onTouchStart={handleTouchStart}
      onTouchMove={onTouchMove}
      data-id={id} // Unikalny identyfikator dla dotyku
    >
      {letter}
    </span>
  );
}