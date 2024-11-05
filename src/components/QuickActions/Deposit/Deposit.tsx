import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BankTransfer from './BankTransfer';
import TopUp from './TopUp';

const Deposit: React.FC = () => {
  const [showBankTransfer, setShowBankTransfer] = useState(true);

  return (
    <div className='Deposit'>
      <div className='mb-8 bg-white p-5 font-medium text-gray-700 text-sm'>
        <Link to='/dashboard' className=''>
          <span className='mr-2'>{'<'}</span> </Link>
          Add Money
      </div>

      <div className='flex justify-center gap-3 mb-6'>
        <button
          className={`font-medium p-2 px-4 rounded-lg ${showBankTransfer ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
          onClick={() => setShowBankTransfer(true)}
        >
          Bank Transfer
        </button>
        <button
          className={`font-medium p-2 px-4 rounded-lg ${!showBankTransfer ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
          onClick={() => setShowBankTransfer(false)}
        >
          Top Up
        </button>
      </div>

      <div className='transition-all duration-500'>
        {showBankTransfer ? <BankTransfer /> : <TopUp setShowBankTransfer={setShowBankTransfer} />}
      </div>
    </div>
  );
};

export default Deposit;
