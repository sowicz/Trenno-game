import React from 'react';

export default function Hint({ hint }) {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 my-4 w-80  mx-auto shadow-sm">
      <p className="text-gray-700 text-center">{hint}</p>
    </div>
  );
}
