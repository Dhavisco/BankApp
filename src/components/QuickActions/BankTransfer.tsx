import React from 'react';
import { Bs123 } from 'react-icons/bs';
import { MdOutlinePerson } from 'react-icons/md';
import Logo from '../icons/Logo';
import useProfile from '../hooks/useProfile';

const BankTransfer: React.FC = () => {
  const { data } = useProfile();

  const handleCopy = () => {
    const accountNumber = data.account.account_number;
    navigator.clipboard.writeText(accountNumber).then(() => {
      alert('Copied to clipboard');
    });
  };

  return (
    <div className='BankTransfer bg-white p-4 rounded-lg shadow-sm'>
      <div className='description mb-4'>
        <div className='font-medium text-sm'>Bank Transfer</div>
        <p className='text-xs text-gray-500'>Add money via mobile or internet banking</p>
      </div>
      <div className='flex flex-col lg:flex-row gap-8 lg:gap-0 lg:justify-between'>
        <div className='account-details flex flex-col gap-3'>
          <div className='flex gap-3 items-center'>
            <Bs123 className='w-6 h-6 bg-gray-100 p-1 rounded-lg' />
            <div>
              <div className='lg:text-sm text-xs text-gray-500'>Bank Account Number</div>
              <div className='lg:text-xl text-lg tracking-wide font-medium'>{data.account.account_number}</div>
            </div>
          </div>
          <div className='flex gap-3 items-center'>
            <div className='w-6 h-6 bg-gray-100 p-1 rounded-lg'>
                <Logo />
            </div>
            
            <div>
              <div className='lg:text-sm text-xs text-gray-500'>Bank</div>
              <div className='lg:text-base text-sm'>{data.account.bank_name}</div>
            </div>
          </div>
          <div className='flex gap-3 items-center'>
            <MdOutlinePerson className='w-6 h-6 bg-gray-100 p-1 rounded-lg' />
            <div>
              <div className='lg:text-sm text-xs text-gray-500'>Name</div>
              <div className='lg:text-base text-sm'>{data.first_name} {data.last_name}</div>
            </div>
          </div>
          <div className='button'>
            <button onClick={handleCopy} className='text-green-600 hover:bg-green-200 lg:text-sm text-xs font-medium rounded-3xl p-2 px-6 bg-green-100'>
              Copy Number
            </button>
          </div>
        </div>
        <div className='procedure flex flex-col gap-2 lg:mr-6'>
          <div className='mb-1 text-sm font-medium'>Add money via bank transfer in just 3 steps</div>
          <ol type='1' className='flex flex-col gap-2 text-gray-500 lg:text-base text-sm'>
            <li>
              <span className='text-green-500 font-medium'>1. </span>
              Copy the account details above. {data.account.account_number} is your account number.
            </li>
            <li>
              <span className='text-green-500 font-medium'>2. </span>
              Open the bank app you want to transfer money from.
            </li>
            <li>
              <span className='text-green-500 font-medium'>3. </span>
              Transfer the desired amount to your <span className='lowercase'>{data.account.bank_name}</span> account.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default BankTransfer;
