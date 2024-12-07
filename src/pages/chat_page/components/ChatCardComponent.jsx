import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import defaultAvatar from '../../../assets/default_avatar.png';
import './ChatCardComponent.css';

const ChatCardComponent = ({ user, onUserSelect, selectedUser }) => {

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const handleUserSelect = (user) => {
        onUserSelect(user);
        // Clear unread_count when user clicks on the chat
        user.unread_count = 0;
    };

    return (
        <Card 
            className={"my-0 shadow-sm hover-shadow transition-all" + (selectedUser && selectedUser.user_id === user.user_id ? ' selected' : '')}
            onClick={() => handleUserSelect(user)}
            style={{ cursor: 'pointer' }}
        >
            <div className="position-relative">
                {user.unread_count > 0 && (
                    <span className="badge bg-danger rounded-circle position-absolute top-0 end-0">
                        {user.unread_count}
                    </span>
                )}
                <Card.Body className="d-flex align-items-center">
                    <div className="mx-1">
                        <img
                            src={user.profile_image || defaultAvatar}
                            alt={`${user.first_name}`}
                            className="rounded-circle"
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                            onError={(e) => {e.target.src = defaultAvatar}}
                        />
                    </div>
                    <div className="flex-grow-1 mx-1">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="mb-1">{user.first_name}</h5>
                            <small className="text-muted">
                                {formatDate(user.timestamp)}
                            </small>
                        </div>
                        <p className="mb-0 text-muted">
                            <small>{user.last_message}</small>
                        </p>
                    </div>
                </Card.Body>
            </div>
        </Card>
    );
};

ChatCardComponent.propTypes = {
    user: PropTypes.shape({
        user_id: PropTypes.number.isRequired,
        first_name: PropTypes.string.isRequired,
        profile_image: PropTypes.string,
        last_message: PropTypes.string.isRequired,
        timestamp: PropTypes.string.isRequired,
        unread_count: PropTypes.number.isRequired,
    }).isRequired,
    onUserSelect: PropTypes.func.isRequired,
    selectedUser: PropTypes.object
};

export default ChatCardComponent;