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
    <div className="flex-1 p-2">
      <div className="flex justify-between items-center mb-6 lg:mb-3">
        <h1 className="md:text-2xl text-xl font-semibold">Welcome, {user?.first_name}</h1>
        <div className="flex items-center hover:cursor-pointer space-x-4">
          <img src={user?.avatar} alt="User Avatar" className="w-10 h-10 rounded-full"/>
        </div>
      </div>
      <BalanceCard isHidden ={isHidden} onToggle={handleToggle}/>
      <QuickActions />
      <RecentTransactions showTransactions={!isHidden}/>
    </div>
  );
};

export default MainArea;
