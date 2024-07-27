import "../styles/chat.css";
import { useState } from "react";

const Chat = () => {
    const [formData, setFormData] = useState("");

    // const handleSubmit= async(e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     try {
    //         const response = await fetch("")
    //     }
    // }

    return (
        <div className="chat">
            <div>Ask about the horses</div>
            <div className="chat-box">
                <div className="chat-box-output">output</div>
                <form className="chat-box-input">
                    <input className="chat-box-input-form" type="text" />
                </form>
            </div>
        </div>
    );
};

export default Chat;
