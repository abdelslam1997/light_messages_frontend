import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form, ListGroup, Image } from 'react-bootstrap';
import { searchUsers } from '../../../../services/userService';
import { sendMessageAPI } from '../../../../services/conversationsService';
import defaultAvatar from '/src/assets/default_avatar.png';
import './NewConversationModal.css';
import { FaSearch, FaSmile } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const NewConversationModal = ({ show, onHide, onStartConversation }) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isSearchClicked, setIsSearchClicked] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const results = await searchUsers(searchTerm);
            setIsSearchClicked(true);
            setSearchResults(results.results);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    const handleStartConversation = async () => {
        try {
            const new_msg_txt = t('new_conversation_message');
            const response = await sendMessageAPI(selectedUser.id, new_msg_txt);
            onStartConversation({
                user_id: selectedUser.id,
                first_name: selectedUser.first_name,
                last_name: selectedUser.last_name,
                profile_image: selectedUser.profile_image,
                last_message: new_msg_txt,
                timestamp: response.timestamp,
                unread_count: 0
            });
            handleOnHide();
        } catch (error) {
            console.error('Error starting conversation:', error);
        }
    };

    const handleOnHide = () => {
        setSearchTerm('');
        setSearchResults([]);
        setSelectedUser(null);
        setIsSearchClicked(false);
        onHide();
    };

    return (
        <Modal show={show} onHide={handleOnHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t('add_new_conversation')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSearch}>
                    <Form.Control
                        type="text"
                        placeholder={t('search_users_by_mail')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="outline-dark" type="submit" className="mt-2 w-100">
                        <FaSearch className="mx-2" /> {t('search')}
                    </Button>
                </Form>
                {isSearchClicked && searchResults.length === 0 && (
                    <div className="text-start text-danger mt-3">
                        {t('no_results_found')}
                    </div>
                )}
                <ListGroup className="mt-3">
                    {searchResults.map(user => (
                        <ListGroup.Item
                            key={user.id}
                            action
                            active={selectedUser && selectedUser.id === user.id}
                            onClick={() => setSelectedUser(user)}
                        >
                            <div className="d-flex align-items-center">
                                <Image
                                    src={user.profile_image || defaultAvatar}
                                    roundedCircle
                                    width={40}
                                    height={40}
                                    onError={(e) => { e.target.src = defaultAvatar; }}
                                />
                                <div className="ms-2">
                                    {user.first_name} {user.last_name} <br />
                                    <small className="text-muted">{user.email}</small>
                                </div>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant="primary" 
                    onClick={handleStartConversation} 
                    disabled={!selectedUser}
                >
                    <FaSmile className="mx-2" /> {t('say_hello')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

NewConversationModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    onStartConversation: PropTypes.func.isRequired,
};

export default NewConversationModal;
