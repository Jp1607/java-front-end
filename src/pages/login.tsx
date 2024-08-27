import React, { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as LoginMethod from '../api/login/login';
import { Alert } from "react-bootstrap";

type User = {
    userName: string;
    password: string;
}

const Login = () => {
const { redirect } = useParams();
console.log('redirect é true', redirect)
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        userName: '',
        password: ''
    });

    const handleUserChange = <T extends keyof User>(key: T, newValue: User[T]): void => {

        setUser((previous: User) => ({

            ...previous,
            [key]: newValue
        }));
    }

    const handleSubmit = async (event: FormEvent) => {

        event.preventDefault();

        try {

            const { userName, password } = user
            const response = await LoginMethod.default({ username: userName, password })

            localStorage.setItem('token', response.token);

            console.log('deu bom dms', localStorage.getItem('token'));

            if (localStorage.getItem('token')) {

                navigate("/listProds");
            } else {

                console.error("Credenciais inválidas")
            }
        }
        catch (error) {

            console.error("Credenciais inválidas", error)
        }
    };


if(redirect){
    console.log('redirect é true')
    window.alert('Você deve estar autenticado para aceesar esta página!')
}

    return (

        <div>
            <div>
                <h1>LOGIN</h1>
            </div>

            <div>
                <form onSubmit={handleSubmit}
                style={{textAlign: 'left'}}>
                    <label htmlFor="user">Usuário:</label>

                    <input type="text"
                    style={{width: '40%'}}
                        id="user"
                        value={user.userName}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            handleUserChange("userName", event.target.value)}
                    />

                    <label htmlFor="pass">Senha:</label>

                    <input type="password"
                    style={{width: '40%'}}
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