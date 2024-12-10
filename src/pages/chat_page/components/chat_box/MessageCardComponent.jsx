import './MessageCardComponent.css';
import defaultAvatar from '/src/assets/default_avatar.png';
import { useUser } from '../../../../contexts/UserContext';


const MessageCardComponent = ({ message, isSender, selectedUser }) => {
    // Get the current user
    const { user } = useUser();
    const user_profile_image = user.profile_image || defaultAvatar;
    
    // Determine the profile image
    const profileImage = isSender ? user_profile_image : (selectedUser.profile_image || defaultAvatar);

    // Determine the status icon
    const statusIcon = message.read ? '✓✓' : '✓'; // Replace with actual icons or use an icon library

    return (
        <div className={`message-card ${isSender ? 'sender' : 'receiver'}`}>
            <img src={profileImage} alt="Profile" className="message-avatar" />
            <div className="message-content">
                <p>{message.message}</p>
                <div className="message-info">
                    <span className="timestamp">{new Date(message.timestamp).toLocaleString()}</span>
                    {isSender && <span className={`status-icon ${message.read ? 'read' : 'sent'}`}>{statusIcon}</span> }
                </div>
            </div>
        </div>
    );
};

export default MessageCardComponent;
