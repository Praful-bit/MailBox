/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { mailAction } from "../../store/Mail";
import { Link, useLocation } from "react-router-dom";
import { authAction } from "../../store/Auth";

function SlideBar({ dispatch }) {
  const getData = useSelector((state) => state.mail.mail);
  const unreadeCount = useSelector((state) => state.mail.unreadeCount);
  const location = useLocation();

  return (
    <div className="bg-gray-800 h-screen w-60 p-4 flex flex-col">
      <button
        onClick={() => dispatch(mailAction.toggleCompose())}
        className="bg-blue-600 rounded-lg font-serif cursor-pointer w-full h-12 text-xl hover:bg-blue-700 hover:text-white p-2 mb-4"
      >
        Compose
      </button>
      <ul className="space-y-2 flex-1">
        <Link to="/inbox">
          <li className="cursor-pointer hover:text-blue-400 rounded-lg bg-gray-700 p-2 text-white flex justify-between items-center">
            Inbox <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">{location.pathname === "/inbox" && getData.length}</span>
          </li>
        </Link>
        <li className="cursor-pointer hover:text-blue-400 rounded-lg bg-gray-700 p-2 flex justify-between text-white">
          Unread <span className="bg-red-400 text-white rounded-full px-2 py-1 text-xs">{location.pathname === "/inbox" && unreadeCount}</span>
        </li>
        <li className="cursor-pointer hover:text-blue-400 rounded-lg bg-gray-700 p-2 text-white">
          Starred
        </li>
        <Link to="/sentmail">
          <li className="cursor-pointer hover:text-blue-400 rounded-lg bg-gray-700 p-2 text-white mt-2">
            Sent
          </li>
        </Link>
        <li className="cursor-pointer hover:text-blue-400 rounded-lg bg-gray-700 p-2 text-white">
          Drafts
        </li>
        <li className="cursor-pointer hover:text-blue-400 rounded-lg bg-gray-700 p-2 text-white">
          Archive
        </li>
        <li className="cursor-pointer hover:text-blue-400 rounded-lg bg-gray-700 p-2 text-white">
          Spam
        </li>
        <li className="cursor-pointer hover:text-blue-400 rounded-lg bg-gray-700 p-2 text-white">
          Deleted Items
        </li>
      </ul>
      <button 
        onClick={() => dispatch(authAction.logout())} 
        className="bg-sky-500 text-white p-2 mt-auto rounded-lg"
      >
        Log-out
      </button>
    </div>
  );
}

export default SlideBar;
