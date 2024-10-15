import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import MainArea from '../../components/MainArea/MainArea';
import TransactionsTable from '../../components/Transactions/TransactionsTable';

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 p-6">
        <Routes>
          {/* Home route, showing balance, quick actions, recent transactions */}
          <Route path="/home" element={<MainArea />} />

          {/* Transactions route, showing all transactions */}
          <Route path="/transactions" element={<TransactionsTable />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
