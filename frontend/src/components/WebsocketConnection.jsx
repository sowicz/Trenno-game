import GameBoard from './GameBoard/GameBoard';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


export default function WebsocketConnection({nickname}) {
  const [message, setMessage] = useState('');
  const [wordsAndHints, setWordsAndHints] = useState([]);
  const [initialTimeleft, setInitialTimeleft] = useState(0);
  const [usersOnline, setUsersOnline] = useState(0);
  const [leaderboard, setLeaderBoard] = useState([])
  const navigate = useNavigate();


  const socketRef = useRef(null); // Use a ref to maintain socket instance


  if (!nickname) {
    navigate('/');
  }


  // nickname = 'Drzewo'

  // send summary when time ends
  const sendSummary = (points) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(points);
      socketRef.current.send("new"); // Send data to the server
    } else {
      console.error('WebSocket is not open');
    }
  }
  
   
  // send summary when user finish all words before time ends
  const sendFinishWords = (points) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(points); // Send data to the server
    } else {
      console.error('WebSocket is not open');
    }
  }
  
  useEffect(() => {
    // const socket = new WebSocket('ws://localhost:8000/ws/esssss');

    const socket = new WebSocket(`ws://localhost:8000/ws/${nickname}`);
    socketRef.current = socket; // Store socket instance in ref


    socket.onopen = () => {
      console.log('WebSocket connection established');
      localStorage.setItem('scores', JSON.stringify([]))
    };


    socket.onmessage = (event) => {
      console.log('Message from server: ');
      const data = JSON.parse(event.data)
      console.log(JSON.parse(event.data))
      setMessage(event.data);  // Update message state with the response

      if (Array.isArray(data)) {
        setWordsAndHints(data)
      }

      if ('phase' in data) {
        setInitialTimeleft(data.time_left)
        if (data.phase === 'new_game') {
          localStorage.setItem('scores', JSON.stringify([]));
        }
      }
      if ('online' in data) {
        setUsersOnline(data.online)
      }


      if ('nickname' in data && data.points > 0) {
        let scores = JSON.parse(localStorage.getItem('scores'));
        const nicknameExists = scores.some(score => score.nickname === data.nickname);
      
        // If the nickname doesn't exist, add the new score
        if (!nicknameExists) {
          scores.push(data);
          
          // Sort scores from highest to lowest by points
          scores.sort((a, b) => b.points - a.points);
      
          // Save the updated, sorted scores to localStorage
          localStorage.setItem('scores', JSON.stringify(scores));
      
          // Update leaderboard state
          setLeaderBoard(scores);
        }
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Cleanup WebSocket connection when component unmounts
    return () => {
      socket.close();
    };
  }, []);

  return (
    <>
      <GameBoard 
        wordsAndHints={wordsAndHints} 
        initialTimeleft={initialTimeleft} 
        usersOnline={usersOnline} 
        sendSummary={sendSummary} 
        sendFinishWords={sendFinishWords}
        leaderboard={leaderboard}
        nickname={nickname}/>
    </>
  );
}

