import React, { useContext } from 'react';
import { styles } from '../../styles/style';
import PasswordCard from '../PasswordCard/PasswordCard';
import { StatesContext } from '../../context/states';
import AddPassword from '../PasswordCard/AddPassword';

const Dashboard = () => {
  const { user, showAddPassword } = useContext(StatesContext);
  return (
    <section aria-label="Dashboard" style={styles.dashboard}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <h1 style={styles.greeting}>Hello {user.name.split(' ')[0]} !</h1>
      </div>

      {showAddPassword && (
        <AddPassword />
      )}

      <div aria-label="Stored passwords" role="list" style={styles.passwordsList}>
        <PasswordCard />
        <PasswordCard />
        <PasswordCard />
        <PasswordCard />
      </div>
    </section>
  );
};

export default Dashboard;
