import React from 'react'
import { useState } from 'react';
import { styles } from '../../styles/style'

const PasswordCard = () => {
    const [hovered, setHovered] = useState(false);
    return (
        <div tabIndex={0}
            role="listitem"
            style={{
                ...styles.passwordCard,
                ...(hovered ? styles.passwordCardHover : {}),
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>

            <div style={styles.passwordInfo}>
                <div style={styles.site}>Title</div>
                <div style={styles.usernameText}>Email</div>
                <div style={styles.passwordText} aria-label="Password">Password</div>
            </div>
        </div>
    )
}

export default PasswordCard
