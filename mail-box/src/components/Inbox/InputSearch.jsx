import { useDispatch } from 'react-redux';
import { authAction } from '../../store/Auth';

function InputSearch({ value, onChange }) {
  const dispatch = useDispatch();
  return (
    <header className="flex items-center w-full bg-white/60 dark:bg-gray-900/70 backdrop-blur-lg shadow-md border-b border-white/30 dark:border-gray-700/40 px-6 py-3 z-30">
      <h1 className="text-2xl md:text-3xl font-extrabold mr-8 select-none flex items-center animate-purple-fire-glow">
        <span className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-400 bg-clip-text text-transparent px-3 py-1 rounded-lg mr-2 drop-shadow-lg">MailBox</span>
        <span className="text-3xl md:text-4xl ml-1 animate-bounce">🔥</span>
      </h1>
      <div className="flex flex-1 max-w-xl mx-auto items-center bg-white/80 dark:bg-gray-800/80 rounded-xl shadow px-4 py-2">
        <input
          type="text"
          placeholder="Search mail..."
          className="flex-grow bg-transparent outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 px-2 py-1 text-lg"
          value={value}
          onChange={onChange}
        />
        <button className="ml-2 p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:scale-110 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>
      <button
        onClick={() => dispatch(authAction.logout())}
        className="ml-6 flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-lg font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-pink-500"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
        Log out
      </button>
      <style>{`
        @keyframes purple-fire-glow {
          0%, 100% { filter: drop-shadow(0 0 8px #a21caf) drop-shadow(0 0 16px #f472b6); }
          50% { filter: drop-shadow(0 0 16px #a21caf) drop-shadow(0 0 32px #f472b6); }
        }
        .animate-purple-fire-glow { animation: purple-fire-glow 1.5s infinite alternate; }
      `}</style>
    </header>
  );
}

export default InputSearch;
