import './MessageCardComponent.css';

const MessageCardComponent = ({ message, isSender }) => {
    return (
        <div className={`message-card ${isSender ? 'sender' : 'receiver'}`}>
            <p>{message.message}</p>
            <span className="timestamp">{new Date(message.timestamp).toLocaleString()}</span>
        </div>
    );
};

export default MessageCardComponent;
