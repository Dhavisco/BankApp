import React from 'react';
import { MdSaveAlt } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import { FaMoneyBills } from "react-icons/fa6";

const QuickActions: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-1 bg-white shadow-md rounded-2xl mb-6">
      <button className=" p-4 font-medium hover:text-gray-700">
        <div className='flex flex-col justify-center items-center'>
        <div><MdSaveAlt className='h-8 w-8'/></div>
        <div>Deposit</div>
        </div>
        </button>
      <button className="p-4 font-medium hover:text-gray-700">
        <div className='flex flex-col justify-center items-center'>
        <div><BiTransfer className='h-8 w-8'/></div>
        <div>Transfer</div>
        </div>
        </button>
      <button className="p-4 font-medium hover:text-gray-700">
        <div className='flex flex-col justify-center items-center'>
        <div><FaMoneyBills className='h-8 w-8'/></div>
        <div>Pay Bills</div>
        </div>
        </button>

    </div>
  );
};

export default QuickActions;
