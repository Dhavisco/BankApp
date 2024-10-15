import React from 'react';
import {Show, Hide} from '../icons/ToggleIcon'

interface BalanceCardProps {
  isHidden: boolean;
  onToggle: () => void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({isHidden, onToggle}) => {
 
  const balance = 1250.75; // Example balance


  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Available Balance</h2>
        <button onClick={onToggle} className="text-gray-600 hover:text-black">
          {isHidden ? <Show/> : <Hide/>}
        </button>
      </div>
      <div className="mt-4 text-3xl font-bold">
        {isHidden ? '****' : `₦${balance.toFixed(2)}`}
      </div>
    </div>
  );
};

export default BalanceCard;
