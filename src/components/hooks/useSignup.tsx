import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import axios from 'axios'; // For type checking
import { ErrorMessage } from 'formik';

export const useSignup = () => {
  return useMutation({
    mutationFn: async (userData: {
      first_name: string;
      last_name: string;
      date_of_birth: string;
      email: string;
      password: string;
      address: string;
      phone_number: string;
    }) => {

      const response = await axiosInstance.post("/api/v1/users", userData);
      return response;
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        // Check if there is a response from the server
         const errorMessage = error.response?.data?.error || "An unknown error occurred"; // Extract the error message
        if (error.response) {
        //   const errorMessage = error.response.data?.error || "An unknown error occurred"; // Extract the error message
          // alert(errorMessage); // Show the error to the user
           throw new Error(errorMessage);
        
        } else {
          console.error("No response from server, error details:", error.message);
        }
       
      } else {
        console.error("Unexpected error:", ErrorMessage);
        return "An unexpected error occurred";
      }
    },  });
};

