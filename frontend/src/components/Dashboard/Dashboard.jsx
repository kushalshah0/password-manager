import React from 'react'
import { styles } from '../../styles/style'
import PasswordCard from '../PasswordCard/PasswordCard'

const Dashboard = () => {
  return (
    <div>
      <section aria-label="Dashboard" style={styles.dashboard}>
        <h1 style={styles.greeting}>Hello !</h1>
        <div aria-label="Stored passwords" role="list" style={styles.passwordsList}>
          </div>
      </section>
    </div>
  )
}

export default Dashboard
