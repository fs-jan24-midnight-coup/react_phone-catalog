import {
  Box,
  Button,
  Grid,
  Grow,
  Pagination,
  Slide,
  Stack,
  Typography,
  styled,
  Fade,
  useMediaQuery,
} from '@mui/material';
import { Product } from '../../types';
import useFetchData from '../../utils/useFetchData';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { CustomGrid } from '../../components/CustomGrid';
import { useLocation, useSearchParams } from 'react-router-dom';
import Container from '../../components/Container/Container';
import { CardSkeleton } from '../../components/ProductCard';
import React, { useEffect, useMemo, useRef } from 'react';
import { getFilter } from '../../functions/getFilter';
import { getSearchWith } from '../../utils/searchHelper';
import { BreadCrumbsComponent } from '../../components';
import CategorySort from '../../components/CategorySort/CategorySort';
import { SortBy } from '../../types/SortBy';
import { CategoryPriceRange } from '../../components/CategoryPriceRange/CategoryPriceRange';
import { useSearchContext } from '../../hooks/useSearchContext';
import {
  DotLottieCommonPlayer,
  DotLottiePlayer,
} from '@dotlottie/react-player';
import { customBreakpoints } from '../../theme/breakpoints.config';
import { useTheme } from '@mui/material/styles';

function getSlicedData(data: Product[], page: number, perPage: string) {
  if (perPage === 'All') {
    return data;
  }

  const startIndex = (page - 1) * Number(perPage);
  const endIndex = startIndex + Number(perPage);

  return data.slice(startIndex, endIndex);
}

function getSortedData(data: Product[], sortBy: string) {
  switch (sortBy) {
    case 'alphabetically':
      return data.sort((a, b) => a.name.localeCompare(b.name));
    case 'cheapest':
      return data.sort((a, b) => a.price - b.price);
    case 'newest':
      return data.sort((a, b) => b.id - a.id);
    default:
      return data;
  }
}

export const CategoryPage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryName = location.pathname.slice(1);
  const { data, isLoading, error } = useFetchData<Product>('products.json');
  const { isSearchOpen, setIsSearchOpen, handleClearSearch } =
    useSearchContext();
  const query = searchParams.get('query');
  const page = searchParams.get('page') || 1;
  const perPage = searchParams.get('perPage') || 4;
  const sortBy = searchParams.get('sortBy') || SortBy.Alphabetically;
  const prevCategoryName = useRef(categoryName);

  const { sm } = customBreakpoints.values;
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up(sm));

  const pricesInCategory = data
    .filter(product => product.category === categoryName)
    .map(product => product.price);

  const minPriceInCategory =
    Math.floor(Math.min(...pricesInCategory) / 100) * 100;
  const maxPriceInCategory =
    Math.ceil(Math.max(...pricesInCategory) / 100) * 100;

  const minPrice = searchParams.get('minPrice') || `${minPriceInCategory}`;
  const maxPrice = searchParams.get('maxPrice') || `${maxPriceInCategory}`;

  const visibleProducts = useMemo(() => {
    return getFilter({ data, query, minPrice, maxPrice });
  }, [data, query, minPrice, maxPrice]);

  const filteredData = visibleProducts?.filter(
    data => data.category === categoryName,
  );

  const animation = useRef<DotLottieCommonPlayer | null>(null);

  useEffect(() => {
    animation.current ? animation.current.play() : null;
  }, [animation]);

  const sortedData = getSortedData(filteredData, sortBy);

  const slicedData = getSlicedData(
    sortedData,
    Number(page),
    perPage.toString(),
  );

  useEffect(() => {
    const maxPage = Math.ceil(filteredData.length / Number(perPage));
    if (Number(page) > maxPage && maxPage !== 0) {
      searchParams.set('page', '1');
      setSearchParams(searchParams, { replace: true });
    }
  }, [perPage, filteredData.length, page, setSearchParams]);

  useEffect(() => {
    let shouldResetPage = false;

    if (prevCategoryName.current !== categoryName) {
      shouldResetPage = true;
    }

    if (perPage === 'All') {
      shouldResetPage = true;
    }

    if (shouldResetPage) {
      const newSearchParams = getSearchWith(searchParams, {
        page: '1',
      });
      setSearchParams(newSearchParams);
    }

    prevCategoryName.current = categoryName;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName, perPage]);

  if (error) return <p>Error: {error.message}</p>;

  const GridStyled = styled(Grid)({
    '&.MuiGrid-root': {
      flexBasis: 'auto',
    },
  });

  function handlePageChange(_: React.ChangeEvent<unknown>, value: number) {
    const newSearchParams = getSearchWith(searchParams, {
      page: value.toString(),
    });

    setSearchParams(newSearchParams);
  }

  const clearSearchParams = () => {
    setSearchParams({});
  };

  return (
    <>
      <Container>
        <BreadCrumbsComponent />
        <Stack>
          <Slide in={true} direction="down" key={categoryName}>
            <Typography variant="h1" sx={{ pt: 4 }}>
              {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
            </Typography>
          </Slide>

          {filteredData.length > 0 && (
            <Typography variant="body1" color="secondary" sx={{ pb: 4 }}>
              {filteredData.length} models
            </Typography>
          )}
          <script
            src="https://lottie.host/e89ed2b8-0df9-4829-a67e-c5e194a38103/J35UHBqEvn.json"
            type="module"
          ></script>
          {filteredData.length === 0 && (
            <Fade in={true} timeout={1000}>
              <Stack
                direction={'column'}
                spacing={2}
                sx={{ alignItems: 'center', pt: 3 }}
              >
                <Typography variant="h4">
                  There are no {categoryName} matching the query.
                </Typography>
                <Box
                  sx={{
                    alignSelf: 'center',
                    width: '20vmax',
                    height: '20vmax',
                  }}
                >
                  <DotLottiePlayer
                    src="https://lottie.host/e89ed2b8-0df9-4829-a67e-c5e194a38103/J35UHBqEvn.json"
                    background="transparent"
                    loop
                    autoplay
                    speed={0.75}
                    ref={animation}
                  ></DotLottiePlayer>
                </Box>
                <Typography variant="h4" sx={{}}>
                  Go ahead & explore {categoryName} full list.
                </Typography>
                <Button
                  variant="contained"
                  color="accent"
                  sx={{
                    width: '160px',
                    alignSelf: 'center',
                    py: 1,
                    '&.MuiButton-contained': { color: '#fff' },
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                  onClick={() => {
                    clearSearchParams();
                    if (isSearchOpen) {
                      setIsSearchOpen(false);
                      handleClearSearch();
                    }
                  }}
                >
                  <Typography
                    variant="button"
                    color="white"
                    sx={{ textTransform: 'none', textDecoration: 'none' }}
                  >
                    Show ALL
                  </Typography>
                </Button>
              </Stack>
            </Fade>
          )}

          {!!filteredData.length && (
            <Stack direction={'column'}>
              <CategorySort />
              <CategoryPriceRange
                minPriceInCategory={minPriceInCategory}
                maxPriceInCategory={maxPriceInCategory}
              />
            </Stack>
          )}
        </Stack>
        <Box display={'flex'} justifyContent={'center'}>
          <CustomGrid>
            {isLoading ? (
              <>
                {Array.from(new Array(20)).map((_, index) => (
                  <GridStyled item xs={1} md={1} key={index}>
                    <CardSkeleton />
                  </GridStyled>
                ))}
              </>
            ) : (
              <>
                {slicedData?.map(phone => (
                  <Grow key={phone.id} in={true} timeout={1000}>
                    <GridStyled item xs={1} md={1}>
                      <ProductCard product={phone} />
                    </GridStyled>
                  </Grow>
                ))}
              </>
            )}
          </CustomGrid>
        </Box>

        {!!filteredData.length && (
          <Pagination
            siblingCount={!isTablet ? 0 : 1}
            size={!isTablet ? 'medium' : 'large'}
            color="primary"
            page={Number(page)}
            onChange={handlePageChange}
            count={
              perPage === 'All'
                ? 1
                : Math.ceil(filteredData.length / Number(perPage))
            }
            sx={{
              py: 4,
              display: 'flex',
              justifyContent: 'center',
            }}
          />
        )}
      </Container>
    </>
  );
};

export default CategoryPage;
