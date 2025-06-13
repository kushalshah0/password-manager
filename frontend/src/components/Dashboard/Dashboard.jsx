import React, { useContext, useEffect } from 'react';
import { styles } from '../../styles/style';
import PasswordCard from '../PasswordCard/PasswordCard';
import { StatesContext } from '../../context/states';
import AddPassword from '../PasswordCard/AddPassword';

const Dashboard = () => {
  const { user, showAddPassword, allPasswordData, Getpassword } = useContext(StatesContext);
  useEffect(() => {
    
    Getpassword();
  }, []);

  return (
    <section aria-label="Dashboard" style={styles.dashboard}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <h1 style={styles.greeting}>Hello {user.name.split(' ')[0]} !</h1>
      </div>

      {showAddPassword && (
        <AddPassword />
      )}

      <div aria-label="Stored passwords" role="list" style={styles.passwordsList}>
        {allPasswordData && allPasswordData?.length > 0 && allPasswordData?.map((value) => (
          <PasswordCard key={value?._id} value={value} />
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
