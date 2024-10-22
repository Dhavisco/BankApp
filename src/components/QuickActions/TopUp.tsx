// import React, { useEffect, useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { IoIosCloseCircle } from 'react-icons/io';
// import useDeposit from '../hooks/useActions';

// const TopUp = ({ setShowBankTransfer }: { setShowBankTransfer: React.Dispatch<React.SetStateAction<boolean>> }) => {
//   const [amount, setAmount] = useState('');
//   const [narration, setNarration] = useState('');
//     const [showSuccess, setShowSuccess] = useState(false);
//     const [isFormReset, setIsFormReset] = useState(false); // Tracks form reset after success

//   const { mutate: deposit, isPending, isError, isSuccess, error } = useDeposit();

//   const formatAmount = (value: string) => {
//     return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//   };

//   const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/,/g, '');
//     if (/^\d*\.?\d*$/.test(value)) {
//       setAmount(formatAmount(value));
//       formik.setFieldValue('amount', value);
//     }
//   };

//   const handleNarrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNarration(e.target.value);
//     formik.setFieldValue('narration', e.target.value);
//   };

//   const handleClearAmount = () => {
//     setAmount('');
//     formik.setFieldValue('amount', '');
//   };

//   const handleClearNarration = () => {
//     setNarration('');
//     formik.setFieldValue('narration', '');
//   };

//   const formik = useFormik({
//     initialValues: {
//       amount: '',
//       narration: '',
//     },
//     validationSchema: Yup.object({
//       amount: Yup.number()
//         .required('Amount is required')
//         .min(100, 'Amount must be between ₦100.00 and ₦9,999.00')
//         .max(9999, 'Amount must be between ₦100.00 and ₦9,999.00'),
//       narration: Yup.string()
//         .required('Narration is required')
//         .max(50, 'Narration must be 50 characters or less'),
//     }),
//     onSubmit: (values) => {
//       console.log('Form data', values);
//       deposit({
//         ...values,
//         amount: parseFloat(values.amount)
//       });
//     },
//   });


//    // Reset the form and show success message after deposit is successful
//    useEffect(() => {
//     if (isSuccess && !isFormReset) {
//       formik.resetForm(); // Reset the form
//       setAmount(''); // Reset amount
//       setNarration(''); // Reset narration
//       setShowSuccess(true); // Show success message
//       setIsFormReset(true); // Set flag to prevent further resets

//       // Remove success message after 3 seconds
//       const timer = setTimeout(() => {
//         setShowSuccess(false);
//         setIsFormReset(false); // Allow form reset again for future submissions
//       }, 3000);

//       // Cleanup the timer on unmount
//       return () => clearTimeout(timer);
//     }
//   }, [isSuccess, isFormReset, formik]);

//   const handleBankTransferClick = () => {
//     setShowBankTransfer(true);
//   };

//   return (
//     <div className="TopUp bg-white p-4 rounded-lg shadow-sm">
//       <div className="description mb-6">
//         <div className="font-medium text-sm">Top-up with Card/Account</div>
//         <p className="text-xs text-gray-500">
//           Add money directly from your bank card or Account
//         </p>
//       </div>

//         {/* Display error from useDeposit hook */}
//       {isError && (
//         <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">
//           {error?.message || 'An error occurred. Please try again.'}
//         </div>
//       )}

//       {/* Display success message after deposit */}
//       {showSuccess && (
//         <div className="bg-green-100 text-green-600 text-sm p-2 rounded mb-4">
//           Deposit successful!
//         </div>
//       )}

//       <form className="form" onSubmit={formik.handleSubmit}>
//         {/* Amount Input */}
//         <div className="text-sm font-medium text-gray-900 mb-1">Amount</div>
//         <div className="relative mb-2">
//           <span className="text-sm font-medium mr-1.5">₦</span>
//           <input
//             type="text"
//             name="amount"
//             placeholder="100.00-9,999.00"
//             value={amount}
//             onChange={handleAmountChange}
//             onBlur={formik.handleBlur}
//             className="border-0 border-b border-gray-300 focus:border-green-500 outline-none"
//             inputMode="numeric"
//           />
//           {amount && <IoIosCloseCircle className="absolute right-2 lg:right-8 top-0 text-gray-300 hover:cursor-pointer" onClick={handleClearAmount} />}
//         </div>
//         {formik.touched.amount && formik.errors.amount ? (
//           <div className="text-red-600 text-xs">{formik.errors.amount}</div>
//         ) : null}

//         {/* Narration Input */}
//         <div className="text-sm font-medium text-gray-900 mt-2 mb-1">Narration</div>
//         <div className="relative mb-4">
//           <input
//             type="text"
//             name="narration"
//             placeholder="e.g Top-up"
//             value={narration}
//             onChange={handleNarrationChange}
//             onBlur={formik.handleBlur}
//             className="border-0 border-b border-gray-300 focus:border-green-500 outline-none"
//           />
//           {narration && <IoIosCloseCircle className="absolute right-2 lg:right-8 top-0 text-gray-300 hover:cursor-pointer" onClick={handleClearNarration} />}
//         </div>
//         {formik.touched.narration && formik.errors.narration ? (
//           <div className="text-red-600 text-xs">{formik.errors.narration}</div>
//         ) : null}

//         {/* Bank Transfer Option */}
//         <span className="text-xs text-gray-600 font-medium">
//           For amounts above ₦9,999.00{' '}
//           <button type="button" onClick={handleBankTransferClick} className="text-green-500 hover:text-green-600 hover:cursor-pointer">
//             use bank transfer {'>'}
//           </button>
//         </span>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={!formik.values.amount || !formik.values.narration || parseFloat(formik.values.amount) < 100 || parseFloat(formik.values.amount) > 9999}
//           className={`font-medium mt-6 p-2 w-4/5 ${
//             parseFloat(formik.values.amount) >= 100 && parseFloat(formik.values.amount) <= 9999
//               ? 'bg-green-600 hover:bg-green-500'
//               : 'bg-green-200 cursor-not-allowed'
//           } text-white rounded-3xl`}
//         >
//          {isPending ? 'Processing...' : 'Next'}
//         </button>

//       </form>
//     </div>
//   );

// };export default TopUp;

// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { IoIosCloseCircle } from 'react-icons/io';
// import useDeposit from '../hooks/useActions';

// const TopUp = ({ setShowBankTransfer }: { setShowBankTransfer: React.Dispatch<React.SetStateAction<boolean>> }) => {
//   const [amount, setAmount] = useState('');
//   const [narration, setNarration] = useState('');
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to track API errors

//   const { mutate: deposit, isPending } = useDeposit();

//   const formatAmount = (value: string) => {
//     return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//   };

//   const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/,/g, '');
//     if (/^\d*\.?\d*$/.test(value)) {
//       setAmount(formatAmount(value));
//        formik.setFieldValue('amount', value);
//     }
//   };

//   const handleNarrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNarration(e.target.value);
//      formik.setFieldValue('narration', e.target.value);
//   };

//   const handleClearAmount = () => {
//     setAmount('');
//     formik.setFieldValue('amount', '');
//   };

//   const handleClearNarration = () => {
//     setNarration('');
//      formik.setFieldValue('narration', '');
//   };

//   const formik = useFormik({
//     initialValues: {
//       amount: '',
//       narration: '',
//     },
//     validationSchema: Yup.object({
//       amount: Yup.number()
//         .required('Amount is required')
//         .min(100, 'Amount must be between ₦100.00 and ₦9,999.00')
//         .max(9999, 'Amount must be between ₦100.00 and ₦9,999.00'),
//       narration: Yup.string()
//         .required('Narration is required')
//         .max(50, 'Narration must be 50 characters or less'),
//     }),
//     onSubmit: async (values) => {
//       try {
//         setErrorMessage(null);
//         await deposit({ ...values, amount: parseFloat(values.amount) });
//         setShowSuccess(true); // Show success message
//         setAmount(''); // Clear amount input
//         setNarration(''); // Clear narration input
//         formik.resetForm(); // Reset the form

//         // Clear success message after 3 seconds
//         setTimeout(() => {
//           setShowSuccess(false);
//         }, 3000);
//       } catch (err) {

//         if (err instanceof Error) {
//                 setErrorMessage(err.message || 'An error occurred. Please try again.');
//               }
//         // Handle error
        
//       }
//     },
//   });

//   return (
//     <div className="TopUp bg-white p-4 rounded-lg shadow-sm">
//       <div className="description mb-6">
//         <div className="font-medium text-sm">Top-up with Card/Account</div>
//         <p className="text-xs text-gray-500">Add money directly from your bank card or Account</p>
//       </div>

//       {/* Display error message */}
//       {errorMessage && (
//         <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">
//           {errorMessage}
//         </div>
//       )}

//       {/* Display success message after deposit */}
//       {showSuccess && (
//         <div className="bg-green-100 text-green-600 text-sm p-2 rounded mb-4">
//           Deposit successful!
//         </div>
//       )}

//       <form className="form" onSubmit={formik.handleSubmit}>
//         {/* Amount Input */}
//         <div className="text-sm font-medium text-gray-900 mb-1">Amount</div>
//         <div className="relative mb-2">
//           <span className="text-sm font-medium mr-1.5">₦</span>
//           <input
//             type="text"
//             name="amount"
//             placeholder="100.00-9,999.00"
//             value={amount}
//             onChange={handleAmountChange}
//             onBlur={formik.handleBlur}
//             className="border-0 border-b border-gray-300 focus:border-green-500 outline-none"
//             inputMode="numeric"
//           />
//           {amount && (
//             <IoIosCloseCircle
//               className="absolute right-2 lg:right-8 top-0 text-gray-300 hover:cursor-pointer"
//               onClick={handleClearAmount}
//             />
//           )}
//         </div>
//         {formik.touched.amount && formik.errors.amount ? (
//           <div className="text-red-600 text-xs">{formik.errors.amount}</div>
//         ) : null}

//         {/* Narration Input */}
//         <div className="text-sm font-medium text-gray-900 mt-2 mb-1">Narration</div>
//         <div className="relative mb-4">
//           <input
//             type="text"
//             name="narration"
//             placeholder="e.g Top-up"
//             value={narration}
//             onChange={handleNarrationChange}
//             onBlur={formik.handleBlur}
//             className="border-0 border-b border-gray-300 focus:border-green-500 outline-none"
//           />
//           {narration && (
//             <IoIosCloseCircle
//               className="absolute right-2 lg:right-8 top-0 text-gray-300 hover:cursor-pointer"
//               onClick={handleClearNarration}
//             />
//           )}
//         </div>
//         {formik.touched.narration && formik.errors.narration ? (
//           <div className="text-red-600 text-xs">{formik.errors.narration}</div>
//         ) : null}

//         {/* Bank Transfer Option */}
//         <span className="text-xs text-gray-600 font-medium">
//           For amounts above ₦9,999.00{' '}
//           <button
//             type="button"
//             onClick={() => setShowBankTransfer(true)}
//             className="text-green-500 hover:text-green-600 hover:cursor-pointer"
//           >
//             use bank transfer {'>'}
//           </button>
//         </span>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={!formik.values.amount || !formik.values.narration || parseFloat(formik.values.amount) < 100 || parseFloat(formik.values.amount) > 9999}
//           className={`font-medium mt-6 p-2 w-4/5 ${
//             parseFloat(formik.values.amount) >= 100 && parseFloat(formik.values.amount) <= 9999
//               ? 'bg-green-600 hover:bg-green-500'
//               : 'bg-green-200 cursor-not-allowed'
//           } text-white rounded-3xl`}
//         >
//           {isPending ? 'Processing...' : 'Next'}
//         </button>
//       </form>
//     </div>
//   );
// };
// export default TopUp;

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IoIosCloseCircle } from 'react-icons/io';
import useDeposit from '../hooks/useActions';

const TopUp = ({ setShowBankTransfer }: { setShowBankTransfer: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [amount, setAmount] = useState('');
  const [narration, setNarration] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate: deposit, isPending, isError, error } = useDeposit();

  const formatAmount = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(formatAmount(value));
      formik.setFieldValue('amount', value);
    }
  };

  const handleNarrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNarration(e.target.value);
    formik.setFieldValue('narration', e.target.value);
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
      amount: '',
      narration: '',
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .required('Amount is required')
        .min(100, 'Amount must be between ₦100.00 and ₦9,999.00')
        .max(9999, 'Amount must be between ₦100.00 and ₦9,999.00'),
      narration: Yup.string()
        .required('Narration is required')
        .max(50, 'Narration must be 50 characters or less'),
    }),
      onSubmit: (values) => {
      deposit(
        { 
          amount: parseFloat(values.amount), 
          narration: values.narration 
        },
        {
          onSuccess: () => {
            setShowSuccess(true);
            setAmount('');
            setNarration('');
            formik.resetForm();
            
            setTimeout(() => {
              setShowSuccess(false);
            }, 5000);
          }
        }
      );
    },
  });

  // Get error message from the error object
  const getErrorMessage = () => {
    if (!error) return null;
    
    if (error.message?.includes('404') || error.message?.includes('not found')) {
      return ('We are having trouble connecting to our payment service, Contact Support');
    }
    
    return 'An unexpected error occurred. Please try again.';
  };

  return (
    <div className="TopUp bg-white p-4 rounded-lg shadow-sm">
      <div className="description mb-6">
        <div className="font-medium text-sm">Top-up with Card/Account</div>
        <p className="text-xs text-gray-500">Add money directly from your bank card or Account</p>
      </div>

        {/* Error Message */}
      {isError && (
        <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">
          {getErrorMessage()}
        </div>
      )}

      {/* Display success message after deposit */}
      {showSuccess && (
        <div className="bg-green-100 text-green-600 text-sm p-2 rounded mb-4">
          Deposit successful!
        </div>
      )}

      <form className="form" onSubmit={formik.handleSubmit}>
        {/* Amount Input */}
        <div className="text-sm font-medium text-gray-900 mb-1">Amount</div>
        <div className="relative mb-2">
          <span className="text-sm font-medium mr-1.5">₦</span>
          <input
            type="text"
            name="amount"
            placeholder="100.00-9,999.00"
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
        </div>
        {formik.touched.amount && formik.errors.amount ? (
          <div className="text-red-600 text-xs">{formik.errors.amount}</div>
        ) : null}

        {/* Narration Input */}
        <div className="text-sm font-medium text-gray-900 mt-2 mb-1">Narration</div>
        <div className="relative mb-4">
          <input
            type="text"
            name="narration"
            placeholder="e.g Top-up"
            value={narration}
            onChange={handleNarrationChange}
            onBlur={formik.handleBlur}
            className="border-0 border-b border-gray-300 focus:border-green-500 outline-none"
          />
          {narration && (
            <IoIosCloseCircle
              className="absolute right-2 lg:right-8 top-0 text-gray-300 hover:cursor-pointer"
              onClick={handleClearNarration}
            />
          )}
        </div>
        {formik.touched.narration && formik.errors.narration ? (
          <div className="text-red-600 text-xs">{formik.errors.narration}</div>
        ) : null}

        {/* Bank Transfer Option */}
        <span className="text-xs text-gray-600 font-medium">
          For amounts above ₦9,999.00{' '}
          <button
            type="button"
            onClick={() => setShowBankTransfer(true)}
            className="text-green-500 hover:text-green-600 hover:cursor-pointer"
          >
            use bank transfer {'>'}
          </button>
        </span>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!formik.values.amount || !formik.values.narration || parseFloat(formik.values.amount) < 100 || parseFloat(formik.values.amount) > 9999}
          className={`font-medium mt-6 p-2 w-4/5 ${
            parseFloat(formik.values.amount) >= 100 && parseFloat(formik.values.amount) <= 9999
              ? 'bg-green-600 hover:bg-green-500'
              : 'bg-green-200 cursor-not-allowed'
          } text-white rounded-3xl`}
        >
          {isPending ? 'Processing...' : 'Next'}
        </button>
      </form>
    </div>
  );

};
export default TopUp;


