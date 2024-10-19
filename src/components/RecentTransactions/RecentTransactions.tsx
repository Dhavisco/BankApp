import React from 'react';
import { MdOutlineArrowUpward, MdOutlineArrowDownward } from "react-icons/md";


interface TransactionProp  {
    showTransactions: boolean;
}

const recentTransactions = [
  { id: 1, date: '2024-01-02', amount: -150.5, description: 'Transfer to ABC' },
  { id: 2, date: '2024-01-03', amount: 200, description: 'Deposit' },
  { id: 3, date: '2024-01-04', amount: -75, description: 'Payment to XYZ' },
  { id: 4, date: '2024-01-04', amount: -75, description: 'Payment to XYZ' },
  { id: 5, date: '2024-01-04', amount: -75, description: 'Payment to XYZ' },
  { id: 6, date: '2024-01-04', amount: -75, description: 'Payment to XYZ' },
  // Add more transaction objects
];



const RecentTransactions: React.FC<TransactionProp> = ({showTransactions}) => {
  return (

    <div className="bg-white shadow-md ${} rounded-lg p-4 lg:p-2 lg:px-4">
      <h2 className="md:text-lg font-semibold mb-2">Transactions</h2>
      {showTransactions && (<ul>
        {recentTransactions.slice(0, 5).map((transaction) => (
          <li key={transaction.id} className="mb-4 lg:mb-1 flex justify-between">
              <div className='flex gap-2 items-center'>
                <span className='rounded-full p-2  bg-gray-200'>{transaction.amount > 0 ? <MdOutlineArrowDownward className='text-green-700'/> : <MdOutlineArrowUpward className='text-red-700'/> }</span>
                  <div className='flex flex-col'>
                    <span className='font-medium md:text-base text-sm'>{transaction.description}</span>
                      <span className='text-gray-600 text-sm'>{transaction.date}</span>
                  </div>
              </div>
            
    
            
              <div className='flex flex-col items-end'>
                <span className={`font-medium ${transaction.amount > 0 ? 'text-green-500' : 'text-black'}`}>
                  {transaction.amount > 0 ? '+': '-'}₦{Math.abs(transaction.amount).toFixed(2)}
                  </span>
                  <span className='text-[0.6rem] rounded-3xl bg-green-100 text-green-500 font-medium px-1 w-fit'>Successful</span>
              </div>
              
          </li>
        ))}
      </ul>)}
    </div>
  );
};

export default RecentTransactions;
