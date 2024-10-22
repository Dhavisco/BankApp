import React from 'react';
import { MdSaveAlt } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import { FaMoneyBills } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const QuickActions: React.FC = () => {
  return (
    <div className="grid grid-cols-3 text-sm md:text-base gap-1 bg-white shadow-md rounded-2xl mb-6 lg:mb-3">
      <button className="p-4 font-medium hover:text-gray-700">
        <div className='flex flex-col justify-center items-center'>
          <div><MdSaveAlt className='h-8 w-8' /></div>
          <Link to="/dashboard/deposit">Deposit</Link> {/* Navigation Link */}
        </div>
      </button>

      <button className="p-4 font-medium hover:text-gray-700">
        <div className='flex flex-col justify-center items-center'>
          <div><BiTransfer className='h-8 w-8' /></div>
          <Link to="/dashboard/transfer">Transfer</Link> {/* Navigation Link */}
        </div>
      </button>

      <button className="p-4 font-medium hover:text-gray-700">
        <div className='flex flex-col justify-center items-center'>
          <div><FaMoneyBills className='h-8 w-8' /></div>
          <Link to="/dashboard/pay-bills">Pay Bills</Link> {/* Navigation Link */}
        </div>
      </button>
    </div>
  );
};

export default QuickActions;
