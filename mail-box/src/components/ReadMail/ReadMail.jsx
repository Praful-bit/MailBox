/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../../store/Mail";
import { useState } from "react";

function ReadMail({ mailId }) {
  const mailData = useSelector((state) => state.mail.mail);
  const mail = mailData.find((m) => m.id === mailId); // Find the mail with the selected ID
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleBackClick = () => {
    dispatch(mailAction.clearSelectedMail());
  };

  const handleDelete = async (id) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://mail-box-1c3dd-default-rtdb.firebaseio.com/mail/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete mail with id ${id}`);
      }
      dispatch(mailAction.deleteMail({ id }));
    } catch (err) {
      console.error("Error deleting mail:", err);
    } finally {
      setLoading(false); 
      dispatch(mailAction.clearSelectedMail());
    }
  };

  return (
    <div className="flex flex-col h-full justify-center items-center bg-gray-100">
      {mail ? (
        <div className="w-full bg-white shadow-md p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">{mail.email}</h1>
            <button
              onClick={handleBackClick}
              className="text-gray-600 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6"
              >
                <path
                  d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <button
              onClick={() => handleDelete(mail.id)}
              className="text-gray-600 hover:text-gray-800"
              disabled={loading}
            >
              {loading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-6 h-6 animate-spin"
                >
                  <path
                    d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm4.93 11.58a.75.75 0 0 1-.58 1.17H7.65a.75.75 0 0 1-.58-1.17l2.48-3.72a.75.75 0 0 1 1.16 0Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
          <p className="text-gray-700 mb-4 text-lg">{mail.subject}</p>
          <p className="text-gray-600">{mail.plainMessage}</p>
        </div>
      ) : (
        <p className="text-gray-800">No mail selected.</p>
      )}
    </div>
  );
}

export default ReadMail;
