import InputSearch from "./InputSearch";
import SlideBar from "./SlideBar";
import { useDispatch, useSelector } from "react-redux";
import Home from '../Home/Home';
import { Outlet } from "react-router-dom";
import { useState } from "react";

function Inbox() {
  const toggle = useSelector((state) => state.mail.toggle);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      {!toggle ? (
        <Home />
      ) : (
        <div className="flex flex-col md:flex-row min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-700">
          
          {/* Sidebar (stacked on top for mobile) */}
          <div className="w-full md:w-[250px]">
            <SlideBar dispatch={dispatch} />
          </div>

          {/* Main content */}
          <main className="flex-1 flex flex-col items-center justify-start py-6 px-3 sm:px-6 md:px-10 overflow-auto">
            <InputSearch
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="w-full max-w-6xl mt-4 animate-fade-in-up">
              <Outlet context={{ searchTerm }} />
            </div>

            {/* Animation style */}
            <style>{`
              @keyframes fade-in-up {
                from { opacity: 0; transform: translateY(40px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .animate-fade-in-up {
                animation: fade-in-up 0.8s cubic-bezier(.39,.575,.565,1) both;
              }
            `}</style>
          </main>
        </div>
      )}
    </>
  );
}

export default Inbox;
