import "./app.css";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import Ribbon from "./components/Ribbon";

const App = () => {
    return (
        <div className="app">
            <Navbar />
            <Ribbon />
            <div>Horse 1</div>
            <div>Horse 2</div>
            <div>Horse 3</div>
            <Chat />
        </div>
    );
};

export default App;
