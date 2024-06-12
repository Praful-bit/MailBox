
import { useSelector } from 'react-redux'
import './App.css'
import Login from './components/Auth/Login'


function App() {
  const auth = useSelector((state)=> state.auth.isAuthenticated)
  
  return (
 <>
{auth && <Login/>}
 </>
  )
}

export default App
