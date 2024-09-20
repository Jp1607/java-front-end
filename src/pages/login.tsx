import React, { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import * as LoginMethod from '../api/login/login';
import '../css/login.css';
import '../css/delete-pop-up.css';

import Modal from "../components/modal";
import { useAuthContext } from "../api/context/AuthContext";
import { useThemeContext } from "../api/context/ThemeContext";
import InputComponent from "../components/Input";
import { Button } from "react-bootstrap";
import ButtonComponent from "../components/Button";
import ActionsModal from "../components/ActionsModal";


type User = {
    userName: string;
    password: string;
}

const Login = () => {
    const { toggleTheme } = useThemeContext()
    window.history.pushState(null, null, window.location.origin)
    const auth = useAuthContext();
    const [show, setShow] = useState<boolean>(false)
    const [user, setUser] = useState<LoginMethod.LoginForm>({
        username: '',
        password: ''
    });

    console.log('estou autenticado', auth.isAuthenticated);

    const handleUserChange = <T extends keyof LoginMethod.LoginForm>(key: T, newValue: LoginMethod.LoginForm[T]): void => {

        setUser((previous: LoginMethod.LoginForm) => ({

            ...previous,
            [key]: newValue
        }));
    }
    const handleSubmit = (event: FormEvent) => {

        event.preventDefault();
        LoginMethod.default(user).then((response: LoginMethod.LoginResponseBody) => {
            console.log(response.token)

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
            {/* <Modal isOpen={show}>
                <div className="pop-up">
                    <div className="pop-up-header">

                        <h1 className="pop-up-head ">
                            Atenção!
                        </h1>

                    </div>

                    <div className="pop-up-body">

                        <p className="pop-up-content">
                            Credenciais inválidas!
                        </p>
                        <p className="pop-up-content">
                            Esperado:
                        </p>
                        <p className="pop-up-content">
                            Usuário: admin
                        </p>
                        <p className="pop-up-content">
                            Senha: 12345
                        </p>

                    </div>

                    <div className="pop-up-footer">

                        <button
                            className={'content-abled-button'}
                            onClick={handleClick}>
                            OK
                        </button>
                    </div>
                </div>
            </Modal> */}

            <ActionsModal
                isOpen={show}
                onClose={() => setShow(false)}
                title="ATENÇÃO!"
                closeLabel = "OK">

                <p>
                    Credenciais inválidas!
                </p>
                <p>
                    Esperado:
                </p>
                <p>
                    Usuário: admin
                </p>
                <p>
                    Senha: 12345
                </p>

            </ActionsModal>

            <div id="login-page">
                <div id="login-page-container">
                    <div id="login-page-header">

                        <h1 id="login-title">

                            LOGIN

                        </h1>

                        <ButtonComponent
                            id="themeCad"
                            label="TEMA"
                            type="button"
                            action={toggleTheme}
                        />

                    </div>


                    <form onSubmit={handleSubmit} id="login-form">

                        <InputComponent
                            id="userCad"
                            label="USUÁRIO: "
                            type="text"
                            placeHolder="User"
                            action={(event: React.ChangeEvent<HTMLInputElement>) => (handleUserChange('username', event.target.value.toString()))}
                        />

                        <InputComponent
                            id="passCad"
                            label="SENHA: "
                            type="password"
                            placeHolder="88888888"
                            action={(event: React.ChangeEvent<HTMLInputElement>) => (handleUserChange('password', event.target.value.toString()))}
                        />

                        <ButtonComponent
                            id="subCad"
                            type="submit"
                            label="ENTRAR"
                            action={handleSubmit}
                        />

                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;