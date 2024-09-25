import { BrowserRouter } from "react-router-dom";
import '../css/mainApp.css';
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Content from "./Content";

const MainApp = (): JSX.Element => {

    return (

        <BrowserRouter>
            <div id="main-page">

                <TopBar />

                <div id="main-container">

                    <SideBar />

                    <Content />

                </div>
            </div>
        </BrowserRouter>
    )
}

export default MainApp;