/* eslint-disable react/prop-types */
import { mailAction } from "../../store/Mail";


function SlideBar({dispatch}) {

 return (
    <div className="bg-gray-300 h-screen w-60">
      
       
        <button onClick={()=> dispatch(mailAction.toggleCompose())} className="left-0 bg-blue-500 rounded-lg font-serif cursor-pointer w-52 h-18 text-xl hover:bg-sky-500 hover:text-white p-2 ml-3 mr-2 mt-3">
          Compose
        </button>
     
      <ul className="mt-4 ml-3">
        <li className="mt-2 cursor-pointer hover:text-blue-500">Inbox</li>
        <li className="mt-2 cursor-pointer hover:text-blue-500">Unread</li>
        <li className="mt-2 cursor-pointer hover:text-blue-500">Starred</li>
        <li className="mt-2 cursor-pointer hover:text-blue-500">Sent</li>
        <li className="mt-2 cursor-pointer hover:text-blue-500">Drafts</li>
        <li className="mt-2 cursor-pointer hover:text-blue-500">Archive</li>
        <li className="mt-2 cursor-pointer hover:text-blue-500">Spam</li>
        <li className="mt-2 cursor-pointer hover:text-blue-500">Deleted Items</li>
      </ul>
       
    </div>
  );
}

export default SlideBar;
