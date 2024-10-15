import { useState } from "react";

export default function Leaderboard({scores, nickname}) {
  // const [players, setPlayers] = useState(scores);


  return (
    <div className="w-80 mx-auto my-8 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Wyniki</h2>
      <div className="overflow-x-auto border rounded-lg dark:border-neutral-700">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2 text-left">Rank</th>
              <th className="px-4 py-2 text-left">Gracz</th>
              <th className="px-4 py-2 text-right">Punkty</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((player, index) => (
              <tr
                key={player.nickname}
                className={`
                  ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}
                  ${player.nickname === nickname ? 'bg-yellow-200' : ''}
                  hover:bg-gray-300 transition-colors duration-200 ease-in-out
                `}
              >
                <td className="px-4 py-2 text-left font-medium">
                  {index + 1}
                </td>
                <td className="px-4 py-2 text-left">{player.nickname}</td>
                <td className="px-4 py-2 text-right">{player.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}