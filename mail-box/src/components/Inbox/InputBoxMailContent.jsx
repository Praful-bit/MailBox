import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../../store/Mail";

function InputBoxMailContent() {
  const mailData = useSelector((state) => state.mail.mail);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMailData = async () => {
      try {
        const res = await fetch(
          `https://mail-box-1c3dd-default-rtdb.firebaseio.com/mail.json`
        );
        const resDta = await res.json();
        const arr = [];
        for (const key in resDta) {
          arr.push(resDta[key]);
        }
        dispatch(mailAction.getMail(arr));
      } catch (err) {
        console.log(err);
      }
    };
    getMailData();
  }, [dispatch]);

  console.log(mailData);
  return (
    <div className="h-screen bg-gray-100 py-4 px-4 w-full">
      <div className="w-full bg-white p-6 rounded-lg shadow-md">
        {mailData.length > 0 ? (
          mailData.map((data, index) => (
            <div
              key={index}
              className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
            >
              <ul className="list-none flex items-center ">
                <li className="flex-1 text-black">{data.email}</li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-600 mr-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </li>
                <li className="flex-1 text-black">{data.subject}</li>
                <li className="flex-1 text-gray-400">{data.message}</li>
              </ul>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No mails found.</p>
        )}
      </div>
    </div>
  );
}

export default InputBoxMailContent;
