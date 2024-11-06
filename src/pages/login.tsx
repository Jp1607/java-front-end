import ActionsModal from "../components/modals/ActionsModal";
import ThemeToggler from "../components/buttons/themeToggle";
import { useAuthContext } from "../api/context/AuthContext";
import ButtonComponent from "../components/buttons/Button";
import InputComponent from "../components/inputs/InputComponent";
import React, { FormEvent, useState } from "react";
import * as LoginMethod from '../api/login/login';
import '../components/css/modal.css';
import './css/login.css';

const Login = () => {

    window.history.pushState(null, null, window.location.origin)
    const auth = useAuthContext();
    const [show, setShow] = useState<boolean>(false)
    const [user, setUser] = useState<LoginMethod.LoginForm>({
        username: '',
        password: ''
    });

    const handleUserChange = <T extends keyof LoginMethod.LoginForm>(key: T, newValue: LoginMethod.LoginForm[T]): void => {

        setUser((previous: LoginMethod.LoginForm) => ({

            ...previous,
            [key]: newValue
        }));
    }


    const handleSubmit = (event: FormEvent) => {

        event.preventDefault();
        LoginMethod.default(user).then((response: LoginMethod.LoginResponseBody) => {

            localStorage.setItem('token', response.token);
            auth.setAuthenticated(true);
        }).catch(() => {

            setShow(true)
        })
    };

    return (

        <>
            <ActionsModal
                isOpen={show}
                onClose={() => setShow(false)}
                title="ATENÇÃO!"
                closeLabel="OK">

                <p id="p1">
                    Credenciais inválidas!
                </p>
                <p id="p2">
                    Esperado:
                </p>
                <p className="p3">
                    Usuário: admin
                </p>
                <p className="p3">
                    Senha: 12345
                </p>

            </ActionsModal>

            <div id="login-page">
                <div id="login-page-container">
                    <div id="login-page-header">

                        <h1 id="login-title">

                            LOGIN

                        </h1>

                        <ThemeToggler />

                    </div>

                    <form onSubmit={handleSubmit} id="login-form">

                        <InputComponent
                            classname="input-component"
                            inputStyle="input-field"
                            id="userCad"
                            label="USUÁRIO: "
                            type="text"
                            action={(event: React.ChangeEvent<HTMLInputElement>) => (handleUserChange('username', event.target.value.toString()))}
                        />

                        <InputComponent
                            classname="input-component"
                            inputStyle="input-field"
                            id="passCad"
                            label="SENHA: "
                            type="password"
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