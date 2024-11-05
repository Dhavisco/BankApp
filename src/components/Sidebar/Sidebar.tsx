import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../icons/Logo';
import { FaHome, FaMoneyBill, FaUser } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { useProfile } from '../hooks/useProfile';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const {data} = useProfile();

  return (
    <div className="w-64 flex flex-col justify-between bg-green-100 h-full p-4">
      <div>
        <div className='h-10 w-10 cursor-pointer my-4'>
          <Logo/>
        </div>
       <ul>
  <li className={`mb-4 ${isActive('/dashboard') ? 'bg-green-200 text-green-700' : 'font-semibold'}`}>
    <Link to="/dashboard" className="p-2 rounded hover:bg-green-300 flex items-center gap-2">
      <FaHome className='text-gray-600'/>
      Home
    </Link>
  </li>
  <li className={`mb-4 ${isActive('/dashboard/transactions') ? 'bg-green-200 text-green-700' : 'font-semibold'}`}>
    <Link to="/dashboard/transactions" className="p-2 rounded hover:bg-green-300 flex items-center gap-2">
      <FaMoneyBill className='text-gray-600'/>
      Transactions
    </Link>
  </li>
  <li className={`mb-4 ${isActive('/dashboard/account') ? 'bg-green-200 text-green-700' : 'font-semibold'}`}>
    <Link to="/dashboard/account" className="p-2 rounded hover:bg-green-300 flex items-center gap-2">
      <FaUser className='text-gray-600'/>
      Account
    </Link>
  </li>
  <li className={`mb-4 ${isActive('/dashboard/settings') ? 'bg-green-200 text-green-700' : 'font-semibold'}`}>
    <Link to="/dashboard/settings" className="p-2 rounded hover:bg-green-300 flex items-center gap-2">
      <IoMdSettings className='text-gray-600'/>
      Settings
    </Link>
  </li>
</ul>
      </div>

      <div className='flex items-center hover:cursor-pointer ml-[-2px] mb-2 gap-1'>
        <img src={data?.avatar} className="h-10 w-10 rounded-full border-gray-600 hover:border-gray-700 border-2"></img>
        <div className='font-medium hover:font-semibold'>
          <div>{data?.first_name} {data?.last_name}</div>
          <div className='text-sm'>{data?.email}</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
