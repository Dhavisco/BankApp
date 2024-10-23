import React from 'react';
import { MdOutlineArrowUpward, MdOutlineArrowDownward } from "react-icons/md";
import { useTransactions } from '../hooks/useProfile'; // Adjust this path accordingly

interface TransactionProp {
    showTransactions: boolean;
}

const RecentTransactions: React.FC<TransactionProp> = ({ showTransactions }) => {
    const { data } = useTransactions(); // Fetch transactions using the custom hook
    const transactions = data?.transactions || []; // Handle cases where transactions might not be available

    interface Transaction {
        id: string;
        amount: number;
        narration: string;
        created_at: string;
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-4 lg:p-2 lg:px-4">
            <h2 className="md:text-lg font-semibold mb-2">Recent Transactions</h2>
            {showTransactions && (
                <ul>
                    {transactions.slice(0, 5).map((transaction: Transaction) => (
                        <li key={transaction.id} className="mb-4 lg:mb-1 flex justify-between">
                            <div className='flex gap-2 items-center'>
                                <span className='rounded-full p-2 bg-gray-200'>
                                    {transaction.amount > 0 ? (
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
                                <span className={`font-medium ${transaction.amount > 0 ? 'text-green-500' : 'text-black'}`}>
                                    {transaction.amount > 0 ? '+' : '-'}₦{Math.abs(transaction.amount).toFixed(2)}
                                </span>
                                <span className='text-[0.6rem] rounded-3xl bg-green-100 text-green-500 font-medium px-1 w-fit'>Successful</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RecentTransactions;
