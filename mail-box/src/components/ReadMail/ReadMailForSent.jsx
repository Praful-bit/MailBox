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
    <div>
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
          </div>
          <p className="text-gray-700 mb-4 text-lg">{mail.subject}</p>
          <p className="text-gray-600">{mail.message}</p>
        </div>
      ) : (
        <p className="text-gray-800">No mail selected.</p>
      )}
    </div>
    </div>
  )
}

export default ReadMailForSent