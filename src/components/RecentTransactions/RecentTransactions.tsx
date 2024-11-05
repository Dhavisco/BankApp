import React from 'react';
import { MdOutlineArrowUpward, MdOutlineArrowDownward } from "react-icons/md";
import { useTransaction } from '../hooks/useProfile'; // Adjust this path accordingly

interface TransactionProp {
    showTransactions: boolean;
}

const RecentTransactions: React.FC<TransactionProp> = ({ showTransactions }) => {
    const { data } = useTransaction(''); // Fetch transactions using the custom hook
    const transactions = data?.transactions || []; // Handle cases where transactions might not be available

    // formated transaction amount
   const formatAmount = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

   const formatDateTime = (dateString: string | number | Date) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    return `${formattedDate}, ${formattedTime}`;
  };

    interface Transaction {
        id: string;
        amount: number;
        narration: string;
        created_at: string;
        transaction_type: string;
        reference:string;
        status:string;
        recipient: {
            account_name:string;
        }
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-4 lg:p-3 lg:px-4">
            <h2 className="md:text-lg font-semibold mb-2">Recent Transactions</h2>

            {showTransactions && 
                <div>
                  <div className="hidden md:block">
                    <table className="w-full text-left">
                    <thead>
                        <tr className="text-sm font-medium text-gray-600 border-b">
                        <th className="py-2">Name</th>
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
                            <tr key={transaction.id} className="border-b text-sm text-gray-900 hover:bg-gray-50">
                            <td className="py-2">{transaction.recipient.account_name}</td>
                            <td className="py-2">{formatDateTime(transaction.created_at)}</td>
                            <td className="py-2 text-sm">{transaction.reference}</td>
                            <td className="py-2">
                                <div className='flex items-center gap-2'>
                                <span className='rounded-full p-1.5 bg-gray-100'>
                                    {transaction.transaction_type === 'deposit' ? (
                                    <MdOutlineArrowDownward className='text-green-700' />
                                    ) : (
                                    <MdOutlineArrowUpward className='text-red-700' />
                                    )}
                                </span>
                                <span className='text-sm'>{transaction.narration}</span>
                                </div>
                            </td>
                            <td className="py-2 font-medium text-sm">
                                <span className={`${transaction.transaction_type === 'deposit' ? 'text-green-500' : 'text-black'} text-sm`}>
                                {transaction.transaction_type === 'deposit' ? '+' : '-'}₦{formatAmount(Math.abs(parseFloat(transaction.amount.toString())).toFixed(2))}
                                </span>
                            </td>
                            <td className="py-2 text-sm">
                                <span className='md:text-xs rounded-full bg-green-100 text-green-500 font-medium px-2'>
                                {transaction.status}
                                </span>
                            </td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan={6} className="py-4 text-center">No transactions found</td>
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
                            <div className='flex items-center gap-2'>
                            <span className='rounded-full p-1 bg-gray-100'>
                                    {transaction.transaction_type === 'deposit' ? (
                                    <MdOutlineArrowDownward className='text-green-700 text-sm' />
                                    ) : (
                                    <MdOutlineArrowUpward className='text-red-700 text-sm' />
                                    )}
                                </span>
                            <div className='flex flex-col'>
                                <span className="text-sm font-medium">{transaction.narration}</span>
                                <span className="text-xs text-gray-500">{formatDateTime(transaction.created_at)}</span>
                                <span className="text-xs text-gray-600">Reference: {transaction.reference}</span>
                            </div>
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
