import { useAuthContext } from "../api/context/AuthContext";
import Login from "./login";
import MainApp from "./MainApp";

const Controler = (): JSX.Element => {
    const auth = useAuthContext();
    console.log('state', auth);

    return auth.isAuthenticated ? (<MainApp />) : (<Login />)
}

export default Controler;