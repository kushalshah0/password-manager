import React, { useContext, useState } from 'react';
import { styles } from '../../styles/style';
import { FaEye, FaEyeSlash, FaEdit, FaTrash } from 'react-icons/fa';
import { StatesContext } from '../../context/states';
import { toast } from 'react-hot-toast';

const PasswordCard = ({ value }) => {
    const [hovered, setHovered] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [updatePass, setUpdatePass] = useState({
        id: "",
        bool: false,
    });

    const [newPassData, setNewPassData] = useState({
        title: value.title,
        email: value.email,
        password: value.password,
    });

    const { allPasswordData, setAllPasswordData, Deletepassword, Updatepassword } = useContext(StatesContext);

    const handleDelete = async (id) => {
        await Deletepassword(id);
        const updatedPasswords = allPasswordData.filter(password => password._id !== id);
        setAllPasswordData(updatedPasswords);
    };

    const handleUpdate = async () => {
        await Updatepassword({ prevvalue: value, newpwddata: newPassData });
        setUpdatePass({
            id: "",
            bool: false,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPassData((prev) => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const hasChanges = () => {
        return (
            newPassData.title !== value.title ||
            newPassData.email !== value.email ||
            newPassData.password !== value.password
        );
    };

    return (
        <div
            tabIndex={0}
            role="listitem"
            style={{
                ...styles.passwordCard,
                ...(hovered ? styles.passwordCardHover : {}),
                flexDirection: 'column',
                gap: '1rem',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div
                style={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <input
                    type="text"
                    name="title"
                    value={newPassData.title}
                    placeholder="Title"
                    style={{ ...styles.input, minWidth: 0 }}
                    aria-label="Site Title"
                    disabled={!updatePass.bool}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    value={newPassData.email}
                    placeholder="Email"
                    style={{ ...styles.input, minWidth: 0 }}
                    aria-label="Email"
                    disabled={!updatePass.bool}
                    onChange={handleInputChange}
                />
                <div
                    style={{
                        position: 'relative',
                        flex: '1 1 250px',
                        minWidth: 0,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <input
                        name="password"
                        type={isPasswordVisible ? 'text' : 'password'}
                        value={newPassData.password}
                        placeholder="Password"
                        style={{
                            ...styles.input,
                            paddingRight: '2.5rem',
                            flex: 1,
                            minWidth: 0,
                        }}
                        aria-label="Password"
                        disabled={!updatePass.bool}
                        onChange={handleInputChange}
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                        style={{
                            WebkitTapHighlightColor: 'transparent',
                            position: 'absolute',
                            right: '0.5rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#6b7280',
                            fontSize: '1.1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0,
                            height: '100%',
                        }}
                        tabIndex={-1}
                    >
                        {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>

            <div
                style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'flex-end',
                    width: '100%',
                    marginTop: '0.5rem',
                    minHeight: '35px',
                }}
            >
                {!updatePass.bool ? (
                    <>
                        <button
                            type="button"
                            aria-label="Edit password card"
                            style={{
                                WebkitTapHighlightColor: 'transparent',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#000',
                                fontSize: '1.2rem',
                                padding: 0,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onClick={() => {
                                setUpdatePass({
                                    id: value._id,
                                    bool: true,
                                });
                                setNewPassData({
                                    title: value.title,
                                    email: value.email,
                                    password: value.password,
                                });
                            }}
                        >
                            <FaEdit />
                        </button>
                        <button
                            type="button"
                            aria-label="Delete password card"
                            style={{
                                WebkitTapHighlightColor: 'transparent',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#000',
                                fontSize: '1.2rem',
                                padding: 0,
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'all 200ms ease-in -out',
                            }}
                            onClick={() => handleDelete(value._id)}
                        >
                            <FaTrash />
                        </button>
                    </>
                ) : (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            type="button"
                            aria-label="Cancel password card"
                            style={styles.cardBtn}
                            onClick={() => {
                                setUpdatePass({
                                    id: "",
                                    bool: false,
                                });
                                setNewPassData({
                                    title: value.title,
                                    email: value.email,
                                    password: value.password,
                                });
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            aria-label="Update password card"
                            style={{
                                ...styles.cardBtn,
                                background: hasChanges() ? '#000' : '#555555',
                                color: '#fff',
                            }}
                            onClick={handleUpdate}
                            disabled={!hasChanges()} // Disable if no changes
                        >
                            Update
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PasswordCard;