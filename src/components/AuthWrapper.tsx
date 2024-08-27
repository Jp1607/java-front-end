import Alert from 'react-bootstrap/Alert';
import { Navigate } from 'react-router-dom';


const AuthWrapper = () => {

    const redirect: Boolean = true
    console.log('redirect', redirect)
    return(
        <>
    <Alert>"Você deve estar autenticado para entrar nesta página!" </Alert>
    <Navigate to={`/login/${redirect}?`}/>
    </>
    )
}

export default AuthWrapper;