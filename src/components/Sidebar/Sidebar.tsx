import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../icons/Logo';
import { IoLogOut } from "react-icons/io5";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-56 flex flex-col justify-between bg-green-100 h-full p-4">
      <div>
        <div className='h-10 w-10 my-4'>
          <Logo/>
        </div>
        <ul>
          <li className={`mb-4 ${isActive('/dashboard') ? 'bg-green-200 text-green-700' : 'font-semibold'}`}>
            <Link to="/dashboard" className={`p-2 block rounded hover:bg-green-300`}>Home</Link>
          </li>
          <li className={`mb-4 ${isActive('/dashboard/transactions') ? 'bg-green-200 text-green-700' : 'font-semibold'}`}>
            <Link to="/dashboard/transactions" className={`p-2 block rounded hover:bg-green-300`}>Transactions</Link>
          </li>
          <li className={`mb-4 ${isActive('/dashboard/profile') ? 'bg-green-200 text-green-700' : 'font-semibold'}`}>
            <Link to="/dashboard/profile" className={`p-2 block rounded hover:bg-green-300`}>Profile</Link>
          </li>
          <li className={`mb-4 ${isActive('/dashboard/settings') ? 'bg-green-200 text-green-700' : 'font-semibold'}`}>
            <Link to="/dashboard/profile" className={`p-2 block rounded hover:bg-green-300`}>Settings</Link>
          </li>
        </ul>
      </div>

      <div className='flex items-center hover:text-gray-700 gap-2'>
        <Link to="/" className="font-semibold">Logout</Link>
        <IoLogOut className='h-6 w-6'/>
      </div>
    </div>
  );
};

export default Sidebar;
