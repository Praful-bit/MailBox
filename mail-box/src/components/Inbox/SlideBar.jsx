/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { mailAction } from "../../store/Mail";
import { Link, useLocation } from "react-router-dom";


function SlideBar({ dispatch }) {
  const getData = useSelector((state) => state.mail.mail);
  const unreadeCount = useSelector((state) => state.mail.unreadeCount);
  const location = useLocation();

  return (
    <aside className="relative h-screen w-64 bg-white/60 dark:bg-gray-900/70 backdrop-blur-lg shadow-2xl border-r border-white/30 dark:border-gray-700/40 flex flex-col items-center py-8 px-4 z-20">
      {/* User avatar */}
      <div className="mb-8 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl font-bold select-none">U</span>
        </div>
        <span className="mt-2 text-gray-700 dark:text-gray-200 font-semibold text-lg">
          User
        </span>
      </div>
      {/* Floating Compose Button */}
      <button
        onClick={() => dispatch(mailAction.toggleCompose())}
        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg px-6 py-3 text-lg font-semibold mb-8 hover:scale-105 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Compose
      </button>
      <nav className="flex-1 w-full">
        <ul className="space-y-2">
          <Link to="/inbox">
            <li
              className={`flex items-center gap-3 cursor-pointer rounded-lg px-4 py-3 transition-all duration-200 ${
                location.pathname === "/inbox"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "hover:bg-blue-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Inbox
              <span className="ml-auto bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs font-bold">
                {getData.length}
              </span>
            </li>
          </Link>
          <Link to="/unread">
            <li className="flex items-center gap-3 cursor-pointer rounded-lg px-4 py-3 hover:bg-blue-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-200">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 6 9.388 6 12v2.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              Unread
              <span className="ml-auto bg-red-400 text-white rounded-full px-2 py-0.5 text-xs font-bold">
                {unreadeCount}
              </span>
            </li>
          </Link>
          <li className="flex items-center gap-3 cursor-pointer rounded-lg px-4 py-3 hover:bg-blue-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-200">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Starred
          </li>
          <Link to="/sentmail">
            <li
              className={`flex items-center gap-3 cursor-pointer rounded-lg px-4 py-3 transition-all duration-200 mt-4 ${
                location.pathname === "/sentmail"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "hover:bg-blue-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 3h-6a2 2 0 00-2 2v4a2 2 0 002 2h6a2 2 0 002-2V5a2 2 0 00-2-2z"
                />
              </svg>
              Sent
            </li>
          </Link>
          <li className="flex items-center gap-3 cursor-pointer rounded-lg px-4 py-3 hover:bg-blue-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-200">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7v4a1 1 0 001 1h3m10-5h3a1 1 0 011 1v4m-1 4v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2m16-4V7a2 2 0 00-2-2H5a2 2 0 00-2 2v4m16 0a2 2 0 01-2 2H5a2 2 0 01-2-2"
              />
            </svg>
            Drafts
          </li>
          <li className="flex items-center gap-3 cursor-pointer rounded-lg px-4 py-3 hover:bg-blue-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-200">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"
              />
            </svg>
            Archive
          </li>
          <li className="flex items-center gap-3 cursor-pointer rounded-lg px-4 py-3 hover:bg-blue-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-200">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 13H5v-2h14v2z"
              />
            </svg>
            Spam
          </li>
          <Link to="/deleted">
            <li className="flex items-center gap-3 cursor-pointer rounded-lg px-4 py-3 hover:bg-blue-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-200">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2H8a2 2 0 00-2 2v12z"
                />
              </svg>
              Deleted Items
            </li>
          </Link>
         
        </ul>
      </nav>
     
      {/* Custom keyframes for sidebar animation */}
      <style>{`
        @keyframes float-slow { 0% { transform: translateY(0); } 50% { transform: translateY(-30px); } 100% { transform: translateY(0); } }
        @keyframes float-medium { 0% { transform: translateY(0); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0); } }
        @keyframes float-fast { 0% { transform: translateY(0); } 50% { transform: translateY(-50px); } 100% { transform: translateY(0); } }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 10s ease-in-out infinite; }
      `}</style>
    </aside>
  );
}

export default SlideBar;
