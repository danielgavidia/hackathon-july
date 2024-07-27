import "./app.css";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import Racing from "./components/Racing";

const App = () => {
    return (
        <div className="app">
            <Navbar />
            <Racing />
            <Chat />
        </div>
    );
};

export default App;
