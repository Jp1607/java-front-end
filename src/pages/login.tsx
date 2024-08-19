import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as LoginMethod from '../api/login/login';
//import axios from "axios";

type User = {
    userName: string;
    password: string;
}

const Login = () => {
    
    const [user, setUser] = useState<User>({
        userName: '',
        password: ''
    });
    //const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


    const handleUserChange = <T extends keyof User>(key: T, newValue: User[T]): void => {
        setUser((previous: User) => ({
          ...previous,
          [key]: newValue
        }));
      }
    const getUser = <T extends keyof User>(key: T) => {
user.T;
    }

    const handleSubmit = async (event: FormEvent, user: User) => {
        event.preventDefault();
        try {
            const username = getUser()
const password = getUser()
            
            LoginMethod.default({username, password})
        .then((response: LoginMethod.LoginResponseBody) => 
            { 
                localStorage.setItem('token', response.token);
                console.log('deu bom dms', localStorage.getItem('token')); 
                if(localStorage.getItem('token') !== null || localStorage.getItem('token') !== undefined){
                    console.log('token');
                navigate("/listProds");
                }else{
                    setError("Credenciais inválidas")
                }
                console.log('deu bom dms', response); 

            })
        }
        catch (error) {
            setError("Credenciais inválidas")
        }
        
    };


    function handleButtonClick() {
        LoginMethod.default({ username: 'admin', password: '12345' })
        .then((response: LoginMethod.LoginResponseBody) => 
            { 
                localStorage.setItem('token', response.token);
                console.log('deu bom dms', response); 
            })
        .catch((e) => console.log('deu ruim pra caralho', e))

    }

    const test = (): void => {
    }

    return (
        <div>
            <div>
                <h1>LOGIN</h1>
                {/* <button onClick={test}>botão test</button> */}
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="user">Usuário:</label>

                    <input type="text"
                        id="user"
                        value={user.userName}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                           handleUserChange("userName", event.target.value.toString())}
                    />


                    <label htmlFor="pass">Senha:</label>

                    <input type="text"
                        id="pass"
                        value={user.password}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                           handleUserChange("password", event.target.value.toString())}
                    />

                    <input
                        type="submit"
                        value="submit"
                    />
                </form>
                 {/* <Link to="/listProds"><button onClick={handleButtonClick}>Ir para a lista</button></Link>  */}

            </div>
        </div>
    );
};

export default Login;