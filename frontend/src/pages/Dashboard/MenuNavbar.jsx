import React, { useState } from 'react';


const btn_1 = 'Analitycs';
const btn_2 = 'Konto';
const btn_3 = 'Ranking';  
const btn_4 = 'Sklep';  
const btn_5 = 'Settings';  
// const btn_6 = 'Admin';  

export default function MenuNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <header className="bg-white text-black w-full p-4 flex justify-between items-center border shadow-sm">
        <h2 className="text-2xl font-bold ">Trenno</h2>
        {/* Mobile Menu Button */}
        <div className='mr-8 mx-auto'>
          <button>Wyloguj</button>
        </div>
        <button onClick={toggleMenu} className="md:hidden text-black focus:outline-none">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </header>

      {/* Sidebar for screens md and up */}
      <div className="flex flex-1">
        <aside className="hidden md:flex flex-col bg-white text-black w-64 p-4 shadow-sm">
          <nav>
            <ul className='text-center'>
              <li className="mb-4 mt-8">
                <a href="#" className="hover:text-gray-400">{btn_1}</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:text-gray-400">{btn_2}</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:text-gray-400">{btn_3}</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:text-gray-400">{btn_4}</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:text-gray-400">{btn_5}</a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Fullscreen mobile menu */}
        {isOpen && (
          <div className="fixed inset-0 bg-gray-800 text-white z-50 flex flex-col items-center justify-center md:hidden">
            <button onClick={toggleMenu} className="absolute top-4 right-4 text-white">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <nav className="text-center">
              <ul>
                <li className="mb-8">
                  <a href="#" className="text-2xl hover:text-gray-400">{btn_1}</a>
                </li>
                <li className="mb-8">
                  <a href="#" className="text-2xl hover:text-gray-400">{btn_2}</a>
                </li>
                <li className="mb-8">
                  <a href="#" className="text-2xl hover:text-gray-400">{btn_3}</a>
                </li>
                <li className="mb-8">
                  <a href="#" className="text-2xl hover:text-gray-400">{btn_4}</a>
                </li>
                <li className="mb-8">
                  <a href="#" className="text-2xl hover:text-gray-400">{btn_5}</a>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="text-3xl font-bold">Main Content</h1>
          <p>Welcome to the responsive navbar with a top and sidebar example!</p>
        </main>
      </div>
    </div>
  );
};
