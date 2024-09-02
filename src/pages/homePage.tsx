import { Link,  } from "react-router-dom"

import ReturnButton from "../components/returnButton";

const HomePage = () => {
console.log('entrou aqui')
    return (
        <div className="default-page">
            <h1>INÍCIO</h1>

            <Link to={'/listProds'}>
                <button className = "content-abled-button">
                    LISTA DE PRODUTOS
                </button>
            </Link>

            <Link to={'/listProds'}>
                <button className = "content-abled-button">
                    LISTA DE USUÁRIOS
                </button>
            </Link>
           
            <ReturnButton action = "login">SAIR</ReturnButton>
        </div>
    )
}

export default HomePage;