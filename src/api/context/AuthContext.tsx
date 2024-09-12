import React from "react";
import ReturnButton from "../../components/returnButton";

export type AuthContext = {
    isAuthenticated: boolean;
    setAuthenticated: (param: boolean) => void;
}

export type themeContextType = {
    currentTheme: string
    toggleTheme: () => void
}

export const AC = React.createContext<AuthContext>({
    isAuthenticated: false,
    setAuthenticated: null
});

export const ThemeContext = React.createContext<themeContextType>({
    currentTheme: 'light',
    toggleTheme: null
})
// export { AC }

type AuthContextProviderProps = {
    children: React.ReactElement[] | React.ReactElement
}

type themeContextProviderProps = {
    children: React.ReactElement[] | React.ReactElement
}

const themeContextProvider: React.FC<themeContextProviderProps> = ({ children }) => {
    const [currentTheme, setTheme] = React.useState<string>('light')

    React.useEffect(() => {

        setTheme((currentTheme) => (currentTheme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark'))
    }, [])

    const toggleTheme = () => {
        setTheme((currentTheme) => (currentTheme = 'light' ? 'dark' : 'light'))
        localStorage.setItem('theme', currentTheme)
    }

    return (
        <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )

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

export default AuthContextProvider;

export const useAuthContext = () => {
    return React.useContext(AC);
}