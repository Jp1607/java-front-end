import React, { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import * as LoginMethod from '../api/login/login';
import '../css/login.css';
import '../css/delete-pop-up.css';

import Modal from "../components/modal";
import { useAuthContext } from "../api/context/AuthContext";


type User = {
    userName: string;
    password: string;
}

const Login = () => {

window.history.pushState(null, null, 'http://localhost:3000/')
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
            console.log(localStorage.getItem('token'))
            auth.setAuthenticated(true);
        }).catch(() => {
            setShow(true)
            console.log('error')
        })


    };

    const handleClick = () => {
        setShow(false)
    }

    return (
        <>
<Modal isOpen={show}>
                    <div className="pop-up">
                        <div className="pop-up-header">
                            <h1 className="pop-up-head ">Atenção!</h1>
                        </div>
                        <div className="pop-up-body">

                            <p className="pop-up-content">Credenciais inválidas!</p>
                            <p className="pop-up-content">Esperado: </p>
                            <p className="pop-up-content">Usuário: admin</p>
                            <p className="pop-up-content">Senha: 12345 </p>
                        </div>
                        <div className="pop-up-footer">

                            <button className={'content-abled-button'}onClick={handleClick}>OK</button>
                        </div>
                    </div>

                </Modal>

        <div id="login-page" >
            

                
          
            <div id="login-page-container">

                <h1 id="login-title">LOGIN</h1>

                <form onSubmit={handleSubmit} id="login-form">

                    <label htmlFor="user">Usuário:</label>

                    <input type="text"

                        id="user"
                        value={user.userName}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleUserChange("userName", event.target.value)}
                    />

                    <label htmlFor="pass">Senha:</label>

                    <input type="password"

                        id="pass"
                        value={user.password}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleUserChange("password", event.target.value)}
                            />


                    <input
                        id="content-abled-button-login"
                        type="submit"
                        value="ENTRAR"
                        />

                </form>

            </div>
        </div>

                        </>
    );
};

export default Login;