import { FaPaperPlane } from "react-icons/fa";
import './SendMessageBoxComponent.css';

const SendMessageBoxComponent = ({ message, setMessage, sendMessage }) => {
    return (
        <div className="send-message-box d-flex align-items-center">
            <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() } }
            />
            <button
                className="btn btn-sm btn-primary mx-1"
                onClick={sendMessage}
            >
                <FaPaperPlane />
            </button>
        </div>
    );
}

export default SendMessageBoxComponent;