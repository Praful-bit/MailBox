import { useState, useRef } from "react";
import "../../App.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from 'react-redux';
import { mailAction } from "../../store/Mail";
import useSend from "../Hooks/UseSend";


function Home() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.mail.toggle);
  const quillRef = useRef(null);
  const sendMail = useSend()
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const senderEmail = localStorage.getItem('email');
    const url = `https://mail-box-1c3dd-default-rtdb.firebaseio.com/`;
    const editor = quillRef.current.getEditor();
    const plainMessage = editor.getText();
    const replaceSenderMail = senderEmail?.replace(/[@.]/g, "");

    const sendData = { email, subject, plainMessage };
    if (sendData.email !== null) {
      await sendMail(`${url}/${replaceSenderMail}/sent.json`, sendData);
    }

    const receive = { email, subject, plainMessage };
    if (receive) {
      await sendMail(`${url}/mail.json`, receive);
    }

    console.log(email, plainMessage, subject);
    localStorage.setItem('email',email)
    setEmail('');
    setMessage('');
    setSubject('');
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      {!toggle && (
        <form
          className="bg-white p-6 rounded-lg shadow-lg w-full h-full relative"
          onSubmit={handleSubmit}
        >
          <button
            type="button"
            className="absolute top-0 right-0 ml-4 text-xl font-bold"
            onClick={() => dispatch(mailAction.toggleCompose())}
          >
            X
          </button>
          <div className="mb-4">
            <input
              type="email"
              placeholder="To"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <ReactQuill
            ref={quillRef}
            modules={modules}
            theme="snow"
            value={message}
            onChange={setMessage}
            className="w-full p-2 border border-gray-300 rounded-lg h-64"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 absolute bottom-6 left-6"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
}

export default Home;
