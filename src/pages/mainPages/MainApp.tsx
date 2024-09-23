import LogOutButton from "../../components/buttons/LogOutButton";
import ThemeToggler from "../../components/buttons/themeToggle";
import LinkButton from "../../components/buttons/LinkButton";
import { BrowserRouter } from "react-router-dom";
import Routers from "../../api/router/Routes";
import '../css/mainApp.css';

const MainApp = (): JSX.Element => {

    return (

        <BrowserRouter>
            <div id="main-page">
                <div id="top-bar">

                    <div id="logo-container">
                        BIRULAIBE
                    </div>


                    <div id="logout">

                        <ThemeToggler/>

                        <LogOutButton/>

                    </div>
                </div>

                <div id="main-container">
                    <div id="side-bar">

                        <LinkButton
                            dest="/listProds"
                            label="LISTA DE PRODUTOS" />

                        <LinkButton
                            dest="/listUsers"
                            label="LISTA DE USUÁRIOS" />

                    </div>

                    <div id="content-container">
                        <Routers />
                    </div>
                    
                </div>
            </div>
        </BrowserRouter>
    )
}

export default MainApp;