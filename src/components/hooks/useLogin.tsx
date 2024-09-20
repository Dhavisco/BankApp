// import { useMutation } from "@tanstack/react-query";
// import axiosInstance from "../../api/axiosInstance";


// const useLogin = () => {
//   return useMutation({
//     mutationFn: async (loginData: {
//         email:string;
//         password:string;
//     }) => {
//         const response = await axiosInstance.post('/api/v1/auth/login', loginData)
//            // Destructure the access token from response data
//         const { access_token } = response.data;

//         if (access_token) {
//           // Save the token to localStorage
//           localStorage.setItem('access_token', access_token);
//           console.log('Token saved to localStorage');
//         } 
    
//          console.log('Login successful');
//         return response.data;

//     }, 
//    onError: (error) => {
//       // Rethrow the error to be caught in the form component
//       throw error;
//     },
//   });
// };

// export default useLogin

import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

const useLogin = () => {
  return useMutation({
    mutationFn: async (loginData: { email: string; password: string }) => {
      
        const response = await axiosInstance.post('/api/v1/auth/login', loginData);
        
        if (response.status === 200) {
          const { access_token } = response.data;

          if (access_token) {
            localStorage.setItem('access_token', access_token);
            return response.data;
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
          throw new Error(axiosError.response.data.message || 'Invalid login credentials.');
        }
      }
      throw new Error('An unexpected error occurred.');
    },
  });
};

export default useLogin;
