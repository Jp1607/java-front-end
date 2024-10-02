import React from "react"
import { User } from "../../api/entities/user"
import ThemeToggler from "../../components/buttons/themeToggle"
import InputComponent from "../../components/inputs/InputComponent"
import { POSTUser } from "../../api/requests/userRequests"
import '../css/login.css';
import ButtonComponent from "../../components/buttons/Button"

const CreateUser = () => {

    const [user, setUser] = React.useState<User>(null)

    const handleChange = <T extends keyof User>(key: T, newValue: User[T]) => {

        setUser((previous: User) => ({

            ...previous,
            [key]: newValue

        }))
    }

    const handleSubmit = () => {

        POSTUser(user).then((response: String) => (console.log(response))).catch(() => { })
    }

    return (

        <div id="login-page">
            <div id="login-page-container">
                <div id="login-page-header">

                    <h1 id="login-title">

                        NOVO

                    </h1>

                    <ThemeToggler />

                </div>

                <form onSubmit={handleSubmit} id="login-form">

                    <InputComponent
                        id="userNameInput"
                        label="Nome: "
                        type="text"
                        action={(event: React.ChangeEvent<HTMLInputElement>) => handleChange("name", event.target.value.toString())} />

                    <InputComponent
                        id="userPassInput"
                        label="Senha:"
                        type="password"
                        action={(event: React.ChangeEvent<HTMLInputElement>) => handleChange("password", parseInt(event.target.value))} />

                    <ButtonComponent
                        id="subCad"
                        label="ENVIAR"
                        type="submit"
                        action={handleSubmit} />
                </form>
            </div>
        </div>
    )
}

export default CreateUser;