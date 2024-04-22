import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { NewModels } from '../../components/NewModels/NewModels';
import { HotPrices } from '../../components/HotPrices/HotPrices';
import Container from '../../components/Container/Container';
import { Category } from '../../types/Category';
import useFetchData from '../../utils/useFetchData';
import { Product } from '../../types';
import { CategorySelector } from '../../components/CategorySelector';
import Slider from '../../components/Slider';

export const HomePage: FC = () => {
  const { data } = useFetchData<Product>('products.json');

  const categories: Category[] = [
    {
      id: 0,
      img: 'img/category-phones.webp',
      background: '#6D6474',
      name: 'Mobile phones',
      amount: data.filter(product => product.category === 'phones').length,
      path: '/phones',
    },
    {
      id: 1,
      img: 'img/category-tablets.png',
      background: '#8D8D92',
      name: 'Tablets',
      amount: data.filter(product => product.category === 'tablets').length,
      path: '/tablets',
    },
    {
      id: 2,
      img: 'img/category-accessories.png',
      background: '#973D5F',
      name: 'Accessories',
      amount: data.filter(product => product.category === 'accessories').length,
      path: '/accessories',
    },
  ];

  return (
    <>
      <Container>
        <Box py={2}>
          <Typography variant="h1" sx={{ pt: 2 }}>
            Welcome to Nice Gadgets store!
          </Typography>
        </Box>
        <Slider />
        <Box py={2}>
          <NewModels></NewModels>
        </Box>
        <Box py={2}>
          <CategorySelector categories={categories} />
        </Box>
        <Box py={2}>
          <HotPrices></HotPrices>
        </Box>
      </Container>
    </>
  );
};
