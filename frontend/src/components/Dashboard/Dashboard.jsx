import React from 'react'
import { styles } from '../../styles/style'
import PasswordCard from '../PasswordCard/PasswordCard'

const Dashboard = () => {
  return (
      <section aria-label="Dashboard" style={styles.dashboard}>
        <h1 style={styles.greeting}>Hello Kushal!</h1>
        <div aria-label="Stored passwords" role="list" style={styles.passwordsList}>
          <PasswordCard />
          <PasswordCard />
          <PasswordCard />
          <PasswordCard />
        </div>
      </section>
  )
}

export default Dashboard