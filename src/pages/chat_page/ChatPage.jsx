import { Container, TabContainer } from "react-bootstrap";
import "./ChatPage.css";
import ChatSideBarComponent from "./components/ChatSideBarComponent";
import ChatBoxComponent from "./components/ChatBoxComponent";
import { useState } from "react";

const ChatPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    return (
        <div className="chat-page-container">
            <ChatSideBarComponent onUserSelect={handleUserSelect} selectedUser={selectedUser} />
            <ChatBoxComponent selectedUser={selectedUser} />
        </div>        
    )
};

export default ChatPage;