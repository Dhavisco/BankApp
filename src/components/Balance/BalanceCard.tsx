import React from 'react';
import {Show, Hide} from '../icons/ToggleIcon'
import useProfile from '../hooks/useProfile';

interface BalanceCardProps {
  isHidden: boolean;
  onToggle: () => void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({isHidden, onToggle}) => {
 

  const {data} = useProfile();

  // const balance = 1250.75; // Example balance

  const balance = data?.account.balance;


  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-6 lg:mb-3">
      <div className="flex justify-between items-center">
        <h2 className="md:text-xl text-base font-semibold">Available Balance</h2>
        <button onClick={onToggle} className="text-gray-600 bg-gray-200 rounded-2xl p-1 hover:text-black">
          {isHidden ? <Show/> : <Hide/>}
        </button>
      </div>
      <div className="mt-4 text-3xl font-bold">
        {isHidden ? '****' : `₦${balance}`}
      </div>
    </div>
  );
};

export default BalanceCard;
