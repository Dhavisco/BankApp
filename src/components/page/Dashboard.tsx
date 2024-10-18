
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import MainArea from '../../components/MainArea/MainArea';
import TransactionsTable from '../../components/Transactions/TransactionsTable';
import MobileNav from '../Sidebar/MobileNav';

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

     <div className='h-screen hidden lg:block'>
    <Sidebar />
     </div>
     

      {/* Main Area */}
      <div className="flex-1 p-6">
        <Routes>
          {/* Home route, showing balance, quick actions, recent transactions */}
          <Route path="" element={<MainArea />} />

          {/* Transactions route, showing all transactions */}
          <Route path="transactions" element={<TransactionsTable />} />
        </Routes>
      </div>

      <MobileNav/>
    </div>
  );
};

export default Dashboard;
