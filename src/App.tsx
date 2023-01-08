import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Layout from "./Layout/Layout";
import ExpensePage from "./pages/ExpensePage/ExpensePage";

function App(): any {
    const [count, setCount] = useState(0);

    return (
        <Layout>
            <ExpensePage />
        </Layout>
    );
}

export default App;
