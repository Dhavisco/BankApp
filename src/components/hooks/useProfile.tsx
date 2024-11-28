import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => axiosInstance.get('/api/v1/profile')
  });
};

export const useTransaction = (searchQuery: string) => {
  return useQuery({
    queryKey: ['transactions', searchQuery],
    queryFn: () => axiosInstance.get('api/v1/transactions',{
      params:{
        reference:searchQuery
      } // pass searchquery as params
    })



    //   {
    //   const token = localStorage.getItem('access_token');
    //   if (!token) throw new Error("No token found. Please log in.");

    //   let url = '/api/v1/transactions';
    //   if (searchQuery) {
    //     url += `?reference=${searchQuery}`;
    //   }

    //   try {
    //     const response = await axiosInstance.get(url, {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     return response.data;
    //   } catch (error) {
    //     console.error('Error fetching transaction details:', error);
    //     throw new Error("Failed to fetch transaction details.");
    //   }
    // }
  });
};
