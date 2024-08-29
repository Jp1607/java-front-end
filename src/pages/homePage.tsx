import { Link, useNavigate } from "react-router-dom"
import LogoutButton from "../components/logoutButton"

const HomePage = () => {
    const navigate = useNavigate();
    const handleClick = () => {

        navigate('/login')
    }

    return (
        <div>
            <h1>INÍCIO</h1>

            <Link to={'/listProds'}>
                <button>
                    LISTA DE PRODUTOS
                </button>
            </Link>

            <Link to={'/listProds'}>
                <button>
                    LISTA DE USUÁRIOS
                </button>
            </Link>

            <button onClick={handleClick} className="content-abled-button">SAIR</button>
            {/* <LogoutButton/> */}
        </div>
    )
}

export default HomePage;