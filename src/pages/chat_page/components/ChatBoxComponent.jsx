import "./ChatBoxComponent.css";
import PropTypes from 'prop-types';
import defaultAvatar from '../../../assets/default_avatar.png';
import SendMessageBoxComponent from './SendMessageBoxComponent';
import { useState, useEffect, useRef } from "react";
import { sendMessageAPI, getMessagesAPI } from "../../../services/userService";
import MessageCardComponent from './MessageCardComponent';

const ChatBoxComponent = ({ selectedUser, users, setUsers, latestMessage }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const chatMessagesElem = useRef(null);

    const sendMessage = async () => {
        const response = await sendMessageAPI(selectedUser.user_id, message);
        setMessages([...messages, response]);
        setMessage('');

        // Update the chat list locally
        const updatedUsers = users.map(user => {
            if (user.user_id === selectedUser.user_id) {
                return {
                    ...user,
                    last_message: response.message,
                    timestamp: response.timestamp,
                    unread_count: 0
                };
            }
            return user;
        });

        // Reorder the chat list
        updatedUsers.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setUsers(updatedUsers);
    };

    useEffect(() => {
        if (!selectedUser) return;
        const fetchMessages = async () => {
            const messages = await getMessagesAPI(selectedUser.user_id);
            setMessages(messages);
        };

        fetchMessages();
        setMessage('');
    }, [selectedUser]);

    useEffect(() => {
        if (!chatMessagesElem.current) return;
        chatMessagesElem.current.scrollTop = chatMessagesElem.current.scrollHeight;
    }, [messages]);

    // Add effect to handle new messages from WebSocket
    useEffect(() => {
        if (!latestMessage || !selectedUser) return;
        
        // Check if message belongs to current chat
        if (latestMessage.sender === selectedUser.user_id || latestMessage.receiver === selectedUser.user_id) {
            setMessages(prev => [...prev, latestMessage]);
        }
    }, [latestMessage]);

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
        user_id: PropTypes.number.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string,
        profile_image: PropTypes.string,
    }),
    users: PropTypes.array.isRequired,
    setUsers: PropTypes.func.isRequired,
    latestMessage: PropTypes.object,
};

export default ChatBoxComponent;