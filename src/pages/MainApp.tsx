import { BrowserRouter, Link } from "react-router-dom";
import Routers from "../api/router/Routes";
import '../css/mainApp.css';
import { useAuthContext } from "../api/context/AuthContext";
import { IoIosLogOut } from "react-icons/io";
import ReturnButton from "../components/returnButton";


const MainApp = (): JSX.Element => {

    const auth = useAuthContext();

    const handleLogOut = () => {
        window.history.replaceState(null, null, '')
        window.history.pushState(null, null, '')
        localStorage.clear();
        auth.setAuthenticated(false);

    }

    return (
        <BrowserRouter>

            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    margin: 0,
                    padding: 0,
                    overflow: 'hidden',
                    backgroundColor: 'red'
                }}
            >
                <div id="top-bar">


                    <div id="logo-container">
                        BIRULAIBE
                    </div>

                    <div id="logout">
                        {/* <div id = "logout-button-container">
</div> */}
                        <button onClick={handleLogOut} id="logout-button">
                        <IoIosLogOut id = "logout-symbol"/>   
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