import React, { useState } from 'react';
import { useTransactions } from '../hooks/useProfile'; // Adjust this path accordingly
import { MdOutlineArrowDownward, MdOutlineArrowUpward } from 'react-icons/md';

const TransactionsTable: React.FC = () => {
  const { data } = useTransactions();
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5); // Show 5 transactions per page
  const [searchQuery, setSearchQuery] = useState(''); // For search bar

  // Check if data is available and extract transactions
  const transactions = data?.transactions || [];

  // Handle search filtering
  const filteredTransactions = transactions.filter((transaction: { reference: string }) =>
    transaction.reference.toLowerCase().trim().includes(searchQuery.toLowerCase().trim())
  );

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  // formated transaction amount
   const formatAmount = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  //format Date
  // const formatDate = (dateString) => { 
  //   const date = new Date(dateString); 
  //   const options = { day: 'numeric', month: 'short', year: 'numeric' }; 
  //   const formattedDate = date.toLocaleDateString('en-GB', options).replace(',', ''); 
  //   const day = date.getDate(); 
  //   const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th'; return formattedDate.replace(date.getDate(), `${day}${suffix}`); };


  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  interface Transactions {
        id: string | number;
        created_at: string | number | Date;
        reference: string;
        transaction_type: string;
        narration: string;
        amount: number;
        status: string;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 lg:p-2 lg:px-4">
      <h2 className="md:text-lg font-semibold mb-4">All Transactions</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Reference"
          className="border border-gray-300 rounded-lg p-1 w-full"
          value={searchQuery}
          onChange={changeHandler}
        />
      </div>

      {/* Transactions Table */}
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
            {currentTransactions.length > 0 ? (
              currentTransactions.map((transaction: Transactions) => (
                <tr key={transaction.id} className="border-b hover:bg-gray-50">
                  <td className="py-4">{new Date(transaction.created_at).toLocaleDateString()}</td>
                  <td className="py-4">{transaction.reference}</td>
                  <td className="py-4">
                    <div className='flex items-center gap-2'>
                      <span className='rounded-full p-1.5 bg-gray-100'>
                        {transaction.transaction_type === 'deposit' ? (
                          <MdOutlineArrowDownward className='text-green-700' />
                        ) : (
                          <MdOutlineArrowUpward className='text-red-700' />
                        )}
                      </span>
                      <span>{transaction.narration}</span>
                    </div>
                  </td>
                  <td className="py-4 font-medium">
                    <span className={`${transaction.transaction_type === 'deposit' ? 'text-green-500' : 'text-black'}`}>
                      {transaction.transaction_type === 'deposit' ? '+' : '-'}₦{formatAmount(Math.abs(parseFloat(transaction.amount.toString())).toFixed(2))}
                    </span>
                  </td>
                  <td className="py-4">
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
          {currentTransactions.length > 0 ? (
            currentTransactions.map((transaction: Transactions) => (
              <li key={transaction.id} className="border-b hover:bg-gray-50 py-4">
                <div className="flex justify-between items-start">
                   <div className='flex items-center gap-2'>
                            <span className='rounded-full p-1.5 bg-gray-100'>
                                    {transaction.transaction_type === 'deposit' ? (
                                    <MdOutlineArrowDownward className='text-green-700 text-sm' />
                                    ) : (
                                    <MdOutlineArrowUpward className='text-red-700 text-sm' />
                                    )}
                                </span>
                            <div className='flex flex-col'>
                                <span className="text-sm font-medium">{transaction.narration}</span>
                                <span className="text-xs text-gray-500">{new Date(transaction.created_at).toLocaleDateString()}</span>
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

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300' : 'bg-green-500 hover:bg-green-600 text-white'}`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm">Page {currentPage} of {totalPages > 0 ? totalPages : 1}</span>
        <button
          className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300' : 'bg-green-500 hover:bg-green-600 text-white'}`}
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

