import "./ChatSideBarComponent.css";

import { listUsers, chatsHistory } from "../../../services/userService";
import { useEffect, useState } from "react";
import ChatCardComponent from "./ChatCardComponent";
import PropTypes from 'prop-types';

const ChatSideBarComponent = ({ onUserSelect, selectedUser }) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await listUsers();
            setUsers(users);
        };

        fetchUsers();
    }, []);

    return (
        <div className="chat-sidebar">
            <ul className="ul-no-bullets p-0 m-0">
                {users.map((user) => (
                    <ChatCardComponent 
                        key={user.id} 
                        user={user}
                        onUserSelect={onUserSelect}
                        selectedUser={selectedUser}
                    />
                ))}
            </ul>
        </div>
    )
};

ChatSideBarComponent.propTypes = {
    onUserSelect: PropTypes.func.isRequired
};

export default ChatSideBarComponent;