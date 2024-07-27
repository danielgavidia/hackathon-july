import "../styles/chat.css";

const Chat = () => {
    return (
        <div className="chat">
            <div>Ask about the horses</div>
            <div className="chat-box">
                <div className="chat-box-output">output</div>
                <div className="chat-box-input">
                    <div className="chat-box-input-form">
                        Write something here
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
