import { useSelector,  } from "react-redux";
// import { mailAction } from "../../store/Mail";

function UnreadMailBox() {
  const mails = useSelector((state) => state.mail.mail);
  const unreadMails = mails.filter((mail) => !mail.read);
  const selectedMailId = useSelector((state) => state.mail.selectedMailId);
//   const dispatch = useDispatch();

//   const handleMailClick = (id) => {
//     dispatch(mailAction.selectMail(id));
//   };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-700 p-6">
      <div className="w-[100vw] max-w-6xl mx-auto bg-white/60 dark:bg-gray-900/70 rounded-3xl shadow-2xl backdrop-blur-lg p-6 border border-white/30 dark:border-gray-700/40">
        <h2 className="text-2xl font-bold mb-6 text-purple-700 dark:text-purple-300">Unread Mails</h2>
        {selectedMailId ? (
          <div className="text-center text-gray-500 dark:text-gray-300">Mail opened. (Go back to see unread list.)</div>
        ) : (
          <div className="flex flex-col gap-6">
            {unreadMails.length > 0 ? (
              unreadMails.map((mail) => (
                <div
                  key={mail.id}
                  className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-purple-100/60 via-pink-100/60 to-blue-100/60 dark:from-purple-900/40 dark:via-pink-900/40 dark:to-blue-900/40 border border-transparent hover:border-purple-400 dark:hover:border-fuchsia-500 shadow-lg hover:scale-[1.025] transition-all duration-300 cursor-pointer relative backdrop-blur-md"
                //   onClick={() => handleMailClick(mail.id)}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow">{mail.email?.[0]?.toUpperCase() || "M"}</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-100 truncate max-w-[180px] md:max-w-[240px]">{mail.email}</span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-300 flex-1 truncate mx-4 text-base">{mail.subject}</span>
                  <span className="ml-4 px-3 py-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white text-xs font-bold shadow-lg animate-pulse">Unread</span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-300">No unread mails found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UnreadMailBox; 