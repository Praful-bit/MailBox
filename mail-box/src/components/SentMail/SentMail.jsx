// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mailAction } from '../../store/Mail';
import { Link } from 'react-router-dom';
import ReadMailForSent from '../ReadMail/ReadMailForSent';
import UseFetch from '../Hooks/UseFetch';

function SentMail() {
  const selectedMailId = useSelector((state) => state.mail.selectedMailId);
  const dispatch = useDispatch();

  const url = `https://mail-box-1c3dd-default-rtdb.firebaseio.com`;
  const [mailData] = UseFetch(`${url}/mail.json`);

  const handleClick = (id) => {
    dispatch(mailAction.selectMail(id));
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-700 p-6">
      <div className="w-full max-w-6xl mx-auto bg-white/60 dark:bg-gray-900/70 rounded-3xl shadow-2xl backdrop-blur-lg p-6 border border-white/30 dark:border-gray-700/40">
        {selectedMailId ? (
          <ReadMailForSent mailId={selectedMailId} />
        ) : (
          <div className="flex flex-col gap-6">
            {mailData.length > 0 ? (
              mailData.map((data) => (
                <div
                  key={data.id}
                  onClick={() => handleClick(data.id)}
                  className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-purple-100/60 via-pink-100/60 to-blue-100/60 dark:from-purple-900/40 dark:via-pink-900/40 dark:to-blue-900/40 border border-transparent hover:border-purple-400 dark:hover:border-fuchsia-500 shadow-lg hover:scale-[1.025] transition-all duration-300 cursor-pointer relative backdrop-blur-md"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow">
                      {data.email?.[0]?.toUpperCase() || "M"}
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-100 truncate max-w-[180px] md:max-w-[240px]">
                      {data.email}
                    </span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-300 flex-1 truncate text-base mx-1 sm:mx-4">
                    {data.subject}
                  </span>
                  <span className="hidden md:inline text-gray-400 dark:text-gray-400 truncate flex-1">
                    {data.plainMessage}
                  </span>
                  <span className="ml-auto px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold shadow-lg">
                    Sent
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-300">No sent mails found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SentMail;
