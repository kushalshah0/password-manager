import { styles } from '../../styles/style';
import { useContext, useRef, useEffect } from 'react';
import { StatesContext } from '../../context/states';

const AddPassword = () => {
    const { setShowAddPassword } = useContext(StatesContext);

    const closeModal = () => {
        setShowAddPassword(false);
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);


    return (
        <div style={styles.modalOverlay}>
            <form style={styles.addCard} aria-label="Add new password" noValidate>
                <h2 style={styles.addCardH2}>Add New Password</h2>
                <label style={styles.addCardLabel} htmlFor="title">
                    Title
                </label>
                <input style={styles.addCardInput} id="title" name="title" type="text" placeholder="" autoComplete="off" required />
                <label style={styles.addCardLabel} htmlFor="email">
                    Email
                </label>
                <input style={styles.addCardInput} id="email" name="email" type="text" placeholder="" autoComplete="off" required />
                <label style={styles.addCardLabel} htmlFor="password">
                    Password
                </label>
                <input style={styles.addCardInput} id="password" name="password" type="password" placeholder="" autoComplete="off" required />
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', transition: 'all 0.3s ease-in-out' }}>
                    <button
                        type="button"
                        aria-label="Cancel password card"
                        style={{
                            ...styles.addCardButton,
                            padding: '0.7rem 1rem',
                            background: '#fff',
                            color: '#000',
                            border: '1px solid #d1d5db',
                        }}
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        aria-label="Update password card"
                        style={{
                            ...styles.addCardButton,
                        }}
                        onClick={() => { }}
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPassword;
