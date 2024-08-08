"use client"
import React from 'react';
import customSession from '../customHooks/customSession';

const UserProfile: React.FC = () => {
  const { sessionHook, loading } = customSession();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!sessionHook) {
    return <div>No session found</div>;
  }

  const { user } = sessionHook;

  return (
    <div>
      <h1>User Profile</h1>
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
      <p>Especialidades: {user.especialidades?.join(', ') || 'None'}</p>
    </div>
  );
};

export default UserProfile;