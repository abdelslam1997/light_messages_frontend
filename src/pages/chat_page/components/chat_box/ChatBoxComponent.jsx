import "./ChatBoxComponent.css";
import PropTypes from 'prop-types';
import defaultAvatar from '/src/assets/default_avatar.png';
import SendMessageBoxComponent from './SendMessageBoxComponent';
import { useState, useEffect, useRef } from "react";
import { sendMessageAPI, getMessagesAPI } from "../../../../services/conversationsService";
import MessageCardComponent from './MessageCardComponent';
import { FaSpinner } from "react-icons/fa";

const ChatBoxComponent = ({ selectedUser, users, setUsers, latestMessage, lastReadInfo }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [nextPageNumber, setNextPageNumber] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingOldMessages, setIsFetchingOldMessages] = useState(false);

    const loadMessagesSpinner = useRef(null);
    const chatMessagesElem = useRef(null);

    const handleSendMessage = async () => {
        try {
            const response = await sendMessageAPI(selectedUser.user_id, message);
            setMessages(prevMessages => [...prevMessages, response]);
            setMessage('');

            const updatedUsers = users.map(user =>
                user.user_id === selectedUser.user_id
                    ? {
                        ...user,
                        last_message: response.message,
                        timestamp: response.timestamp,
                        unread_count: 0
                    }
                    : user
            ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const fetchMessages = async (pageNumber = null) => {
        try {
            const messagesResponse = await getMessagesAPI(selectedUser.user_id, pageNumber);
            const newMessages = messagesResponse.results.reverse();

            if (pageNumber) {
                setMessages(prevMessages => [...newMessages, ...prevMessages]);
                setNextPageNumber(messagesResponse.next);
            } else {
                setMessages(newMessages);
                setNextPageNumber(messagesResponse.next);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!selectedUser) return;

        setMessage('');
        setIsLoading(true);
        fetchMessages();

        const timeoutId = setTimeout(() => {
            if (loadMessagesSpinner.current && nextPageNumber != null) {
                loadMessagesSpinner.current.style.display = 'block';
            }
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [selectedUser]);

    useEffect(() => {
        if (!isLoading && chatMessagesElem.current) {
            const scrollToEnd = !isFetchingOldMessages;
            const scrollOptions = {
                top: scrollToEnd ?  chatMessagesElem.current.scrollHeight : 1000,
                behavior: 'smooth'
            };
            chatMessagesElem.current.scrollTo(scrollOptions);
            setIsFetchingOldMessages(false);
        }
    }, [messages]);

    useEffect(() => {
        if (!latestMessage || !selectedUser) return;

        if (
            latestMessage.sender === selectedUser.user_id ||
            latestMessage.receiver === selectedUser.user_id
        ) {
            setMessages(prevMessages => [...prevMessages, latestMessage]);
        }
    }, [latestMessage]);

    useEffect(() => {
        if (!loadMessagesSpinner.current) return;

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && nextPageNumber) {
                    setIsFetchingOldMessages(true);
                    fetchMessages(nextPageNumber);
                }
            },
            {
                root: null,
                threshold: 0.1,
                rootMargin: '20px'
            }
        );

        observer.observe(loadMessagesSpinner.current);
        return () => observer.disconnect();
    }, [nextPageNumber]);

    useEffect(() => {
        if (!lastReadInfo || !selectedUser) return;

        const updatedMessages = messages.map(msg =>
            msg.id <= lastReadInfo.last_read_message_id
                ? { ...msg, read: true }
                : msg
        );

        setMessages(updatedMessages);
    }, [lastReadInfo]);

    if (!selectedUser) {
        return (
            <div className="chat-box d-flex align-items-center justify-content-center">
                <p className="text-muted">Select a user to start chatting</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="chat-box d-flex align-items-center justify-content-center">
                <FaSpinner className="spin-anim" />
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
                <div 
                    className="text-center load-messages-spinner text-muted" 
                    style={{display: nextPageNumber ? 'block' : 'none'}} 
                    ref={loadMessagesSpinner}
                > 
                    <FaSpinner className="spin-anim" /> 
                </div>
                {messages.map((message) => (
                    <MessageCardComponent
                        key={message.id}
                        message={message}
                        isSender={message.sender != selectedUser.user_id}
                        selectedUser={selectedUser}
                    />
                ))}
            </div>
            <SendMessageBoxComponent 
                message={message} 
                setMessage={setMessage} 
                sendMessage={handleSendMessage} 
            />
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
    updateMessagesReadStatus: PropTypes.func,
};

export default ChatBoxComponent;