
import Dahsboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login';
import Game from './pages/Game';
import Mainpage from './pages/Mainpage';


import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {


  return (
    <>
      {/* <GameBoard word={"word"} /> */}
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Mainpage />} />
            {/* <Route path='/login' element={<Login />} /> */}
            {/* <Route path='/register' element={<Register />} /> */}
            {/* <Route path='/dashboard' element={<Dahsboard />} /> */}
            <Route path='/game' element={<Game />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

