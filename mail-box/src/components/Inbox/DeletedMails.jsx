import { useSelector, useDispatch } from "react-redux";
import { mailAction } from "../../store/Mail";
import ReadMail from "../ReadMail/ReadMail";

function DeletedMails() {
  const deleted = useSelector((state) => state.mail.deleted);
  const selectedMailId = useSelector((state) => state.mail.selectedMailId);
  const dispatch = useDispatch();

  const handleMailClick = (id) => {
    dispatch(mailAction.selectMail(id));
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-700 p-4 sm:p-6">
      <div className="w-full max-w-6xl mx-auto bg-white/60 dark:bg-gray-900/70 rounded-3xl shadow-2xl backdrop-blur-lg p-4 sm:p-6 border border-white/30 dark:border-gray-700/40">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-purple-700 dark:text-purple-300">Deleted Mails</h2>

        {selectedMailId ? (
          <ReadMail mailId={selectedMailId} />
        ) : (
          <div className="flex flex-col gap-4 sm:gap-6">
            {deleted.length > 0 ? (
              deleted.map((mail) => (
                <div
                  key={mail.id}
                  className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-gray-300/60 via-red-100/60 to-gray-100/60 dark:from-gray-900/40 dark:via-red-900/40 dark:to-gray-900/40 border border-transparent hover:border-red-400 dark:hover:border-red-500 shadow-lg hover:scale-[1.025] transition-all duration-300 cursor-pointer backdrop-blur-md"
                  onClick={() => handleMailClick(mail.id)}
                >
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-gray-500 flex items-center justify-center text-white font-bold text-lg shadow">
                      {mail.email?.[0]?.toUpperCase() || "M"}
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-100 truncate max-w-[180px] sm:max-w-[240px]">
                      {mail.email}
                    </span>
                  </div>

                  <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base truncate flex-1 sm:mx-4 w-full">
                    {mail.subject}
                  </span>

                  <div className="flex items-center gap-2 sm:gap-4 justify-between sm:justify-end w-full sm:w-auto">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-gray-500 text-white text-xs font-bold shadow-lg text-center">
                      Deleted
                    </span>
                    <button
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold shadow-lg hover:scale-105 transition-transform"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(mailAction.restoreMail({ id: mail.id }));
                      }}
                    >
                      Restore
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-300">No deleted mails found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DeletedMails;
