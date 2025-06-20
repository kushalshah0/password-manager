import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const StatesContext = createContext();

export const StatesProvider = ({ children }) => {
    const [allPasswordData, setAllPasswordData] = useState([]);
    const [passwordData, setPasswordData] = useState({
        title: "",
        email: "",
        password: "",
    });
    const URL = import.meta.env.VITE_URL;
    const [view, setView] = useState('login');
    const [user, setUser] = useState({});
    const [formState, setFormState] = useState({});
    const [errors, setErrors] = useState({});
    const [showAddPassword, setShowAddPassword] = useState(false);
    const [loading, setLoading] = useState(true);

    const Getpassword = async () => {
        try {
            const res = await axios.get(
                `${URL}/api/pass`,

                {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                }
            );

            let getdata = res?.data;

            if (getdata?.success) {
                setAllPasswordData([...allPasswordData, ...getdata.data]);
            } else {
                toast.error(getdata?.message);
            }
        } catch (error) {
            if (error?.response?.data?.token === false) {
                toast.error("Session expired!");
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1000);
            }
            else {
                toast.error(error?.response?.data?.message);
            }
        }
    };

    const Postpassword = async (data) => {
        try {
            const res = await axios.post(
                `${URL}/api/pass`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            let postdata = res?.data;

            if (postdata?.success) {
                toast.success(postdata?.message)
                let maindata = postdata?.data;
                setAllPasswordData([...allPasswordData, maindata]);
                setPasswordData({
                    title: "",
                    password: "",
                });
                setShowAddPassword(false);
            } else {
                toast.error(postdata?.message);
            }
        } catch (error) {
            if (error?.response?.data?.token === false) {
                toast.error("Session expired!");
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1000);
                localStorage.clear();
            }
            else {
                toast.error(error?.response?.data?.message);
            }
        }
    };

    const Deletepassword = async (id) => {
        try {
            const res = await axios.delete(
                `${URL}/api/pass/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                }
            );

            let deletedata = res?.data;

            if (deletedata?.success) {
                toast.success(deletedata?.message);
                const newdata = allPasswordData?.filter((value) => value?._id !== id);
                setAllPasswordData(newdata);
            } else {
                toast.error(deletedata?.message);
            }
        } catch (error) {
            if (error?.response?.data?.token === false) {
                toast.error("Session expired!");
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1000);
                localStorage.clear();
            }
            else {
                toast.error(error?.response?.data?.message);
            }
        }
    };

    const Updatepassword = async ({ prevvalue, newpwddata }) => {
        try {
            const res = await axios.put(
                `${URL}/api/pass/${prevvalue?._id}`,
                newpwddata,
                {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                }
            );

            let updatedata = res?.data;

            if (updatedata?.success) {
                toast.success(updatedata?.message)
                let index = allPasswordData.indexOf(prevvalue);
                if (updatedata?.data) {
                    setAllPasswordData(prev => {
                        const updatedList = [...prev];
                        const index = updatedList.findIndex(item => item._id === prevvalue._id);
                        if (index !== -1) {
                            updatedList[index] = { ...updatedList[index], ...newpwddata };
                        }
                        return updatedList;
                    }
                    );
                }
            } else {
                toast.error(updatedata?.message);
            }
        } catch (error) {
            if (error?.response?.data?.token === false) {
                toast.error("Session expired!");
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1000);
                localStorage.clear();
            }
            else {
                toast.error(error?.response?.data?.message);
            }
        }
    };

    return (
        <StatesContext.Provider value={{ URL, view, setView, user, setUser, formState, setFormState, errors, setErrors, showAddPassword, setShowAddPassword, allPasswordData, setAllPasswordData, passwordData, setPasswordData, Getpassword, Postpassword, Deletepassword, Updatepassword, loading, setLoading }}>
            {children}
        </StatesContext.Provider>
    );
}