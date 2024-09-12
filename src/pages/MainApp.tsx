import { BrowserRouter, Link } from "react-router-dom";
import Routers from "../api/router/Routes";
import '../css/mainApp.css';
import { useAuthContext } from "../api/context/AuthContext";
import { IoIosLogOut } from "react-icons/io";
import { useThemeContext } from "../api/context/ThemeContext";

const MainApp = (): JSX.Element => {

    const { currentTheme, toggleTheme } = useThemeContext();
    const auth = useAuthContext();

    
    const handleLogOut = () => {

        localStorage.clear();
        auth.setAuthenticated(false);
    }

    return (

        <BrowserRouter>
            <div id="main-page">
                <div id="top-bar">

                    <div id="logo-container">
                        BIRULAIBE
                    </div>

                      
                    <div id="logout">
                   
                    <button className = "theme-toggle"
                    onClick = {toggleTheme}>
                     TEMA
                    </button>

                        <button onClick={handleLogOut} id="logout-button">
                            <IoIosLogOut id="logout-symbol" />
                        </button>
                    </div>
                </div>

                <div id="main-container">
                    <div id="side-bar">

                        <Link to={'/listProds'}>
                            <button id="content-abled-button-main">
                                LISTA DE PRODUTOS
                            </button>
                        </Link>

                        <button id="content-abled-button-main">
                            LISTA DE USUÁRIOS
                        </button>
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