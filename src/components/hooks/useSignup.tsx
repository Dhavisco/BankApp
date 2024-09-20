import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';

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
            console.log('Sending payload to API:', userData); // Log the data

            const response = await axiosInstance.post("/api/v1/users", userData);
            console.log(response.data);
        },
      onError: (error: unknown) => {
          if (error instanceof Error) {
              if ('response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
                  console.error("Sign-up error:", error.response.data); // Log the error details from the server
              } else {
                  console.error("Sign-up error:", error.message);
              }
          } else {
              console.error("Sign-up error:", error);
          }
      },
    });
};
