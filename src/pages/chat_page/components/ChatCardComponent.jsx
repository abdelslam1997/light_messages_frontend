import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import defaultAvatar from '../../../assets/default_avatar.png';
import './ChatCardComponent.css';

const ChatCardComponent = ({ user }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Card className="my-0 shadow-sm hover-shadow transition-all">
            <Card.Body className="d-flex align-items-center">
                <div className="me-3">
                    <img
                        src={user.profile_image || defaultAvatar}
                        alt={`${user.first_name} ${user.last_name}`}
                        className="rounded-circle"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        onError={(e) => {e.target.src = defaultAvatar}}
                    />
                </div>
                <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-1">{`${user.first_name} ${user.last_name}`}</h5>
                        <small className="text-muted">
                            Joined {formatDate(user.date_joined)}
                        </small>
                    </div>
                    <p className="mb-0 text-muted">
                        <small>{user.email}</small>
                    </p>
                </div>
            </Card.Body>
        </Card>
    );
};

ChatCardComponent.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        date_joined: PropTypes.string.isRequired,
        profile_image: PropTypes.string
    }).isRequired
};

export default ChatCardComponent;