import "./ChatSideBarComponent.css";
import { useState } from 'react';
import NewConversationModal from './NewConversationModal';
import { useTranslation } from 'react-i18next';
import ChatCardComponent from "./ChatCardComponent";
import PropTypes from 'prop-types';
import { FaPlus } from "react-icons/fa";

const ChatSideBarComponent = ({ users, onUserSelect, selectedUser, setUsers }) => {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);

    const handleStartConversation = (newUser) => {
        setUsers(prevUsers => [newUser, ...prevUsers]);
        onUserSelect(newUser);
    };

    return (
        <div className="chat-sidebar">
            <button 
                className="btn btn-outline-dark w-100 my-2"
                onClick={() => setShowModal(true)}
            >
                {t('add_new_conversation')} <FaPlus />
            </button>
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
            <NewConversationModal 
                show={showModal} 
                onHide={() => setShowModal(false)} 
                onStartConversation={handleStartConversation}
            />
        </div>
    );
};

ChatSideBarComponent.propTypes = {
    users: PropTypes.array.isRequired,
    onUserSelect: PropTypes.func.isRequired,
    selectedUser: PropTypes.object,
};

export default ChatSideBarComponent;