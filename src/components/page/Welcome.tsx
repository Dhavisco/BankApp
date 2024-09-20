import React from 'react';
import { useAuth } from '../context/useAuth';


const Welcome: React.FC = () => {



  const { user } = useAuth();
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">

      <h1 className="text-3xl font-bold">Welcome to Your Account {user?.email}!</h1>
    </div>
  );
};

export default Welcome;
