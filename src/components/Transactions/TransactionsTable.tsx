import React, { useState } from 'react';
import { MdOutlineArrowDownward, MdOutlineArrowUpward } from 'react-icons/md';

const transactions = [
  { id: 1, reference: 'ABC123', date: '2024-01-02', amount: -150.5, description: 'Transfer to ABC', status: 'Successful' },
  { id: 2, reference: 'DEF456', date: '2024-01-03', amount: 200, description: 'Deposit', status: 'Successful' },
  { id: 3, reference: 'GHI789', date: '2024-01-04', amount: -75, description: 'Payment to XYZ', status: 'Successful' },
  { id: 4, reference: 'JKL101', date: '2024-01-05', amount: -45, description: 'Transfer to LMN', status: 'Successful' },
  // More transactions for pagination example
];

const TransactionsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5); // Show 5 transactions per page
  const [searchQuery, setSearchQuery] = useState(''); // For search bar

  // Handle search filtering
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.reference.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 lg:p-2 lg:px-4">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Reference"
          className="border border-gray-300 rounded-lg p-2 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Transactions Table */}
      <h2 className="md:text-lg font-semibold mb-2">All Transactions</h2>

      {/* Table for larger screens */}
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
            {currentTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b hover:bg-gray-50">
                <td className="py-4">{transaction.date}</td>
                <td className="py-4">{transaction.reference}</td>
                <td className="py-4">
                  <div className='flex items-center gap-2'>
                    <span className='rounded-full p-2 bg-gray-200'>
                      {transaction.amount > 0 ? <MdOutlineArrowDownward className='text-green-700' /> : <MdOutlineArrowUpward className='text-red-700' />}
                    </span>
                    <span>{transaction.description}</span>
                  </div>
                </td>
                <td className="py-4 font-medium">
                  <span className={`${transaction.amount > 0 ? 'text-green-500' : 'text-black'}`}>
                    {transaction.amount > 0 ? '+' : '-'}₦{Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </td>
                <td className="py-4">
                  <span className='text-xs rounded-full bg-green-100 text-green-500 font-medium px-2'>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* List view for small screens */}
      <div className="block md:hidden">
        <ul>
          {currentTransactions.map((transaction) => (
            <li key={transaction.id} className="border-b hover:bg-gray-50 py-4">
              <div className="flex justify-between items-start">
                <div className='flex flex-col'>
                  <span className="text-sm font-medium">{transaction.description}</span>
                  <span className="text-xs text-gray-500">{transaction.date}</span>
                  <span className="text-xs text-gray-500">Reference: {transaction.reference}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-sm font-medium ${transaction.amount > 0 ? 'text-green-500' : 'text-black'}`}>
                    {transaction.amount > 0 ? '+' : '-'}₦{Math.abs(transaction.amount).toFixed(2)}
                  </span>
                  <span className='text-xs rounded-full bg-green-100 text-green-500 font-medium px-2'>
                    {transaction.status}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm">Page {currentPage} of {totalPages}</span>
        <button
          className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
