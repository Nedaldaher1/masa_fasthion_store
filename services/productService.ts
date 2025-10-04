import { useQuery } from '@tanstack/react-query';
import { api } from '../utils/api';
import { Product } from '../types';

export const useProducts = (filters?: {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => api.get<Product[]>('/products', filters),
    staleTime: 5 * 60 * 1000,
  });
};

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => api.get<Product>(`/products/${productId}`),
    enabled: !!productId,
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => api.get<Product[]>('/products/featured'),
  });
};

