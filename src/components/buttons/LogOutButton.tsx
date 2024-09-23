import { IoIosLogOut } from "react-icons/io"
import { useAuthContext } from "../../api/context/AuthContext"

const LogOutButton = () => {

    const auth = useAuthContext();

    const handleLogOut = () => {

        localStorage.clear();
        auth.setAuthenticated(false);
    }

    return (

        <button onClick={handleLogOut} id="logout-button">
            <IoIosLogOut id="logout-symbol" />
        </button>
    )
}

export default LogOutButton