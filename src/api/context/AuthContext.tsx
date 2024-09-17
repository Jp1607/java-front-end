import React from "react";


export type AuthContext = {

    isAuthenticated: boolean;
    setAuthenticated: (param: boolean) => void;
}

const AC = React.createContext<AuthContext>({

    isAuthenticated: false,
    setAuthenticated: null
});

export { AC }

type AuthContextProviderProps = {

    children: React.ReactElement[] | React.ReactElement 
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

    React.useEffect(() => {

        if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) {

            setIsAuthenticated(true);
        }
    }, [])

    const value: AuthContext = {

        isAuthenticated: isAuthenticated,
        setAuthenticated: (param: boolean) => setIsAuthenticated(param)
    }

    return (
        < AC.Provider value={value} >
            {children}
        </AC.Provider >
    )
}

export const useAuthContext = () => {

    return React.useContext(AC);
}

export default AuthContextProvider;