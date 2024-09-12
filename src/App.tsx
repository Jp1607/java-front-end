import AuthContextProvider, { AC, AuthContext } from './api/context/AuthContext';
import MainApp from './pages/MainApp';
import Login from "./pages/login";
import './App.css';
import ThemeContextProvider from './api/context/ThemeContext';

function App() {

  return (

    <AuthContextProvider>
      <ThemeContextProvider>
        <AC.Consumer>
          {(auth: AuthContext) => auth.isAuthenticated ? (<MainApp />) : (<Login />)}
        </AC.Consumer>
      </ThemeContextProvider>
    </AuthContextProvider>
  );
}

export default App;
