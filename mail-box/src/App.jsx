import { useSelector } from "react-redux";
import "./App.css";
import Login from "./components/Auth/Login";
import { Outlet } from "react-router-dom";
import InputSearch from "./components/Inbox/InputSearch";
function App() {
  const auth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      {!auth && <Login />}
      {auth && (
        <div>
          <InputSearch/>
          <Outlet />
        </div>
      )}
    </>
  );
}

export default App;
