import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as LoginMethod from '../api/login/login';

type User = {
    userName: string;
    password: string;
}

const Login = () => {

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

    return (

        <div>
            <div>
                <h1>LOGIN</h1>
            </div>

            <div>
                <form onSubmit={handleSubmit}>
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
                        type="submit"
                        value="submit"
                    />
                </form>
            </div>
        </div>
    );
};

export default Login;