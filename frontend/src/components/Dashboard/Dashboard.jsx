import React, { useContext, useEffect } from 'react';
import { styles } from '../../styles/style';
import PasswordCard from '../PasswordCard/PasswordCard';
import { StatesContext } from '../../context/states';
import AddPassword from '../PasswordCard/AddPassword';

const Dashboard = () => {
  const { showAddPassword, allPasswordData, Getpassword } = useContext(StatesContext);
  useEffect(() => {
    Getpassword();
  }, []);

  const name = localStorage.getItem('name') || 'User';

  return (
    <section aria-label="Dashboard" style={styles.dashboard}>

      {showAddPassword && (
        <AddPassword />
      )}
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
        <h1 style={styles.greeting}>Hello {name} !</h1>
      </div>

      <div aria-label="Stored passwords" role="list" style={styles.passwordsList}>
        {allPasswordData && allPasswordData?.length > 0 && allPasswordData?.map((value) => (
          <PasswordCard key={value?._id} value={value} />
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
