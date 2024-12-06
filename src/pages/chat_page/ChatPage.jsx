import { Container, TabContainer } from "react-bootstrap";
import "./ChatPage.css";
import ChatSideBarComponent from "./components/ChatSideBarComponent";
import ChatBoxComponent from "./components/ChatBoxComponent";

const ChatPage = () => {
    return (
        <div className="chat-page-container">
            <ChatSideBarComponent />
            <ChatBoxComponent />
        </div>        
    )
};

export default ChatPage;