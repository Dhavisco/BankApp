import React from 'react';
import {Show, Hide} from '../icons/ToggleIcon'
import {useProfile} from '../hooks/useProfile';
import { AiFillSafetyCertificate } from "react-icons/ai";

interface BalanceCardProps {
  isHidden: boolean;
  onToggle: () => void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({isHidden, onToggle}) => {
 

  const {data} = useProfile();

  // const balance = 1250.75; // Example balance

  const balance = data?.account.balance;

  const formatBalance = (balance: number) => {
  return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};


  return (
    <div className="bg-gradient-to-tr from-green-600 text-white to-green-300 shadow-md rounded-2xl p-4 mb-6 lg:mb-3">
      <div className="flex justify-between items-center">
        <div className='flex items-center gap-[0.15rem]'>
          <span><AiFillSafetyCertificate className='h-5 w-auto'/></span>
           <h2 className="md:text-xl text-base text-white font-light">Available Balance</h2>
        </div>
       
        <button onClick={onToggle} className="text-gray-600 bg-gray-200 rounded-2xl p-1 hover:text-black">
          {isHidden ? <Show/> : <Hide/>}
        </button>
      </div>
      <div className="mt-3 ml-4 md:text-3xl text-2xl font-bold">
        {isHidden ? '****' : `₦${formatBalance(balance)}`}
      </div>
    </div>
  );
};

export default BalanceCard;
