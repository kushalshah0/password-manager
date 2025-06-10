import { createContext, useContext, useState } from "react";

export const StatesContext = createContext();

export const StatesProvider = ({ children }) => {
    const URL = import.meta.env.VITE_URL;
    const [view, setView] = useState('login');
    const [user, setUser] = useState({});
    const [formState, setFormState] = useState({});
    const [errors, setErrors] = useState({});
    const [showAddPassword, setShowAddPassword] = useState(false);
    return (
        <StatesContext.Provider value={{URL, view, setView, user, setUser, formState, setFormState, errors, setErrors, showAddPassword, setShowAddPassword}}>
            {children}
        </StatesContext.Provider>
    );
}