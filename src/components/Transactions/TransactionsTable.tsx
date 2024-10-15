import React, { useState } from 'react';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

const transactions = [
  { id: 1, date: '2024-01-02', reference: 'TRX1234', amount: -150.5, description: 'Transfer to ABC' },
  { id: 1, date: '2024-01-02', reference: 'TRX1234', amount: -150.5, description: 'Transfer to ABC' },
  { id: 1, date: '2024-01-02', reference: 'TRX1234', amount: -150.5, description: 'Transfer to ABC' },
  { id: 1, date: '2024-01-02', reference: 'TRX1234', amount: -150.5, description: 'Transfer to ABC' },
  { id: 1, date: '2024-01-02', reference: 'TRX1234', amount: -150.5, description: 'Transfer to ABC' },
  // Add more transaction objects
];

const TransactionsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  return (
    <div className="p-6">
      <SearchBar />
      <table className="w-full table-auto bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Reference</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map(transaction => (
            <tr key={transaction.id}>
              <td className="border px-4 py-2">{transaction.date}</td>
              <td className="border px-4 py-2">{transaction.reference}</td>
              <td className="border px-4 py-2">{transaction.description}</td>
              <td className="border px-4 py-2">{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Pagination
        totalTransactions={transactions.length}
        transactionsPerPage={transactionsPerPage}
        paginate={setCurrentPage}
      /> */}
    </div>
  );
};

export default TransactionsTable;
