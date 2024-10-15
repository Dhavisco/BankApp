// import React from 'react';
// import { useAuth } from '../context/useAuth'; // Assuming the user's info is available via the auth context
// import { useNavigate } from 'react-router-dom';

// const Dashboard: React.FC = () => {
//   const { user, logout } = useAuth(); // Getting user info from context
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout(); // Log the user out
//     navigate('/login'); // Redirect to login page after logout
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header */}
//       <header className="bg-blue-600 text-white py-4 shadow-md">
//         <div className="container mx-auto flex justify-between items-center px-6">
//           <h1 className="text-xl font-bold">Bank App</h1>
//           <div className="flex items-center">
//             <span className="mr-4">Welcome, {user?.email}</span>
//             <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="container mx-auto flex flex-grow px-6 py-8">
//         <aside className="w-64 bg-gray-100 p-6 rounded-lg mr-8">
//           <nav>
//             <ul>
//               <li className="mb-4">
//                 <a href="/dashboard" className="text-gray-700 font-bold">Home</a>
//               </li>
//               <li className="mb-4">
//                 <a href="/accounts" className="text-gray-700">Accounts</a>
//               </li>
//               <li className="mb-4">
//                 <a href="/transfer" className="text-gray-700">Transfers</a>
//               </li>
//               <li className="mb-4">
//                 <a href="/profile" className="text-gray-700">Profile</a>
//               </li>
//               <li className="mb-4">
//                 <a href="/settings" className="text-gray-700">Settings</a>
//               </li>
//             </ul>
//           </nav>
//         </aside>

//         <main className="flex-grow">
//           {/* Account Summary */}
//           <section className="mb-8">
//             <h2 className="text-2xl font-semibold mb-4">Account Summary</h2>
//             <div className="bg-white shadow rounded-lg p-6">
//               <p>Current Balance: $10,000</p>
//               <p>Savings: $5,000</p>
//             </div>
//           </section>

//           {/* Recent Transactions */}
//           <section className="mb-8">
//             <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
//             <div className="bg-white shadow rounded-lg p-6">
//               <ul>
//                 <li className="flex justify-between mb-2">
//                   <span>10/13/2024 - Withdrawal</span>
//                   <span>- $500</span>
//                 </li>
//                 <li className="flex justify-between mb-2">
//                   <span>10/12/2024 - Deposit</span>
//                   <span>+ $1,000</span>
//                 </li>
//               </ul>
//             </div>
//           </section>

//           {/* Quick Actions */}
//           <section>
//             <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
//             <div className="flex space-x-4">
//               <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
//                 Transfer Funds
//               </button>
//               <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
//                 Pay Bills
//               </button>
//               <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
//                 View Statements
//               </button>
//             </div>
//           </section>
//         </main>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white text-center py-4">
//         <div className="container mx-auto">
//           <p>© 2024 Bank App. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import MainArea from '../../components/MainArea/MainArea';
import TransactionsTable from '../../components/Transactions/TransactionsTable';

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
    </div>
  );
};

export default Dashboard;
