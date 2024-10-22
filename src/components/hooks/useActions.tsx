import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import axios from 'axios';

const depositMoney = async ({ amount, narration }: { amount: number, narration: string }) => {
  const response = await axiosInstance.post('api/v1/accounts/deposit', { amount, narration });


  console.log(response);
  return response.data;
};

const useDeposit = () => {
  return useMutation({
    mutationFn: depositMoney,
    onSuccess: (data) => {
      console.log('Deposit successful:', data);
    },
   onError: (error) => {
  console.error('Error:', error);

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

export default useDeposit;