import { useState, useRef } from "react";
import "../../App.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Home() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
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
  const handleSubmit = (event) => {
    event.preventDefault();

    // Get the plain text from the editor
    const editor = quillRef.current.getEditor();
    const plainMessage = editor.getText(); // This gets the plain text without any HTML tags

    console.log(email, plainMessage, subject);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full h-full relative"
        onSubmit={handleSubmit}
      >
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
      </form>
    </div>
  );
}

export default Home;
