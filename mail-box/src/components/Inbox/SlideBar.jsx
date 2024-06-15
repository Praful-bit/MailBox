/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { mailAction } from "../../store/Mail";

function SlideBar({ dispatch }) {
  const getData = useSelector((state) => state.mail.mail);
  const  unreadeCount = useSelector((state)=>state.mail. unreadeCount)
  return (
    <div className="bg-gray-800 h-screen w-60 p-4">
      <button
        onClick={() => dispatch(mailAction.toggleCompose())}
        className="bg-blue-600 rounded-lg font-serif cursor-pointer w-full h-12 text-xl hover:bg-blue-700 hover:text-white p-2 mb-4"
      >
        Compose
      </button>
      <ul className="space-y-2">
        <li className="cursor-pointer hover:text-blue-400 rounded-lg bg-gray-700 p-2 text-white flex justify-between items-center">
          Inbox <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">{getData.length}</span>
        </li>
        <li className="cursor-pointer hover:text-blue-400 rounded-lg bg-gray-700 p-2 text-white">
          Unread <span className="bg-red-400 text-white rounded-full px-2 py-1 text-xs">{ unreadeCount}</span>
        </li>
        <li className="cursor-pointer hover:text-blue-400 rounded-lg bg-gray-700 p-2 text-white">
          Starred
        </li>
        <li className="cursor-pointer hover:text-blue-400 rounded-lg bg-gray-700 p-2 text-white">
          Sent
        </li>
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
    </div>
  );
}

export default SlideBar;
