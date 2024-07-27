import "../styles/chat.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

type InterfaceChat = {
    name: string;
    message: string;
};

const Chat = () => {
    const [prompt, setPrompt] = useState<string>("");
    const [chat, setChat] = useState<Array<InterfaceChat>>([
        { name: "", message: "" },
    ]);
    const endChatRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPrompt("");
        setChat((chat) => [...chat, { name: "user", message: prompt }]);
        try {
            const response = await axios(
                `https://infinity-ai.fly.dev/prompt/${prompt}`
            );
            setChat((chat) => [
                ...chat,
                { name: "openai", message: response.data.content },
            ]);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (endChatRef.current) {
            endChatRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    });

    return (
        <div className="chat">
            <div>Ask about the horses</div>
            <div className="chat-box">
                <div className="chat-box-output">
                    {chat.map((x) => {
                        if (x.name === "user") {
                            return (
                                <>
                                    <p>User: {x.message}</p>
                                    <br />
                                </>
                            );
                        } else if (x.name === "openai") {
                            return (
                                <>
                                    <p>AI: {x.message}</p>
                                    <br />
                                </>
                            );
                        }
                    })}
                    <div ref={endChatRef}></div>
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
