import "./ChatBoxComponent.css";
import PropTypes from 'prop-types';
import defaultAvatar from '../../../assets/default_avatar.png';
import SendMessageBoxComponent from './SendMessageBoxComponent';
import { useState, useEffect, useRef } from "react";
import { sendMessageAPI, getMessagesAPI } from "../../../services/userService";
import MessageCardComponent from './MessageCardComponent';

const ChatBoxComponent = ({ selectedUser }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const chatMessagesElem = useRef(null);

    const sendMessage = async () => {
        // Send message to the selected user
        // alert(`Sending message: ${message}`);
        const response = await sendMessageAPI(selectedUser.user_id, message);
        // feed response to messages
        setMessages([...messages, response]);
        setMessage('');
    };

    useEffect( () => {
        // Fetch chat messages for the selected user
        if (!selectedUser) return;
        const fetchMessages = async () => {
            const messages = await getMessagesAPI(selectedUser.user_id);
            console.log('Messages:', messages);
            setMessages(messages);
        };

        fetchMessages();

        // Clear the message box when a new user is selected
        setMessage('');
    }, [selectedUser]);

    useEffect(() => {
        if (!chatMessagesElem.current) return;
        chatMessagesElem.current.scrollTop = chatMessagesElem.current.scrollHeight;
    }, [messages]);

    if (!selectedUser) {
        return (
            <div className="chat-box d-flex align-items-center justify-content-center">
                <p className="text-muted">Select a user to start chatting</p>
            </div>
        );
    }

    return (
        <div className="chat-box">
            <div className="chat-header d-flex align-items-center p-3 border-bottom">
                <img
                    src={selectedUser.profile_image || defaultAvatar}
                    alt={`${selectedUser.first_name} ${selectedUser.last_name}`}
                    className="rounded-circle mx-2"
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    onError={(e) => {e.target.src = defaultAvatar}}
                />
                <h5 className="mb-0">
                    {selectedUser.first_name} {selectedUser.last_name}
                </h5>
            </div>
            <div className="chat-messages p-3" ref={chatMessagesElem}>
                {messages.map((message) => (
                    <MessageCardComponent
                        key={message.id}
                        message={message}
                        isSender={message.sender != selectedUser.user_id}
                    />
                ))}
            </div>
            <SendMessageBoxComponent message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    );
};

ChatBoxComponent.propTypes = {
    selectedUser: PropTypes.shape({
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string,
        profile_image: PropTypes.string
    })
};

export default ChatBoxComponent;