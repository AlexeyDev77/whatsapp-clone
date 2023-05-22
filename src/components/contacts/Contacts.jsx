import {useState} from "react";
import {store} from "../../store/stroe";
import './Contacts.css'
import userLogo from "../../assets/images/user.png";

const Contacts = () => {
    const [state, setState] = useState(store.getState());

    return (
        <div className="chat-list">
            <div className="header">
                <div className="user-img">
                    <img src={userLogo} alt="UserProfile" className="cover"/>
                </div>
            </div>
            <div className="chat-search">
                <div>
                    <input type="text" placeholder="Поиск"/>
                </div>
            </div>
            <div className="list">
                <div className="list-block active">
                    <div className="img-block">
                        <img src={userLogo} alt="Contact" className="cover"/>
                    </div>
                    <div className="info">
                        <div className="info-name">
                            <h4>{state.selectedPhone}</h4>
                            {/*<p className="time">10:10</p>*/}
                        </div>
                        <div className="info-message">
                            {/*<p>Тестовое сообщение - заглушка</p>*/}
                        </div>
                    </div>
                </div>
                {/*<div className="list-block add">*/}
                {/*    <p>Добавить чат</p>*/}
                {/*</div>*/}
                {/*<div className="list-block unread">*/}
                {/*    <div className="img-block">*/}
                {/*        <img src={userLogo} alt="Contact" className="cover"/>*/}
                {/*    </div>*/}
                {/*    <div className="info">*/}
                {/*        <div className="info-name">*/}
                {/*            <h4>Михаил</h4>*/}
                {/*            <p className="time">11:11</p>*/}
                {/*        </div>*/}
                {/*        <div className="info-message">*/}
                {/*            <p>Тестовое сообщение #2- заглушка</p>*/}
                {/*            <b>1</b>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default Contacts;