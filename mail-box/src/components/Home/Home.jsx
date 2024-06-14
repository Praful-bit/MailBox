// Home.jsx
import { useState, useRef } from "react";
import "../../App.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from 'react-redux';
import { mailAction } from "../../store/Mail";


function Home() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.mail.mail);
  const toggle = useSelector((state)=>state.mail.toggle)
  console.log(data);
  const quillRef = useRef(null);
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],

    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  const module = {
    toolbar: toolbarOptions,
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get the plain text from the editor
    const editor = quillRef.current.getEditor();
    const plainMessage = editor.getText(); // This gets the plain text without any HTML tags
    try {
      const res = await fetch(`https://mail-box-1c3dd-default-rtdb.firebaseio.com/mail.json`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          subject: subject,
          message: plainMessage
        }),
        headers: {
          "Content-type": "application/json"
        }
      });
      const resData = await res.json();
      console.log(resData);
      dispatch(mailAction.addMail(resData));
    } catch (err) {
      console.log("In MailBox Means Text Editor", err);
    }

    console.log(email, plainMessage, subject);
    setEmail('');
    setMessage('');
    setSubject('');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      
    {!toggle && <form
        className="bg-white p-6 rounded-lg shadow-lg w-full h-full relative"
        onSubmit={handleSubmit}
      >
        
      <button className="absolute top-0 right-0 ml-4 text-xl font-bold " onClick={()=> dispatch(mailAction.toggleCompose())}>X</button>
      
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
        <div className="mb-4">
          <ReactQuill
            ref={quillRef}
            modules={module}
            theme="snow"
            value={message}
            onChange={setMessage}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 absolute bottom-6 left-6"
        >
          Send
        </button>
      </form>}
    </div>
  );
}

export default Home;
