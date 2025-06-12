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
        } catch (error) { }
    };

    const Postpassword = async (data) => {
        console.log(data);
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
                toast.error(postdata?.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
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

            let deletdata = res?.data;

            if (deletdata?.success) {

                toast.success(deletdata?.message)
                let newdata = allPasswordData?.filter((value) => value?._id !== pwid);
                setAllPasswordData(newdata);
            } else {
                toast.error(deletdata?.message)

            }
        } catch (error) { }
    };

    const Updatepassword = async ({ prevvalue, newpwddata }) => {
        console.log(prevvalue, newpwddata);
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
                    allPasswordData.splice(index - 1, 0, updatedata.data);
                }
            } else {
                toast.error(updatedata?.message)
            }
        } catch (error) {
            console.log(error);

        }
    };

    return (
        <StatesContext.Provider value={{ URL, view, setView, user, setUser, formState, setFormState, errors, setErrors, showAddPassword, setShowAddPassword, allPasswordData, setAllPasswordData, passwordData, setPasswordData, Getpassword, Postpassword, Deletepassword, Updatepassword }}>
            {children}
        </StatesContext.Provider>
    );
}