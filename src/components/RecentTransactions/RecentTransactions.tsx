import React from 'react';
import { MdOutlineArrowUpward, MdOutlineArrowDownward } from "react-icons/md";
import { useTransactions } from '../hooks/useProfile'; // Adjust this path accordingly

interface TransactionProp {
    showTransactions: boolean;
}

const RecentTransactions: React.FC<TransactionProp> = ({ showTransactions }) => {
    const { data } = useTransactions(); // Fetch transactions using the custom hook
    const transactions = data?.transactions || []; // Handle cases where transactions might not be available

    // formated transaction amount
   const formatAmount = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

    interface Transaction {
        id: string;
        amount: number;
        narration: string;
        created_at: string;
        transaction_type: string;
        reference:string;
        status:string;
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-4 lg:p-2 lg:px-4">
            <h2 className="md:text-lg font-semibold mb-1">Recent Transactions</h2>
            {/* {showTransactions && (
                <ul>
                    {transactions.length > 0 ?
                    (transactions.slice(0, 5).map((transaction: Transaction) => (
                        <li key={transaction.id} className="mb-4 lg:mb-1 flex justify-between">
                            <div className='flex gap-2 items-center'>
                                <span className='rounded-full p-2 bg-gray-200'>
                                    {transaction.transaction_type === 'deposit' ? (
                                        <MdOutlineArrowDownward className='text-green-700' />
                                    ) : (
                                        <MdOutlineArrowUpward className='text-red-700' />
                                    )}
                                </span>
                                <div className='flex flex-col'>
                                    <span className='font-medium md:text-base text-sm'>{transaction.narration}</span>
                                    <span className='text-gray-600 text-sm'>{new Date(transaction.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className='flex flex-col items-end'>
                                <span className={`font-medium ${transaction.transaction_type === 'deposit' ? 'text-green-500' : 'text-black'}`}>
                                    {transaction.transaction_type === 'deposit' ? '+' : '-'}₦{Math.abs(transaction.amount).toFixed(2)}
                                </span>
                                <span className='text-[0.6rem] rounded-3xl bg-green-100 text-green-500 font-medium px-1 w-fit'>Successful</span>
                            </div>
                        </li>
                    ))) : 
                    <li className="py-4 text-center">No transactions found</li>
                    }
                </ul>
            )} */}


            {showTransactions && 
                <div>
                  <div className="hidden md:block">
                    <table className="w-full text-left">
                    <thead>
                        <tr className="text-sm font-medium text-gray-600 border-b">
                        <th className="py-2">Date</th>
                        <th className="py-2">Reference</th>
                        <th className="py-2">Description</th>
                        <th className="py-2">Amount</th>
                        <th className="py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length > 0 ? (
                        transactions.slice(0, 5).map((transaction: Transaction) => (
                            <tr key={transaction.id} className="border-b hover:bg-gray-50">
                            <td className="py-1 text-sm">{new Date(transaction.created_at).toLocaleDateString()}</td>
                            <td className="py-1 text-sm">{transaction.reference}</td>
                            <td className="py-1">
                                <div className='flex items-center gap-2'>
                                <span className='rounded-full p-2 bg-gray-200'>
                                    {transaction.transaction_type === 'deposit' ? (
                                    <MdOutlineArrowDownward className='text-green-700' />
                                    ) : (
                                    <MdOutlineArrowUpward className='text-red-700' />
                                    )}
                                </span>
                                <span className='text-sm'>{transaction.narration}</span>
                                </div>
                            </td>
                            <td className="py-1 font-medium text-sm">
                                <span className={`${transaction.transaction_type === 'deposit' ? 'text-green-500' : 'text-black'} text-sm`}>
                                {transaction.transaction_type === 'deposit' ? '+' : '-'}₦{formatAmount(Math.abs(parseFloat(transaction.amount.toString())).toFixed(2))}
                                </span>
                            </td>
                            <td className="py-1 text-sm">
                                <span className='md:text-xs rounded-full bg-green-100 text-green-500 font-medium px-2'>
                                {transaction.status}
                                </span>
                            </td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan={5} className="py-4 text-center">No transactions found</td>
                        </tr>
                        )}
                    </tbody>
                    </table>
                  </div>

      {/* List view for small screens */}
                <div className="block md:hidden">
                    <ul>
                    {transactions.length > 0 ? (
                        transactions.slice(0, 5).map((transaction: Transaction) => (
                        <li key={transaction.id} className="border-b hover:bg-gray-50 py-2">
                            <div className="flex justify-between items-start">
                            <div className='flex flex-col'>
                                <span className="text-sm font-medium">{transaction.narration}</span>
                                <span className="text-xs text-gray-500">{new Date(transaction.created_at).toLocaleDateString()}</span>
                                <span className="text-xs text-gray-600">Reference: {transaction.reference}</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className={`text-sm font-medium ${transaction.transaction_type === 'deposit' ? 'text-green-500' : 'text-black'}`}>
                                {transaction.transaction_type === 'deposit' ? '+' : '-'}₦{formatAmount(Math.abs(parseFloat(transaction.amount.toString())).toFixed(2))}
                                </span>
                                <span className='text-[0.7rem] rounded-full bg-green-100 text-green-500 font-medium px-2'>
                                {transaction.status}
                                </span>
                            </div>
                            </div>
                        </li>
                        ))
                    ) : (
                        <li className="border-b py-4 text-center">No transactions found</li>
                    )}
                    </ul>
                </div>
        </div>  
            }
        </div>
    );
};

export default RecentTransactions;
