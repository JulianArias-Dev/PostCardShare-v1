
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => { 

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate(); 

    
    const loginAction = (data) => {
        if(data.username === "admin" && data.password === "12345"){
            setUser(data.username);
            setToken(data.password);
            localStorage.setItem("site", data.password);
            navigate('/Inicio');
        } else {
            throw new Error("Usuario no encontrado"); 
        }
    };

    const logOutAction = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate('/singin');
    }

    return (
        <AuthContext.Provider value={{ token, user, loginAction, logOutAction }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext);
}