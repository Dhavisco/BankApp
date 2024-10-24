import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import axios from 'axios';

const depositMoney = async ({ amount, narration }: { amount: number, narration: string }) => {
  const response = await axiosInstance.post('api/v1/accounts/deposit', { amount, narration });
  return response.data;
};

export const useDeposit = () => {
  return useMutation({
    mutationFn: depositMoney,
    onSuccess: (data) => {
      console.log('Deposit successful:', data);
    },
   onError: (error) => {

  if (axios.isAxiosError(error)) {
    const axiosError = error as { response?: { data?: { message?: string }, status?: number } };
    
    // Handle 404 error specifically
    if (axiosError.response && axiosError.response.status === 404) {
      throw new Error('The requested resource was not found. Please try again or contact support.');
    }

    // Handle any other errors with a specific message from the server (if available)
    if (axiosError.response && axiosError.response.data && axiosError.response.data.message) {
      throw new Error(axiosError.response.data.message);
    }

    // Handle other types of errors (e.g., network issues)
    throw new Error('Something went wrong. Please check your internet connection.');
  }

  // Fallback for unexpected errors
  throw new Error('An unexpected error occurred.');
},

  });
};


const validateAccount = async ({ account_number }: { account_number: number}) => {
  const response = await axiosInstance.post('api/v1/accounts/validate', { account_number });

  return response.data;
};

export const useValidate = () => {
  return useMutation({
    mutationFn: validateAccount,
    onSuccess: (data) => {
      return data;
    },
   onError: (error) => {

  if (axios.isAxiosError(error)) {
    const axiosError = error as { response?: { data?: { message?: string }, status?: number } };
    
    // Handle 404 error specifically
    if (axiosError.response && axiosError.response.status === 404) {
      throw new Error('Could not validate. Please try again or contact support.');
    }

    // Handle any other errors with a specific message from the server (if available)
    if (axiosError.response && axiosError.response.data && axiosError.response.data.message) {
      throw new Error(axiosError.response.data.message);
    }

    // Handle other types of errors (e.g., network issues)
    throw new Error('Something went wrong. Please check your internet connection.');
  }

  // Fallback for unexpected errors
  throw new Error('An unexpected error occurred.');
},

  });
};

const transferMoney = async ({ amount, narration, account_number }: { amount: number, narration: string, account_number: number}) => {
  const response = await axiosInstance.post('api/v1/accounts/transfer', {amount, narration, account_number });

  return response.data;
};

export const useTransfer = () => {
  return useMutation({
    mutationFn: transferMoney,
    onSuccess: (data) => {
      return data;
    },
   onError: (error) => {

  if (axios.isAxiosError(error)) {
    const axiosError = error as { response?: { data?: { message?: string }, status?: number } };
    
    // Handle 404 error specifically
    if (axiosError.response && axiosError.response.status === 404) {
      throw new Error('Transfer failed. Please try again or contact support.');
    }

    // Handle any other errors with a specific message from the server (if available)
    if (axiosError.response && axiosError.response.data && axiosError.response.data.message) {
      throw new Error(axiosError.response.data.message);
    }

    // Handle other types of errors (e.g., network issues)
    throw new Error('Something went wrong. Please check your internet connection.');
  }

  // Fallback for unexpected errors
  throw new Error('An unexpected error occurred.');
},

  });
};
