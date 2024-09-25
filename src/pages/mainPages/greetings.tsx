import '../css/greetingsPage.css';

const GreetingsPage = () => {

    console.log('eu sou o jão viado');

    return (

        <div className="greetings-page">
            <div className="header">

                <h1>
                    SAUDAÇÕES!
                </h1>

            </div>

            <div className="greetings-content">
                <div>

                    <button className="content-abled-button">
                        SOBRE
                    </button>

                </div>

                <div>

                    <button className="content-abled-button">
                        APRENDA A USAR!
                    </button>

                </div>
            </div>
        </div>
    )
}

export default GreetingsPage;