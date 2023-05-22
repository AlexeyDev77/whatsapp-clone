import {useEffect, useState} from "react";
import {store} from "../../store/stroe";
import GreenApiService from "../../services/GreenApiService";
import './Dialog.css'
import userLogo from "../../assets/images/user.png";

const Dialog = () => {
    const [state, setState] = useState(store.getState());
    const [msg, setMsg] = useState('');
    const [allMessage, setAllMessage] = useState([]);
    const [processing, setProcessing] = useState(false);
    const greenApiService = new GreenApiService();

    const handleNotification = () => {
        if (!processing) {
            setProcessing(true);
            greenApiService.getNotification(state.id, state.apiToken)
                .then(res => {
                    if (res !== null) {
                        setAllMessage(state => {
                            if ((state && state.length === 0) || state[state.length-1].body.idMessage !== res.body.idMessage) {
                                return [...state, res];
                            } else {
                                return state;
                            }
                        })
                        greenApiService.deleteNotification(state.id, state.apiToken, res.receiptId)
                            .catch(console.log)
                    }
                })
                .catch(console.log)
            setProcessing(false);
        }
    }

    const sendMessage = () => {
        const data = JSON.stringify({
            "chatId": `${state.selectedPhone}@c.us`,
            "message": msg
        });
        greenApiService.sendMessage(state.id, state.apiToken, data)
            .then(res => {
                setMsg('');
            })
            .catch(console.log)
    }

    const getDataFromMessage = (msg) => {
        const timeNow = new Date(msg.body.timestamp * 1000);
        const data = msg.body.messageData;
        if (msg && /imageMessage|audioMessage|videoMessage/.test(data.typeMessage)) return
        const own = msg && /outgoing/.test(msg.body.typeWebhook);
        const textMsg = (own && !/textMessage/.test(data.typeMessage)) || /reactionMessage|quotedMessage/.test(data.typeMessage) ? data.extendedTextMessageData.text : data.textMessageData.textMessage;

        if (msg.body.senderData.sender.includes(state.selectedPhone) || msg.body.senderData.chatId.includes(state.selectedPhone)) {
            return <div className={`dialog-message ${own ? 'own' : ''}`} key={msg.receiptId}>
                <p>{textMsg}<br/><span>{timeNow.getHours() + ':' + timeNow.getMinutes()}</span></p>
            </div>
        }

    }

    useEffect(() => {
       const intervalId = setInterval(handleNotification, 1000);
       return () => clearInterval(intervalId);
    }, [])

    return (
        <div className="chat-dialog">
            <div className="header">
                <div className="user-img">
                    <img src={userLogo} alt="UserProfile" className="cover"/>
                </div>
                <h4>{state.selectedPhone}</h4>
            </div>
            <div className="dialog">
                {allMessage && allMessage.map(message => {
                    return getDataFromMessage(message)
                })}
            </div>
            <div className="dialog-input">
                <input type="text" placeholder="Введите сообщение" value={msg} onChange={(e) => setMsg(e.target.value)}/>
                <svg xmlns="http://www.w3.org/2000/svg" className="arrow" viewBox="0 0 512 512" onClick={sendMessage}>
                    <path fill="none" stroke="#bbb" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48"
                          d="M268 112l144 144-144 144M392 256H100"/>
                </svg>
            </div>
        </div>
    );
};

export default Dialog;