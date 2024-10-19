import GameBorad from "../components/GameBoard/GameBoard";
import WebsocketConnection from "../components/WebsocketConnection";
import { useLocation } from 'react-router-dom';

export default function Game() {

  const location = useLocation();
  const { nickname } = location.state || {};


  return(
    <>
      <WebsocketConnection nickname={nickname}>
        
      </WebsocketConnection>
    </>
  )

}