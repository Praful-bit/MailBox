/* eslint-disable react/prop-types */
// import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { mailAction } from '../../store/Mail';

function ReadMailForSent({mailId}) {
    const mailData = useSelector((state) => state.mail.mail);
    const mail = mailData.find((m) => m.id === mailId); // find the mail with selected id

    const dispatch = useDispatch();

  const handleBackClick = () => {
    dispatch(mailAction.clearSelectedMail());
  };
  return (
    <div className="flex flex-col h-full justify-center items-center min-h-[60vh]">
      {mail ? (
        <div className="w-full max-w-2xl bg-white/70 dark:bg-gray-900/80 rounded-3xl shadow-2xl border-2 border-transparent bg-clip-padding backdrop-blur-lg p-8 animate-fade-in-up border-gradient-to-br from-purple-500 via-fuchsia-400 to-blue-400 dark:from-purple-700 dark:via-pink-700 dark:to-blue-700">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl shadow">{mail.email?.[0]?.toUpperCase() || "M"}</span>
              <h1 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight">{mail.email}</h1>
            </div>
            <button
              onClick={handleBackClick}
              className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full p-3 shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
              aria-label="Back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-6 h-6"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </button>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">{mail.subject}</p>
            <div className="text-gray-600 dark:text-gray-300 text-base whitespace-pre-line break-words bg-white/40 dark:bg-gray-800/40 rounded-xl p-4 shadow-inner">
              {mail.plainMessage}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-800 dark:text-gray-200 text-lg font-semibold">No mail selected.</p>
      )}
      <style>{`
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(.39,.575,.565,1) both; }
        .border-gradient-to-br { border-image: linear-gradient(to bottom right, #a21caf, #f472b6, #60a5fa) 1; }
        .dark .border-gradient-to-br { border-image: linear-gradient(to bottom right, #7c3aed, #db2777, #2563eb) 1; }
      `}</style>
    </div>
  )
}

export default ReadMailForSent