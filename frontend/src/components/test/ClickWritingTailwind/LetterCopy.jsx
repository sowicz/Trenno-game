export default function Letter({ letter, id, isSelected, onClick }) {
  const baseStyle = `text-center mx-auto flex items-center justify-center border-2 border-blue-400 cursor-pointer transition-colors duration-100`;

  const appliedStyle = {
    width: '20vw',  // Default size for mobile
    height: '18vw', // Default size for mobile
    fontSize: '5vw', // Default font size for mobile
    margin: "2px",
    userSelect: "none",
  };

  // Override default styles for larger screens
  if (window.innerWidth > 768) {
    appliedStyle.width = '3vw';
    appliedStyle.height = '3vw';
    appliedStyle.fontSize = '1.5vw';
  }

  return (
    <div
      className={`${baseStyle} ${isSelected ? 'bg-cyan-500 text-white' : 'bg-white text-black'}`}
      style={appliedStyle}
      onClick={() => onClick(id)}
    >
      {letter}
    </div>
  );
}
