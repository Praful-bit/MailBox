import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import SentMail from "./components/SentMail/SentMail.jsx";
import InputBoxMailContent from "./components/Inbox/InputBoxMailContent.jsx";
import UnreadMailBox from "./components/Inbox/UnreadMailBox.jsx";
import DeletedMails from "./components/Inbox/DeletedMails.jsx";

const router  = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
     <Route path="/inbox" element={<InputBoxMailContent/>}/>
     <Route path ="/sentmail" element={<SentMail/>}/>
     <Route path ="/unread" element={<UnreadMailBox/>}/>
     <Route path ="/deleted" element={<DeletedMails/>}/>
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
     <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
