/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { mailAction } from "../../store/Mail";
import { Link, useLocation } from "react-router-dom";

function SlideBar({ dispatch }) {
  const getData = useSelector((state) => state.mail.mail);
  const unreadeCount = useSelector((state) => state.mail.unreadeCount);
  const location = useLocation();

  return (
    <aside className="w-full lg:w-64 h-full lg:h-screen bg-white/60 dark:bg-gray-900/70 backdrop-blur-lg shadow-2xl border-r border-white/30 dark:border-gray-700/40 px-4 py-6 flex-shrink-0 lg:sticky top-0 overflow-y-auto">
      {/* User avatar */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl font-bold select-none">U</span>
        </div>
        <span className="mt-2 text-gray-700 dark:text-gray-200 font-semibold text-lg">User</span>
      </div>

      {/* Compose Button */}
      <button
        onClick={() => dispatch(mailAction.toggleCompose())}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg px-6 py-3 text-lg font-semibold mb-8 hover:scale-105 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Compose
      </button>

      {/* Navigation */}
      <nav className="w-full">
        <ul className="space-y-2">
          {[
            {
              path: "/inbox",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              ),
              label: "Inbox",
              count: getData.length,
              highlight: true,
            },
            {
              path: "/unread",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405M18 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341A6.002 6.002 0 006 12v2.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              ),
              label: "Unread",
              count: unreadeCount,
              highlight: false,
            },
            {
              path: "/sentmail",
              icon: (
                <>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h-6a2 2 0 00-2 2v4a2 2 0 002 2h6a2 2 0 002-2V5a2 2 0 00-2-2z" />
                </>
              ),
              label: "Sent",
              highlight: true,
            },
            {
              path: "/deleted",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2H8a2 2 0 00-2 2v12z" />
              ),
              label: "Deleted Items",
              highlight: false,
            },
          ].map(({ path, icon, label, count, highlight }) => (
            <Link key={path} to={path}>
              <li
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  location.pathname === path
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "hover:bg-blue-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  {icon}
                </svg>
                {label}
                {typeof count === "number" && (
                  <span
                    className={`ml-auto rounded-full px-2 py-0.5 text-xs font-bold ${
                      highlight
                        ? "bg-blue-500 text-white"
                        : "bg-red-400 text-white"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </li>
            </Link>
          ))}

          {/* Static Items */}
          {[
            {
              label: "Starred",
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />,
            },
            {
              label: "Drafts",
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v4a1 1 0 001 1h3m10-5h3a1 1 0 011 1v4m-1 4v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2m16-4V7a2 2 0 00-2-2H5a2 2 0 00-2 2v4m16 0a2 2 0 01-2 2H5a2 2 0 01-2-2" />,
            },
            {
              label: "Archive",
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />,
            },
            {
              label: "Spam",
              icon: <path strokeLinecap="round" strokeLinejoin="round" d="M19 13H5v-2h14v2z" />,
            },
          ].map(({ label, icon }) => (
            <li
              key={label}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {icon}
              </svg>
              {label}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default SlideBar;
