import "../styles/chat.css";
import { useState } from "react";
import axios from "axios";

const Chat = () => {
    const [prompt, setPrompt] = useState<string>("");
    const [chat, setChat] = useState<Array<string>>([""]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPrompt("");
        setChat((chat) => [...chat, prompt]);
        try {
            const response = await axios(
                `https://infinity-ai.fly.dev/prompt/${prompt}`
            );
            setChat((chat) => [...chat, response.data.content]);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="chat">
            <div>Ask about the horses</div>
            <div className="chat-box">
                <div className="chat-box-output">
                    {chat.map((x) => (
                        <>
                            <p>{x}</p>
                            <br />
                        </>
                    ))}
                </div>
                <form className="chat-box-input" onSubmit={handleSubmit}>
                    <input
                        className="chat-box-input-form"
                        value={prompt}
                        type="text"
                        onChange={handleChange}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
