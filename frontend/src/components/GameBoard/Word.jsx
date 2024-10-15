


export default function Word({ word, currentString }) {
  // Function to split the word into chunks of 8 characters each
  const chunkedWord = word.match(/.{1,7}/g); // Splits the word into chunks of up to 8 characters

  return (
    <div className="flex flex-col space-y-2 mb-4">
      {chunkedWord.map((chunk, rowIndex) => (
        <div key={rowIndex} className="flex space-x-1">
          {chunk.split('').map((letter, index) => {
            const globalIndex = rowIndex * 7 + index; // Calculate the global index for the letter

            return (
              <div
                key={globalIndex}
                className={`flex items-center justify-center mt-2 w-10 h-10 sm:w-10 sm:h-10 border-2 rounded-md sm:rounded-xl ${
                  currentString[globalIndex] === letter
                    ? 'bg-green-300 border-green-300'
                    : 'bg-gray-200'
                }`}
              >
                {currentString[globalIndex] || '_'}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}