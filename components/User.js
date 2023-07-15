import React from 'react';
import { useAuth } from '../utils/context/authContext';

export default function User() {
  const { user } = useAuth();

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={user.photoURL} alt={user.displayName} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>{user.displayName}</h5>
        <h5>Email: {user.email}</h5>
        <h5>Last sign in time: {user.metadata.lastSignInTime}</h5>
      </div>
    </div>
  );
}
