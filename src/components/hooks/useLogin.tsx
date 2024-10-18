import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

const useLogin = () => {
  return useMutation({
    mutationFn: async (loginData: { email: string; password: string }) => {
      
        const response = await axiosInstance.post('/api/v1/auth/login', loginData);
        
        if (response.status === 200) {
          const { access_token, user } = response.data;

          if (access_token) {
            localStorage.setItem('access_token', access_token);
            // console.log(response)
            //  console.log('access_token:', access_token);
            //  console.log('User data:', user);
            return user;  // Return response data
          }
        } else {
          throw new Error('Invalid email/password combination');
        }
       
    },
    onError: (error: unknown) => {
      // Capture error for the Login page
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        if (axiosError.response && axiosError.response.data) {
          throw new Error(axiosError.response.data.message || 'Invalid email/password combination');
        }
      }
      throw new Error('An unexpected error occurred.');
    },
  });
};

export default useLogin;
