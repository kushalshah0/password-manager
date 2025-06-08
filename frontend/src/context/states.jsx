import { createContext, useContext, useState } from "react";

export const StatesContext = createContext();

export const StatesProvider = ({ children }) => {
    const [view, setView] = useState('dashboard');
    const [users, setUsers] = useState({});
    const [formState, setFormState] = useState({});
    const [errors, setErrors] = useState({});
    return (
        <StatesContext.Provider value={{view, setView, users, setUsers, formState, setFormState, errors, setErrors}}>
            {children}
        </StatesContext.Provider>
    );
}