import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../../store/Mail";
import ReadMail from "../ReadMail/ReadMail";
import { Link, useOutletContext } from "react-router-dom";
import { useEffect } from "react";

function InputBoxMailContent() {
  const data = useSelector((state) => state.mail.mail);
  const selectedMailId = useSelector((state) => state.mail.selectedMailId);
  const dispatch = useDispatch();
  const { searchTerm = "" } = useOutletContext() || {};

  const url = `https://mail-box-1c3dd-default-rtdb.firebaseio.com/`;

  const get = async () => {
    try {
      const res = await fetch(`${url}/mail.json`);
      const resData = await res.json();
      const arr = [];
      for (const key in resData) {
        arr.push({ id: key, ...resData[key] });
      }
      dispatch(mailAction.getMail(arr));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    get();
  }, [dispatch]);

  const handleMailClick = (id) => {
    dispatch(mailAction.selectMail(id));
  };

  const filteredData = data.filter(mail =>
    mail.email && mail.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-700 p-4 sm:p-6 overflow-x-hidden">
      <Link to="/inbox" />
      <div className="w-full max-w-6xl mx-auto bg-white/60 dark:bg-gray-900/70 rounded-3xl shadow-2xl backdrop-blur-lg p-4 sm:p-6 border border-white/30 dark:border-gray-700/40">
        {selectedMailId ? (
          <ReadMail mailId={selectedMailId} />
        ) : (
          <div className="flex flex-col gap-4 sm:gap-6">
            {filteredData.length > 0 ? (
              filteredData.map((mail) => (
                <div
                  key={mail.id}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-100/60 via-pink-100/60 to-blue-100/60 dark:from-purple-900/40 dark:via-pink-900/40 dark:to-blue-900/40 border border-transparent hover:border-purple-400 dark:hover:border-fuchsia-500 shadow-lg hover:scale-[1.025] transition-all duration-300 cursor-pointer backdrop-blur-md"
                  onClick={() => handleMailClick(mail.id)}
                >
                  <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <span className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow">
                      {mail.email?.[0]?.toUpperCase() || "M"}
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-100 truncate max-w-[180px] sm:max-w-[240px]">
                      {mail.email}
                    </span>
                  </div>

                  <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base truncate flex-1 w-full sm:mx-4">
                    {mail.subject}
                  </span>

                  <div className="flex items-center gap-2 sm:gap-4 justify-between sm:justify-end w-full sm:w-auto">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white text-xs font-bold shadow-lg animate-pulse">
                      Unread
                    </span>
                    <svg
                      className="w-6 h-6 text-yellow-400 opacity-70 group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                    </svg>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-300">No mails found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default InputBoxMailContent;
