import React, { useState } from 'react';
import BalanceCard from '../Balance/BalanceCard';
import QuickActions from '../QuickActions/QuickActions';
import RecentTransactions from '../RecentTransactions/RecentTransactions';
// import { useAuth } from '../context/useAuth';
import useProfile from '../hooks/useProfile';
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiCustomerService2Line } from "react-icons/ri";

const MainArea: React.FC = () => {
  const [isHidden, setIsHidden] = useState(true);



  const handleToggle = () => {
    setIsHidden(!isHidden); // Toggle balance and transaction visibility
  };

  // const {user} = useAuth();


  const {data} = useProfile();

  return (
    <div className="flex-1 p-2">
      <div className="flex justify-between items-center mb-6 lg:mb-3">
        <div className="flex items-center gap-2">
          <img src={data?.avatar} alt="User Avatar" className="w-8 h-8 rounded-full"/>
           <h1 className="md:text-2xl text-xl font-semibold">Hi, {data?.first_name}</h1>
        </div>
       
        <div className="flex items-center hover:cursor-pointer space-x-4 mr-1">
          <div><RiCustomerService2Line className='w-5 h-5'/></div>
          <div><IoMdNotificationsOutline className='w-5 h-5'/></div>
        </div>
      </div>
      <BalanceCard isHidden ={isHidden} onToggle={handleToggle}/>
      <QuickActions />
      <RecentTransactions showTransactions={!isHidden}/>
    </div>
  );
};
export default MainArea;
