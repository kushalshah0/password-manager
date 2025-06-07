import { createContext, useContext } from "react";

const StatesContext = createContext();

export const StatesProvider = ({ children }) => {
    const [view, setView] = useState('login');
    const [users, setUsers] = useState({});
    const [formState, setFormState] = useState({});
    return (
        <StatesContext.Provider value={{view, setView, users, setUsers, formState, setFormState}}>
            {children}
        </StatesContext.Provider>
    );
}