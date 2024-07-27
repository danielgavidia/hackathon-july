import "./app.css";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import Racing from "./components/Racing";
import Ribbon from "./components/Ribbon";

const App = () => {
    return (
        <div className="app">
            <Navbar />
            <Ribbon />
            <Racing />
            <Chat />
        </div>
    );
};

export default App;
