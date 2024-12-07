import "./ChatSideBarComponent.css";

import ChatCardComponent from "./ChatCardComponent";
import PropTypes from 'prop-types';

const ChatSideBarComponent = ({ users, onUserSelect, selectedUser }) => {
    return (
        <div className="chat-sidebar">
            <ul className="ul-no-bullets p-0 m-0">
                {users.map((user) => (
                    <ChatCardComponent 
                        key={user.user_id} 
                        user={user}
                        onUserSelect={onUserSelect}
                        selectedUser={selectedUser}
                    />
                ))}
            </ul>
        </div>
    );
};

ChatSideBarComponent.propTypes = {
    users: PropTypes.array.isRequired,
    onUserSelect: PropTypes.func.isRequired,
    selectedUser: PropTypes.object,
};

export default ChatSideBarComponent;