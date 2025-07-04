import { useSelector } from "react-redux";
import "./App.css";
import Login from "./components/Auth/Login";
import Inbox from './components/Inbox/Inbox'

function App() {
  const auth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      {!auth && <Login />}
      {auth &&       
          <div>
            <Inbox />
          </div>
       
      }
    </>
  );
}

export default App;
