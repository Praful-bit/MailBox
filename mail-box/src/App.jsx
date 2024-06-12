
import { useSelector } from 'react-redux'
import './App.css'
import Login from './components/Auth/Login'
import Home from './components/Home/Home'


function App() {
  const auth = useSelector((state)=> state.auth.isAuthenticated)
  
  return (
 <>
{!auth && <Login/>}
{auth &&
<Home/>
}
 </>
  )
}

export default App
