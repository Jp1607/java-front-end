import React, { Children } from "react";

const ThemeContext = React.createContext(null)

export const useThemeContext = () => {
    return React.useContext(ThemeContext);
}

type themeProps = {
    children: JSX.Element
}

const ThemeContextProvider: React.FC<themeProps> = ({ children }) => {

    const [currentTheme, setCurrentTheme] = React.useState('light');

    const toggleTheme = () => {
console.log(currentTheme)
        setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')
    }

    React.useEffect(() => {
        document.documentElement.setAttribute('theme', currentTheme ===
            'light' ?
            'light-theme' :
            'dark-theme')

    }, [currentTheme])

    return (
        <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )

}
export default ThemeContextProvider;