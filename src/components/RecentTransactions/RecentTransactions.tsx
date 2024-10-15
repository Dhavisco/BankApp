import React from 'react';

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

    <div className="bg-white shadow-md ${} rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      {showTransactions && (<ul>
        {recentTransactions.slice(0, 5).map((transaction) => (
          <li key={transaction.id} className="mb-2 flex justify-between">
            <span>{transaction.date}</span>
            <span>{transaction.description}</span>
            <span>{transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}</span>
          </li>
        ))}
      </ul>)}
    </div>
  );
};

export default RecentTransactions;
