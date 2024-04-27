import { Box, Slide, Typography, styled } from '@mui/material';
import { FC } from 'react';
import Container from '../../components/Container/Container';
import { Category } from '../../types/Category';
import useFetchData from '../../utils/useFetchData';
import { Product } from '../../types';
import { CategorySelector } from '../../components/CategorySelector';
import Slider from '../../components/Slider';
import { ProductSliderFabric } from '../../components/ProductSliderFabric/ProductSliderFabric';
import { FilterCallback } from '../../types/FilterCallback';

const SliderOnPageContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: '0',
  },
  [theme.breakpoints.up('md')]: {
    paddingInline: '32px',
  },
}));

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
        <Slide in={true} direction="down">
          <Box py={2} id="1">
            <Typography variant="h1" sx={{ pt: 2 }} color="primary">
              Welcome to Nice Gadgets store!
            </Typography>
          </Box>
        </Slide>
      </Container>
      <SliderOnPageContainer>
        <Slider />
      </SliderOnPageContainer>
      <Container>
        <Box py={2} id="2">
          <ProductSliderFabric
            title="New models"
            callback={FilterCallback.NewModels}
          />
        </Box>
        <Box py={2} id="3">
          <CategorySelector categories={categories} />
        </Box>
        <Box py={2} id="4">
          <ProductSliderFabric
            title="Hot prices"
            callback={FilterCallback.HotPrices}
          />
        </Box>
      </Container>
    </>
  );
};
