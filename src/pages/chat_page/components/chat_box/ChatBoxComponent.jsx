import "./ChatBoxComponent.css";
import PropTypes from 'prop-types';
import defaultAvatar from '/src/assets/default_avatar.png';
import SendMessageBoxComponent from './SendMessageBoxComponent';
import { useState, useEffect, useRef } from "react";
import { sendMessageAPI, getMessagesAPI } from "../../../../services/conversationsService";
import MessageCardComponent from './MessageCardComponent';
import { FaSpinner } from "react-icons/fa";

const ChatBoxComponent = ({ selectedUser, users, setUsers, latestMessage }) => {
    const [state, setState] = useState({
        message: '',
        messages: [],
        nextPageNumber: null,
        isLoading: null,
    });

    const loadMessagesSpinner = useRef(null);
    const chatMessagesElem = useRef(null);

    const updateState = (newState) => {
        setState(prev => ({ ...prev, ...newState }));
    };

    const handleSendMessage = async () => {
        const response = await sendMessageAPI(selectedUser.user_id, state.message);
        updateState({ 
            messages: [...state.messages, response],
            message: ''
        });

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
    };

    const fetchMessages = async (pageNumber = null) => {
        const messagesResponse = await getMessagesAPI(selectedUser.user_id, pageNumber);
        const newMessages = messagesResponse.results.reverse();
        
        if (pageNumber) {
            updateState({
                messages: [...newMessages, ...state.messages],
                nextPageNumber: messagesResponse.next,
            });
        } else {
            updateState({
                messages: newMessages,
                nextPageNumber: messagesResponse.next,
                isLoading: false,
            });
        }
    };

    const handleScroll = () => {
        if (chatMessagesElem.current) {
            const firstLoad = state.nextPageNumber == null || state.nextPageNumber == 2;
            console.log('firstLoad:', firstLoad);
            const scrollOptions = {
                top: !firstLoad
                    ? 1000 
                    : chatMessagesElem.current.scrollHeight,
                behavior: !firstLoad ? 'auto' : 'smooth'
            };
            chatMessagesElem.current.scrollTo(scrollOptions);
        }
    };

    // Initial load effect
    useEffect(() => {
        if (!selectedUser) return;
        
        updateState({ message: '', isLoading: true });
        fetchMessages();

        setTimeout(() => {
            if (loadMessagesSpinner.current && state.nextPageNumber != null) {
                loadMessagesSpinner.current.style.display = 'block';
            }
        }, 1000);
    }, [selectedUser]);

    // Scroll effect
    useEffect(() => {
        if (!state.isLoading && chatMessagesElem.current) {
            handleScroll();
        }
    }, [state.messages, selectedUser]);

    // WebSocket message effect
    useEffect(() => {
        if (!latestMessage || !selectedUser) return;
        
        if (latestMessage.sender === selectedUser.user_id || 
            latestMessage.receiver === selectedUser.user_id) {
            updateState({ messages: [...state.messages, latestMessage] });
        }
    }, [latestMessage]);

    // Infinite scroll effect
    useEffect(() => {
        if (!loadMessagesSpinner.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && state.nextPageNumber) {
                    fetchMessages(state.nextPageNumber);
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
    }, [loadMessagesSpinner, state.nextPageNumber]);

    if (!selectedUser) {
        return (
            <div className="chat-box d-flex align-items-center justify-content-center">
                <p className="text-muted">Select a user to start chatting</p>
            </div>
        );
    }

    if (state.isLoading) {
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
                    style={{display: state.nextPageNumber ? 'block' : 'none'}} 
                    ref={loadMessagesSpinner}
                > 
                    <FaSpinner className="spin-anim" /> 
                </div>
                {state.messages.map((message) => (
                    <MessageCardComponent
                        key={message.id}
                        message={message}
                        isSender={message.sender != selectedUser.user_id}
                        selectedUser={selectedUser}
                    />
                ))}
            </div>
            <SendMessageBoxComponent 
                message={state.message} 
                setMessage={(msg) => updateState({ message: msg })} 
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
};

export default ChatBoxComponent;