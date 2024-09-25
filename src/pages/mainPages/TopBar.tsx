import LogOutButton from "../../components/buttons/LogOutButton"
import ThemeToggler from "../../components/buttons/themeToggle"
import "../css/topBar.css"

const TopBar = () => {

    return (

        <div id="top-bar">

            <div id="logo-container">
                BIRULAIBE
            </div>


            <div id="logout">

                <ThemeToggler />

                <LogOutButton />

            </div>
        </div>
    )
}

export default TopBar;