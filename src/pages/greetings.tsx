import { Link,  } from "react-router-dom"
import '../css/greetingsPage.css';
import ReturnButton from "../components/returnButton";

const GreetingsPage = () => {
console.log('entrou aqui')
    return (
        <div className="greetings-page">

            <div className="header">
            <h1>GREETINGS!</h1>
            </div>

            <div className="greetings-content">


            {/* <Link to={'/listProds'}>
                <button className = "content-abled-button">
                    LISTA DE PRODUTOS
                </button>
            </Link> */}
<div>
            
                <button className = "content-abled-button">
                    SOBRE
                </button>
            
</div>
<div>
           
            <button className = "content-abled-button">APRENDA A USAR!</button>
</div>

        </div>
        </div>
            
    )
}

export default GreetingsPage;