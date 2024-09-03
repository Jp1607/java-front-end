import Alert from 'react-bootstrap/Alert';
import { Navigate } from 'react-router-dom';
import ReturnButton from './returnButton';


const AuthWrapper = () => {


    console.log(localStorage.getItem('token'));
    return(
        <>
    <Alert>"Você deve estar autenticado para entrar nesta página!" </Alert>
    <ReturnButton action = 'login'>RETORNAR</ReturnButton>
   
    </>
    )
}

export default AuthWrapper;