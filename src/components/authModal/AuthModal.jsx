import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import GreenApiService from "../../services/GreenApiService";
import './AuthModal.css'

const AuthModal = ({setIsLogged}) => {
    const dispatch = useDispatch();
    const {id, apiToken} = useSelector(state => state);
    const [error, setError] = useState(false);
    const greenApiService = new GreenApiService();
    const handleIdChange = (event) => {
        dispatch({type: "SET_ID", payload: event.target.value})
    };

    const handleTokenChange = (event) => {
        dispatch({type: "SET_TOKEN", payload: event.target.value})
    };

    const handleLogin = () => {
        console.log("idInstance:", id);
        console.log("token:", apiToken);
        greenApiService.getInstanceStatus(id, apiToken)
            .then(res => {
                setIsLogged(true);
            })
            .catch((err) => {
                setError(true);
            })
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Авторизация</h2>
                <label htmlFor="id">ID:</label>
                <input type="text" id="id" value={id} onChange={handleIdChange}/>
                <br/>
                <label htmlFor="token">Token:</label>
                <input
                    type="password"
                    id="token"
                    value={apiToken}
                    onChange={handleTokenChange}
                />
                <br/>
                <button onClick={handleLogin}>Войти</button>
                {error && <p className="errorMessage">Неверный id или token</p>}
            </div>
        </div>
    )
};

export default AuthModal;