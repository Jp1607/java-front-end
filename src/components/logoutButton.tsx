
const LogoutButton = () => {

    const handleLogout = () => {
        if(window.confirm("Você tem certeza que deseja sair?") == true)
            window.location.href = '/login'
        localStorage.removeItem('token');
    } 

    return(
        
        <button onClick={handleLogout}>SAIR</button>
    )
}

export default LogoutButton