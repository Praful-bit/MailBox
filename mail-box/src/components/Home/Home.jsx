import { useState, useRef } from "react";
import "../../App.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from 'react-redux';
import { mailAction } from "../../store/Mail";
import useSend from "../Hooks/UseSend";
import emailjs from '@emailjs/browser';

function Home() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.mail.toggle);
  const quillRef = useRef(null);
  const sendMail = useSend();

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

    const url = `https://mail-box-1c3dd-default-rtdb.firebaseio.com`;
    const editor = quillRef.current.getEditor();
    const plainMessage = editor.getText(); // plain text
    const htmlMessage = message; // html version

    const localEmail = localStorage.getItem("email");

    const sendData = {
      senderEmail: localEmail,
      receiverEmail: email,
      subject,
      body: plainMessage,
      html: htmlMessage,
    };

    // Save to database (sent)
    await sendMail(`${url}/sent.json`, sendData);

    // Save to database (inbox/received)
    await sendMail(`${url}/inbox.json`, sendData);

    // Send real email using EmailJS
    try {
      await emailjs.send(
        'service_filu7dj',         // ✅ your service ID
        'template_v0qjphs',        // ✅ your template ID
        {
          from_email: localStorage.getItem("email"),
          to_email: email,
          subject: subject,
          message: plainMessage,
        },
        'PUItYeZCzAGj5KrKp'         // ✅ your public key (user ID)
      );
      console.log("Email sent successfully");
    } catch (err) {
      console.error("EmailJS error:", err);
    }

    // Reset form
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen p-4 md:p-8 overflow-auto bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-700">
      {!toggle && (
        <form
          className="w-full max-w-4xl bg-white/70 dark:bg-gray-900/80 rounded-2xl shadow-2xl p-4 md:p-8 flex flex-col justify-center relative border border-white/30 dark:border-gray-700/40 backdrop-blur-xl"
          onSubmit={handleSubmit}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 md:px-6 py-4 rounded-t-2xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-400 shadow-md">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide select-none">Compose Mail</h2>
            <button
              type="button"
              className="text-white text-2xl md:text-3xl hover:bg-white/20 rounded-full p-2 transition"
              onClick={() => dispatch(mailAction.toggleCompose())}
              aria-label="Close"
            >
              X
            </button>
          </div>

          {/* Inputs */}
          <div className="py-6 px-4 md:px-6 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <div className="flex-1">
                <label className="block mb-2 text-gray-700 dark:text-gray-300 text-sm font-medium">To</label>
                <input
                  type="email"
                  placeholder="Recipient's email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-400 outline-none transition text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block mb-2 text-gray-700 dark:text-gray-300 text-sm font-medium">Subject</label>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-400 outline-none transition text-base"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block mb-2 text-gray-700 dark:text-gray-300 text-sm font-medium">Message</label>
              <div className="h-72 overflow-hidden border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800">
                <ReactQuill
                  ref={quillRef}
                  modules={modules}
                  theme="snow"
                  value={message}
                  onChange={setMessage}
                  className="h-full"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full md:w-1/3 mx-auto py-3 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold text-lg md:text-xl shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            >
              Send
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Home;
