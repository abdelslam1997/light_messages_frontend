import { FaPaperPlane } from "react-icons/fa";
import './SendMessageBoxComponent.css';
import { useTranslation } from 'react-i18next';

const SendMessageBoxComponent = ({ message, setMessage, sendMessage }) => {
    const { t } = useTranslation();

    return (
        <div className="send-message-box d-flex align-items-center">
            <input
                type="text"
                className="form-control form-control-sm"
                placeholder={t("type_message")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() } }
            />
            <button
                className="btn btn-sm btn-dark mx-1"
                onClick={sendMessage}
            >
                <FaPaperPlane />
            </button>
        </div>
    );
}

export default SendMessageBoxComponent;