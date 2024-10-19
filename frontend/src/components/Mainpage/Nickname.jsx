import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Nickname() {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;
    setNickname(value);

    // Walidacja: imię nie może być puste ani zawierać tylko spacji
    if (value.trim() === '') {
      setError('Imię nie może być puste.');
    } else if (/\s/.test(value)) {
      setError('Imię nie może zawierać spacji.');
    } else {
      setError('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (nickname.trim() && !/\s/.test(nickname)) {
      // Nawigacja do komponentu GameBoard z imieniem gracza
      navigate('/game', { state: { nickname } });
    }
  };

  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 m-auto w-80 shadow-xl">
      <h3 className="text-lg font-semibold mb-4">Podaj nazwę gracza</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nickname}
          onChange={handleChange}
          className="border border-gray-400 rounded-lg p-2 w-full mb-4"
          placeholder="Imię gracza"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg py-2 px-4 w-full hover:bg-blue-600 transition"
        >
          Zatwierdź
        </button>
      </form>
    </div>
  );
}
