import { useQuery } from '@tanstack/react-query';
import api from '../api/axiosInterceptor';

const useFetchData = () => {
  return useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      const response = await api.get('/supplier');
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export default useFetchData;
