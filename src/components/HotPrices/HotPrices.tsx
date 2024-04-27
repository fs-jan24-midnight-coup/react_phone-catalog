import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  styled,
  Grid,
} from '@mui/material';
import products from '../../../public/api/products.json';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Product } from '../../types';
import { ProductCard } from '../ProductCard/ProductCard';
import { useTheme } from '@mui/material/styles';
import { customBreakpoints } from '../../theme/breakpoints.config';
import { customTypography } from '../../theme/typography.config';
import { CustomGrid } from '../CustomGrid';

const newHotPrices = products.filter(product => {
  const { price, fullPrice } = product;
  const percent = Math.round(((fullPrice - price) / price) * 100);
  return percent > 15;
});

export const HotPrices: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  let productsPerRow = 4;
  const { sm, md, lg } = customBreakpoints.values;
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up(lg));
  const isLaptop = useMediaQuery(theme.breakpoints.between(md, lg));
  const isTablet = useMediaQuery(theme.breakpoints.between(sm, md));
  const isMobile = useMediaQuery(theme.breakpoints.down(sm));

  switch (true) {
    case isDesktop:
      productsPerRow = 4;
      break;
    case isLaptop:
      productsPerRow = 3;
      break;
    case isTablet:
      productsPerRow = 2;
      break;
    case isMobile:
      productsPerRow = 1;
      break;
  }

  const handleClickPrev = () => {
    setStartIndex(Math.max(startIndex - productsPerRow, 0));
  };

  const handleClickNext = () => {
    setStartIndex(
      Math.min(startIndex + productsPerRow, products.length - productsPerRow),
    );
  };

  const GridStyled = styled(Grid)({
    '&.MuiGrid-root': {
      flexBasis: 'auto',
    },
  });

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={customTypography.h2}
          color="primary"
        >
          Hot Prices
        </Typography>

        <Box>
          <Button onClick={handleClickPrev} disabled={startIndex === 0}>
            <ArrowBack color="primary" />
          </Button>

          <Button
            onClick={handleClickNext}
            disabled={startIndex + productsPerRow >= newHotPrices.length}
          >
            <ArrowForward color="primary" />
          </Button>
        </Box>
      </Box>

      <Box display={'flex'} justifyContent={'center'}>
        <CustomGrid>
          {newHotPrices
            .slice(startIndex, startIndex + productsPerRow)
            .map((product: Product) => (
              <GridStyled item xs={1} md={1} key={product.id}>
                <ProductCard product={product} key={product.id}></ProductCard>
              </GridStyled>
            ))}
        </CustomGrid>
      </Box>
    </Box>
  );
};
