

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosCloseCircle, IoIosSync } from 'react-icons/io';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTransfer, useValidate } from '../hooks/useActions';
import { ImCancelCircle } from "react-icons/im";
import { SiTicktick } from "react-icons/si";
import { useProfile } from '../hooks/useProfile';

const Transfer = () => {
  const navigate = useNavigate();
  const [account_number, setAccountNumber] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [amount, setAmount] = useState('');
  const [narration, setNarration] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const { mutate: validate, data, isPending, isError, error } = useValidate();
  const { mutate: transfer, isPending: transferPending } = useTransfer();
  const { data: profile } = useProfile();


  const curBalance = profile?.account?.balance;

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAccountNumber(value);
    formik.setFieldValue('account_number', value);
  };

  const handleClearAccountNumber = () => {
    setAccountNumber('');
    formik.setFieldValue('account_number', '');
  };

  const formatAmount = (value: string): string => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const fBalance = formatAmount(curBalance);
  const transactionFee = 0.01;
  const transferAmount = curBalance - transactionFee;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(formatAmount(value));
      formik.setFieldValue('amount', value);
    }
  };

  const handleClearAmount = () => {
    setAmount('');
    formik.setFieldValue('amount', '');
  };

  const handleClearNarration = () => {
    setNarration('');
    formik.setFieldValue('narration', '');
  };

  const formik = useFormik({
    initialValues: {
      account_number: '',
      amount: '',
      narration: '',
    },
    validationSchema: Yup.object({
      account_number: Yup.number().required('Account number is required'),
      ...(showSuccess && {
        amount: Yup.number()
          .required('Amount is required')
          .min(100, 'Minimum transfer amount is 100')
          .max(transferAmount, `Insufficent funds. Your current balance is ${fBalance}`),
        narration: Yup.string()
          .required('Please provide a description')
          .max(100, 'Description too long'),
      }),
    }),
    onSubmit: (values) => {
      if (!showSuccess) {
        validate(
          { account_number: Number(values.account_number) },
          {
            onSuccess: () => {
              setShowSuccess(true);
            },
            onError: (error) => {
              const errorMessage = getErrorMessage(error);
              setModalMessage(errorMessage || 'An unexpected error occurred');
              setShowErrorModal(true);
            },         
          });
      } else {
        transfer(
          {
            account_number: Number(values.account_number),
            amount: Number(values.amount.replace(/,/g, '')),
            narration: values.narration,
          },
          {
            onSuccess: () => {
              setModalMessage(`Successfully transferred ₦${formatAmount(values.amount)} to ${data.account_name}`);
              setShowSuccessModal(true);
            },
            onError: (error) => {
              setModalMessage(getTransferErrorMessage(error));
              setShowErrorModal(true);
            },
          }
        );
      }
    },
  });

const getErrorMessage = (error: unknown): string | null => {
  if (!error) return null;

  if (typeof error === 'object' && error !== null && 'message' in error) {
      const errorMessage = (error as { message: string }).message;
      if (errorMessage.includes('422') || errorMessage.includes('not found')) {
          return 'Account not found. Please check the account number and try again.';
      }
  }

  return 'We are having trouble validating the account, Contact Support';
};

  const getTransferErrorMessage = (error: unknown): string => {
    if (!error) return 'An unexpected error occurred';

    if (typeof error === 'object' && error !== null && 'message' in error) {
      const errorMessage = (error as { message: string }).message;
      if (errorMessage.includes('insufficient')) {
        return 'Insufficient funds. Please check your balance and try again.';
      }
    }

    return 'Transfer failed. Please try again or contact support.';
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate('/dashboard');
  };

  const handleErrorClose = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="Transfer">
      <div className="mb-8 bg-white p-5">
        <Link to="/dashboard" className="font-medium text-gray-700 text-sm">
          <span className="mr-2 text-lg">{'<'}</span>
        </Link>
        Transfer to Bank Account
      </div>

      <div className="Transfer bg-white p-4 rounded-lg shadow-sm">
        {isError && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">
            {getErrorMessage(error)}
          </div>
        )}

        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="text-sm font-medium text-gray-900 mb-4">
            {showSuccess ? 'Transfer Details' : 'Recipient Account'}
          </div>

          {!showSuccess ? (
            <div className="relative mb-2">
              <input
                type="text"
                name="account_number"
                placeholder="Enter 10 digits Account Number"
                value={account_number}
                onChange={handleAccountNumberChange}
                onBlur={formik.handleBlur}
                className="w-3/4 border-0 border-b border-gray-300 focus:border-green-500 outline-none"
                inputMode="numeric"
                maxLength={10}
              />
              {account_number && (
                <IoIosCloseCircle
                  className="absolute right-2 lg:right-8 top-0 text-gray-300 hover:cursor-pointer"
                  onClick={handleClearAccountNumber}
                />
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="account-details mb-6">
                <div className="text-xs text-gray-600 font-medium">Bank Details</div>
                <div className="text-sm p-2 rounded mb-1">{data.bank_name}</div>
                <div className="bg-green-100 text-green-600 text-sm p-2 rounded mb-4">
                  {data.account_name}
                </div>
                <div className="text-xs text-gray-600 font-normal">Current balance: ₦ {formatAmount(curBalance)} </div>
                <div className="text-xs text-gray-600 font-normal">Transaction Fee: ₦ {transactionFee} </div>
              </div>

              <div className="relative">
                <label className="text-sm text-gray-600">Amount</label>
                <br />
                <span className="text-sm font-medium mr-1.5">₦</span>
                <input
                  type="text"
                  name="amount"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={handleAmountChange}
                  onBlur={formik.handleBlur}
                  className="border-0 border-b border-gray-300 focus:border-green-500 outline-none"
                  inputMode="numeric"
                />
                {amount && (
                  <IoIosCloseCircle
                    className="absolute right-2 lg:right-8 top-0 text-gray-300 hover:cursor-pointer"
                    onClick={handleClearAmount}
                  />
                )}
                {formik.touched.amount && formik.errors.amount && (
                  <div className="text-red-600 text-xs mt-1">{formik.errors.amount}</div>
                )}
              </div>

              <div className="relative">
                <label className="text-sm text-gray-600">Description</label>
                <br />
                <input
                  type="text"
                  name="narration"
                  placeholder="What's this transfer for?"
                  value={formik.values.narration}
                  onChange={(e) => {
                    setNarration(e.target.value);
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                  className="w-5/6 border-0 border-b border-gray-300 focus:border-green-500 outline-none mt-1"
                />
                {narration && (
                  <IoIosCloseCircle
                    className="absolute right-2 lg:right-8 top-0 text-gray-300 hover:cursor-pointer"
                    onClick={handleClearNarration}
                  />
                )}
                {formik.touched.narration && formik.errors.narration && (
                  <div className="text-red-600 text-xs mt-1">{formik.errors.narration}</div>
                )}
              </div>
            </div>
          )}
          <div className='flex justify-center'>
          <button
            type="submit"
            disabled={
              (!showSuccess && (formik.values.account_number.length !== 10 || isPending)) ||
              (showSuccess && (parseFloat(formik.values.amount.replace(/,/g, '')) < 100 || transferPending))
            }
            className={`font-medium mt-6 p-2 w-4/5 ${
              ((!showSuccess && formik.values.account_number.length === 10) ||
                (showSuccess && formik.values.amount && formik.values.narration)) &&
              !isPending
                ? 'bg-green-500 text-white'
                : 'bg-gray-300 text-gray-500'
            } rounded`}
          >
            {isPending || transferPending ? (
              <IoIosSync className="inline animate-spin mr-2"/>) : (
              ''
            )}
            {showSuccess ? 'Transfer' : 'Validate'}
          </button>
          </div>
          
        </form>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="modal fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="modal-content bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="lg:text-lg text-sm text-black">{modalMessage}</p>
              <div className='flex justify-center mt-3'><SiTicktick className='w-10 h-10 text-green-400 text-center'/></div>
              <button
                onClick={handleSuccessClose}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Error Modal */}
        {showErrorModal && (
          <div className="modal fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="modal-content bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="lg:text-sm text-red-600">{modalMessage}</p>
              <div className='flex justify-center mt-3'><ImCancelCircle className='w-10 h-10 text-red-400 text-center'/></div>
              
              <button
                onClick={handleErrorClose}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transfer;