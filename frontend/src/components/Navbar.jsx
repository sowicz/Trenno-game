
import { Link } from "react-router-dom";

export default function Navbar() {


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white text-black w-full p-4 flex justify-between items-center border shadow-sm">
        <h2 className="text-2xl font-bold ">Trenno</h2>
        <div className="sm:px-40 px-16 w-full text-sm ">
          {/* <ul className="flex flex-row">
            <li className="mx-4"><a href="#">Strona główna</a></li>
            <li><a href="#">Link</a></li>
          </ul> */}
        </div>
        {/* Mobile Menu Button */}
        <div className='mr-8 mx-auto'>
          {/* <button><Link to={'/login'}>Zaloguj</Link></button> */}
        </div>
      </header>

      {/* Sidebar for screens md and up */}
      </nav>
  );
};
