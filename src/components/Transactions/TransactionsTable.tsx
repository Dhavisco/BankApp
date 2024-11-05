import React, { useState } from 'react';
import { useTransaction } from '../hooks/useProfile'; // Adjust this path accordingly
import { MdOutlineArrowDownward, MdOutlineArrowUpward } from 'react-icons/md';
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
const TransactionsTable: React.FC = () => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5); // Show 5 transactions per page
  const [searchQuery, setSearchQuery] = useState(''); // For search bar
 const [searchInput, setSearchInput] = useState(''); // For search bar



  const { data } = useTransaction(searchQuery);
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

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(e.target.value);
  //   setCurrentPage(1); // Reset to page 1 on search
  // };

  const changeHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchQuery(searchInput);
      setCurrentPage(1); // Reset to page 1 on search
    }
  };

  interface Transactions {
        id: string | number;
        created_at: string | number | Date;
        reference: string;
        transaction_type: string;
        narration: string;
        amount: number;
        status: string;
        recipient: {
        account_name: string;
        }
        
  }

  return (
    <div className="bg-white shadow-md rounded-lg md:mt-4 p-4 lg:p-6 lg:px-5">
      <h2 className="md:text-lg font-semibold mb-4">All Transactions</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Reference"
          className="border border-gray-300 rounded-lg p-1 w-full"
          // value={searchQuery}
          // onChange={changeHandler}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={changeHandler} // Trigger search on Enter key
        />
      </div>

      {/* Transactions Table */}
      {/* Table for larger screens */}
      <div className="hidden md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm font-medium text-gray-600 border-b">
              <th className="py-2">Name</th>
              <th className="py-2">Date</th>
              <th className="py-2">Reference</th>
              <th className="py-2">Narration</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.length > 0 ? (
              currentTransactions.map((transaction: Transactions) => (
                <tr key={transaction.id} className="border-b md:text-sm lg:text-base text-gray-900 hover:bg-gray-50">
                  <td className="py-4">{transaction.recipient.account_name}</td>
                  <td className="py-4">{formatDateTime(transaction.created_at)}</td>
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
                <td colSpan={6} className="py-4 text-center">No transactions found</td>
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
                                <span className="text-sm font-medium">{transaction.transaction_type === 'deposit' ? 'Deposit' : `Transfer to ${transaction.recipient.account_name}`}</span>
                                <span className="text-xs">Narration: {transaction.narration}</span>
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

      {/* Pagination Controls */}
      {currentTransactions.length > 0 ? (<div className="flex justify-end items-center gap-1.5 lg:gap-2 mt-6">
        <button
          className={`lg:p-1.5 p-1 rounded-full ${currentPage === 1 ? 'bg-gray-300' : 'bg-green-600 hover:bg-green-700 text-white'}`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <GrLinkPrevious className='text-xs lg:text-base' />
        </button>
        <span className="text-sm text-gray-800">Page {currentPage} of {totalPages > 0 ? totalPages : 1}</span>
        <button
          className={`lg:p-1.5 p-1 rounded-full ${currentPage === totalPages || totalPages === 0 ? 'bg-gray-300' : 'bg-green-600 hover:bg-green-700 text-white'}`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <GrLinkNext className='text-xs lg:text-base'/>
        </button>
      </div>): null}


    </div>
  );
};

export default TransactionsTable;

