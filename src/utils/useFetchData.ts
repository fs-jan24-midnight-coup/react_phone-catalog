import axios from 'axios';
import { useState, useEffect } from 'react';
import { Favorite } from '../types/Favorites';
import { apiDBurl } from './config';
import { ProductExpanded } from '../types';

const BASE_URL = apiDBurl;

type FetchState<T> = {
  data: T[];
  isLoading: boolean;
  error: Error | null;
};

function useFetchData<T>(url: string): FetchState<T> {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<T[]>(BASE_URL + url);
        
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setError(new Error('Failed to fetch data'));
        } else {
          setError(new Error('An unknown error occurred'));
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

async function getOneProductBySlug(url: string) {
  try {
    const response = await axios.get<ProductExpanded>(BASE_URL + url);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error('Failed to fetch data');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

async function getProductsByNamespaceId(url: string, namespaceId: string) {
  try {
    const response = await axios.get<ProductExpanded[]>(BASE_URL + url, {
      params: { namespaceId },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error('Failed to fetch data');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

//c
async function addToFavorites(
  userId: number,
  productId: number,
): Promise<void> {
  try {
    if (!userId) {
      userId = 1;
    }
    const response = await axios.post(`${BASE_URL}favorites`, {
      userId,
      productId,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to add to favorites');
  }
}

//c
async function removeFromFavorites(
  userId: number,
  productId: number,
): Promise<void> {
  try {
    const response = await axios.delete(`${BASE_URL}favorites`, {
      data: { userId, productId },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to remove from favorites');
  }
}

//c
async function getUserFavorites(userId: number) {
  try {
    const response = await axios.get(`${BASE_URL}favorites/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to upload favorites');
  }
}

//c
async function isProductInFavorites(
  userId: number,
  productId: number,
): Promise<boolean> {
  try {
    const favorites = await getUserFavorites(userId);

    return favorites.some(
      (favorite: Favorite) => favorite.productId === productId,
    );
  } catch (error) {
    throw new Error('Failed to check if product is in favorites');
  }
}

async function getOneFavorite(
  userId: number,
  productId: number,
): Promise<Favorite | null> {
  try {
    const favorites = await getUserFavorites(userId);
    const favorite = favorites.find(
      (favorite: Favorite) => favorite.productId === productId,
    );

    return favorite || null;
  } catch (error) {
    throw new Error('Failed to find the favorite');
  }
}

async function registerUser(
  username: string,
  email: string,
  password: string,
): Promise<void> {
  try {
    const response = await axios.post(`${BASE_URL}registration`, {
      username,
      password,
      email,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to register');
  }
}

async function loginUser(username: string, password: string): Promise<void> {
  try {
    const response = await axios.post(`${BASE_URL}login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to login');
  }
}

export default useFetchData;
export {
  getOneProductBySlug,
  getProductsByNamespaceId,
  addToFavorites,
  removeFromFavorites,
  getUserFavorites,
  isProductInFavorites,
  getOneFavorite,
  registerUser,
  loginUser,
};
