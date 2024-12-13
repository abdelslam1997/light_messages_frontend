import "./ChatPage.css";
import ChatSideBarComponent from "./components/chat_side_bar/ChatSideBarComponent";
import ChatBoxComponent from "./components/chat_box/ChatBoxComponent";
import { useState, useEffect, useRef } from "react";
import { chatsHistory } from "../../services/conversationsService";
import notifSound from "../../assets/sounds/notification.mp3";

const ChatPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [latestMessage, setLatestMessage] = useState(null);
    const socketRef = useRef(null);
    const audioRef = useRef(new Audio(notifSound));
    const [lastReadInfo, setLastReadInfo] = useState(null);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await chatsHistory();
                setUsers(response.results);
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        };
        fetchConversations();
    }, []);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) return;

        // Create WebSocket connection
        const wsUrl = `${process.env.REACT_APP_WEBSOCKET_URL}/messages/?token=${token}`;
        socketRef.current = new WebSocket(wsUrl);
        
        socketRef.current.onopen = () => {
            console.log('WebSocket connected');
            // Send a test message to verify connection
            socketRef.current.send(JSON.stringify({
                type: 'connection_test',
                message: 'Hello Server!'
            }));
        };

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const type = data.type;

            if (type === 'ping') {
                console.log('WebSocket ping received');
                // Send a pong response to the server
                socketRef.current.send(JSON.stringify({
                    type: 'pong',
                    message: 'Pong response'
                }));
                return;
            }
            else if (type === 'read_message') {
                const messageData = data.message;
                console.log('Read message data:', messageData);
                if (selectedUser && messageData.reader_id === selectedUser.user_id) {
                    console.log('Updating last read info:', messageData);
                    setLastReadInfo(messageData);  // Just pass the entire message data
                }
            }
            else if (type === 'new_message') {
                const data = JSON.parse(event.data).message;
                console.log('WebSocket new_message received', data);
                // Update latest message state
                setLatestMessage(data); 
                setUsers(prevUsers => {
                    // Find and update the user that received/sent the message
                    const updatedUsers = prevUsers.map(user => {
                        if (user.user_id === data.sender) {
                            return {
                                ...user,
                                last_message: data.message,
                                timestamp: data.timestamp,
                                unread_count: user.unread_count + 1
                            };
                        }
                        return user;
                    });
                    // Sort users by timestamp
                    return updatedUsers.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                });
                try {
                    audioRef.current.play();
                }
                catch (error) {
                    console.error('Audio playback error:', error);
                }
            }
        };

        socketRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socketRef.current.onclose = () => {
            console.log('WebSocket closed');
        };

        // Cleanup on component unmount
        return () => {
            if (socketRef.current && socketRef.current.readyState !== WebSocket.CLOSED) {
                socketRef.current.close(1000, 'Component unmounted');
            }
        };        
    }, [selectedUser]);

    return (
        <div className="chat-page-container">
            <ChatSideBarComponent 
                users={users}
                onUserSelect={handleUserSelect}
                selectedUser={selectedUser}
            />
            <ChatBoxComponent 
                selectedUser={selectedUser}
                users={users}
                setUsers={setUsers}
                latestMessage={latestMessage}
                lastReadInfo={lastReadInfo}  // Pass lastReadInfo directly
            />
        </div>
    );
};

export default ChatPage;