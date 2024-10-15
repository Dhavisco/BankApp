import React, { useState } from 'react';
import BalanceCard from '../Balance/BalanceCard';
import QuickActions from '../QuickActions/QuickActions';
import RecentTransactions from '../RecentTransactions/RecentTransactions';
import { useAuth } from '../context/useAuth';

const MainArea: React.FC = () => {

 const [isHidden, setIsHidden] = useState(true);

  const handleToggle = () => {
    setIsHidden(!isHidden); // Toggle balance and transaction visibility
  };

  const {user} = useAuth();

  return (
    <div className="flex-1 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Welcome, {user?.email}</h1>
        <div className="flex items-center space-x-4">
          <img src="/path/to/avatar" alt="User Avatar" className="w-12 h-12 rounded-full"/>
        </div>
      </div>
      <BalanceCard isHidden ={isHidden} onToggle={handleToggle}/>
      <QuickActions />
      <RecentTransactions showTransactions={!isHidden}/>
    </div>
  );
};

export default MainArea;
