import "./ChatPage.css";
import ChatSideBarComponent from "./components/ChatSideBarComponent";
import ChatBoxComponent from "./components/ChatBoxComponent";
import { useState, useEffect, useRef } from "react";
import { chatsHistory } from "../../services/conversationsService";
import notifSound from "../../assets/sounds/notification.mp3";

const ChatPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [latestMessage, setLatestMessage] = useState(null);
    const socketRef = useRef(null);
    const audioRef = useRef(new Audio(notifSound));

    useEffect(() => {
        const fetchConversations = async () => {
            const response = await chatsHistory();
            setUsers(response.results);
        };
        fetchConversations();
    }, []);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            return;
        }
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
            // Handle ping messages
            const type = JSON.parse(event.data).type;
            if (type === 'ping') {
                console.log('WebSocket ping received');
                // Send a pong response to the server
                socketRef.current.send(JSON.stringify({
                    type: 'pong',
                    message: 'Pong response'
                }));
                return;
            }
    
            // Handle other message types
            const data = JSON.parse(event.data);
            console.log('WebSocket message received', data);

            // Update latest message state
            setLatestMessage(data); 

            // This is example of data received from the server
            /* {id: 11, sender: 1, message: 'Hola', timestamp: '2024-12-08T11:10:07.361101+00:00'} */
            // Update users state with new message data
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
            
            // Play notification sound
            try {
                audioRef.current.play();
            }
            catch (error) {
                console.error('Audio playback error:', error);
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
    }, []);

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
            />
        </div>
    );
};

export default ChatPage;