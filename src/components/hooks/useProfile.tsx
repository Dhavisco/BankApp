import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      try {
        const response = await axiosInstance.get('/api/v1/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data; // Return the profile data
    
      } catch (error) {
        console.error('Error fetching profile:', error);
        throw new Error("Failed to fetch profile data.");
      }
    },
  });
};

// export const useTransactions = () => {
//   return useQuery({
//     queryKey: ['transactions'],
//     queryFn: async () => {
//       const token = localStorage.getItem('access_token');
      
//       if (!token) {
//         throw new Error("No token found. Please log in.");
//       }

//       try {
//         const response = await axiosInstance.get('/api/v1/transactions', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         return response.data; // Return the profile data
    
//       } catch (error) {
//         console.error('Error Transaction details:', error);
//         throw new Error("Failed to fetch transaction details.");
//       }
//     },
//   });
// };

export const useTransaction = (searchQuery: string) => {
  return useQuery({
    queryKey: ['transactions', searchQuery],
    queryFn: async () => {
      const token = localStorage.getItem('access_token');
      if (!token) throw new Error("No token found. Please log in.");

      let url = '/api/v1/transactions';
      if (searchQuery) {
        url += `?reference=${searchQuery}`;
      }

      try {
        const response = await axiosInstance.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching transaction details:', error);
        throw new Error("Failed to fetch transaction details.");
      }
    },
  });
};
