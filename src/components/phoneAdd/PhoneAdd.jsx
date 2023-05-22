import {useState} from "react";
import {useDispatch} from "react-redux";
import './PhoneAdd.css'

const PhoneAdd = ({setSelectedPhone}) => {
    const [phone, setPhone] = useState('');
    const dispatch = useDispatch();

    const handleAddPhone = () => {
        setSelectedPhone(phone);
        let selectedPhone = phone
        if (selectedPhone.slice(0,2) === '+7') {
            selectedPhone = selectedPhone.replace('+7', '7');
        } else if (selectedPhone[0] === '8') {
            selectedPhone = selectedPhone.replace('8', '7');
        }
        dispatch({type: "SET_SELECTED_PHONE", payload: selectedPhone});
    }

    return (
        <div className="overlay">
            <div className="phone-modal">
                <h3>Введите номер телефона для создания чата с пользователем</h3>
                <label htmlFor="phone">Телефон:</label>
                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон"/>
                <button onClick={handleAddPhone}>Добавить</button>
            </div>
        </div>
    );
};

export default PhoneAdd;