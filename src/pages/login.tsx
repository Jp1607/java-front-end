import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as LoginMethod from '../api/login/login';

import Modal from "../components/modal";
import { useAuthContext } from "../api/context/AuthContext";


type User = {
    userName: string;
    password: string;
}

const Login = () => {

    const navigate = useNavigate();
    const auth = useAuthContext();
    const [show, setShow] = useState<boolean>(false)
    const [user, setUser] = useState<User>({
        userName: '',
        password: ''
    });

    console.log('estou autenticado', auth.isAuthenticated);

    const handleUserChange = <T extends keyof User>(key: T, newValue: User[T]): void => {

        setUser((previous: User) => ({

            ...previous,
            [key]: newValue
        }));
    }

    const handleSubmit = (event: FormEvent) => {

        event.preventDefault();

        const { userName, password } = user
        LoginMethod.default({ username: userName, password }).then((response: LoginMethod.LoginResponseBody) => {
            localStorage.setItem('token', response.token);
            navigate("/homePage");
            console.log(localStorage.getItem('token'))
            auth.setAuthenticated(true);
        }).catch(() => {
            console.log('error')
        })


    };

    const handleClick = () => {
        setShow(false)
    }

    return (


        <div className="default-page">

            <Modal isOpen={show}>
                <div>
                    <h1>Atenção!</h1>
                    <p>Credenciais inválidas!</p>
                    <p>Esperado: </p>
                    <p>Usuário: admin; senha: 12345 </p>
                    <button onClick={handleClick}>OK</button>
                </div>
            </Modal>


            <div className="default-content">
                <div>
                    <h1>LOGIN</h1>
                </div>



                <form onSubmit={handleSubmit}>

                    <label htmlFor="user">Usuário:</label>

                    <input type="text"
                        style={{ width: '40%' }}
                        id="user"
                        value={user.userName}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleUserChange("userName", event.target.value)}
                    />

                    <label htmlFor="pass">Senha:</label>

                    <input type="password"
                        style={{ width: '40%' }}
                        id="pass"
                        value={user.password}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleUserChange("password", event.target.value)}
                    />

                    <input
                        type="submit"
                        value="submit"
                    />

                </form>
            </div>
        </div>

    );
};

export default Login;