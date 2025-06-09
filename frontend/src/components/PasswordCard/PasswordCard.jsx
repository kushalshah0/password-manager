import React, { useState } from 'react';
import { styles } from '../../styles/style';
import { FaEye, FaEyeSlash, FaEdit, FaTrash } from 'react-icons/fa';

const PasswordCard = ({ title, email, password }) => {
    const [hovered, setHovered] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [updatePass, setUpdatePass] = useState({
        id: "",
        bool: false,
    });

    const [newPassdData, setNewPassData] = useState({
        title: "",
        password: "",
    });

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
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
                    value={title}
                    placeholder="Title"
                    style={{ ...styles.input, minWidth: 0 }}
                    aria-label="Site Title"
                />
                <input
                    type="email"
                    value={email}
                    placeholder="Email"
                    style={{ ...styles.input, minWidth: 0 }}
                    aria-label="Email"
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
                        type={isPasswordVisible ? 'text' : 'password'}
                        value={password}
                        placeholder="Password"
                        style={{
                            ...styles.input,
                            paddingRight: '2.5rem', // space for eye icon
                            flex: 1,
                            minWidth: 0,
                        }}
                        aria-label="Password"
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
                        tabIndex={-1} // Remove from tab order, input gets focus
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
                                color: '#6b7280',
                                fontSize: '1.2rem',
                                padding: 0,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onClick={() => {
                                setUpdatePass({
                                    id: "",
                                    bool: true,
                                });
                                setNewPassData({
                                    title: title,
                                    password: password,
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
                                color: '#dc2626',
                                fontSize: '1.2rem',
                                padding: 0,
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'all 200ms ease-in -out',
                            }}
                        >
                            <FaTrash />
                        </button>
                    </>
                ) : (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            type="button"
                            aria-label="Cancel password card"
                            style={{
                                WebkitTapHighlightColor: 'transparent',
                                background: '#fff',
                                border: '1px solid #d1d5db',
                                cursor: 'pointer',
                                color: '#000',
                                fontSize: '0.8rem',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onClick={() => {
                                setUpdatePass({
                                    id: "",
                                    bool: false,
                                });
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            aria-label="Update password card"
                            style={{
                                WebkitTapHighlightColor: 'transparent',
                                background: '#000',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#fff',
                                fontSize: '0.8rem',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onClick={() => { }}
                        >
                            Update
                        </button>
                    </div>
                )}
            </div>
        </div >
    );
};

export default PasswordCard;