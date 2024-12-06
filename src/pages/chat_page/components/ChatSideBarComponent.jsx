import "./ChatSideBarComponent.css";

import { listUsers } from "../../../services/userService";
import { useEffect, useState } from "react";
import ChatCardComponent from "./ChatCardComponent";

const ChatSideBarComponent = () => {

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
                    <ChatCardComponent key={user.id} user={user} />
                ))}
            </ul>
        </div>
    )
};

export default ChatSideBarComponent;