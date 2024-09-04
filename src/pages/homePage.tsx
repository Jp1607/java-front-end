import { Link,  } from "react-router-dom"

import ReturnButton from "../components/returnButton";

const HomePage = () => {
console.log('entrou aqui')
    return (
        <div className="menu-page">

            <div className="header">
            <h1>INÍCIO</h1>
            </div>

            <div className="menu-content">
<div>

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
        </div>
        </div>
            
    )
}

export default HomePage;