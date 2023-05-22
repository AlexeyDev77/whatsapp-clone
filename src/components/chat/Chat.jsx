import {useState} from 'react';
import Contacts from "../contacts/Contacts";
import Dialog from "../dialog/Dialog";
import PhoneAdd from "../phoneAdd/PhoneAdd";
import {store} from "../../store/stroe";
import './Chat.css'

const Chat = () => {
    const [state, setState] = useState(store.getState())
    const [selectedPhone, setSelectedPhone] = useState(state.selectedPhone);

    return (
        <div className="chat">
            {selectedPhone ?
                <>
                    <Contacts />
                    <Dialog />
                </>
                :
                <PhoneAdd setSelectedPhone={setSelectedPhone}/>
            }
        </div>
    );
};

export default Chat;