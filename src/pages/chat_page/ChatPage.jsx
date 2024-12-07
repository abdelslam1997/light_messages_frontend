import { Container, TabContainer } from "react-bootstrap";
import "./ChatPage.css";
import ChatSideBarComponent from "./components/ChatSideBarComponent";
import ChatBoxComponent from "./components/ChatBoxComponent";
import { useState, useEffect } from "react";
import { chatsHistory } from "../../services/userService";

const ChatPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await chatsHistory();
            setUsers(response.results);
        };
        fetchUsers();
    }, []);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

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
            />
        </div>
    );
};

export default ChatPage;