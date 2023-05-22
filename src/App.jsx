import {useState} from "react";
import AuthModal from "./components/authModal/AuthModal";
import Chat from "./components/chat/Chat";
import './App.css';

const App = () => {
  const [isLogged, setIsLogged] = useState(false)

  return (
    <div className="App">
        {!isLogged && <AuthModal setIsLogged={setIsLogged} />}
        {isLogged && <Chat/>}
    </div>
  )
}

export default App;