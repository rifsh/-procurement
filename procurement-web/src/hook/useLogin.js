import { useState } from 'react';
import api from '../api/axiosInterceptor';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const [formData, setFormData] = useState({ Id: '', password: '' });
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: (data) => api.post('/auth', data),
    onSuccess: (response) => {
      if (response.status === 200) {
        console.log(response.data)
        localStorage.setItem('token', response.data.token);
        navigate('/');
      }
    }
})
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading: loginMutation.isLoading,
    isError: loginMutation.isError,
    error: loginMutation.error,
    data: loginMutation.data,
  };
};

export default useLogin;
