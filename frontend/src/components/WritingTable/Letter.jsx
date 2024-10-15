export default function Letter({ letter, id, isSelected, onClick }) {
  return (
    <div
      className={`flex items-center justify-center cursor-pointer border-2 border-slate-300 rounded-xl
      ${isSelected ? 'bg-slate-300 text-white' : 'bg-white text-black'}
      w-20 h-20 text-2xl lg:w-14 lg:h-14 
      transition-colors duration-100`}
      onClick={() => onClick(id)}
    >
      {letter}
    </div>
  );
}