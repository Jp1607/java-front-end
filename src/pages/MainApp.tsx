import { BrowserRouter, Link } from "react-router-dom";
import Routers from "../api/router/Routes";
import '../css/mainApp.css';
import { useAuthContext } from "../api/context/AuthContext";

const MainApp = (): JSX.Element => {

    const auth = useAuthContext();

    const handleLogOut = () => {
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

                        <button onClick={handleLogOut}>SAIR</button>

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