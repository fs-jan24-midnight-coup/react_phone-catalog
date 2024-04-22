import Card from '@mui/material/Card';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Product } from '../../types';
import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useCartContext } from '../../hooks/useCartContext';
import { useFavoritesContext } from '../../hooks/useFavoritesContext';
import { Link } from 'react-router-dom';
import useFetchData from '../../utils/useFetchData';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { 
    id,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    image,
    category,
    itemId,
  } = product;
  const { addToCart, deleteFromCart, isProductInCart } = useCartContext();
  const { addToFavorites, deleteFromFavorites, isProductInFavorites } =
    useFavoritesContext();
  const { isLoading, error } = useFetchData<Product>('products.json');
  if (error) return <p>Error: {error.message}</p>;

  const toggleAddToCard = (product: Product) => {
    if (!isInCart) {
      addToCart(product);
    } else {
      deleteFromCart(id);
    }
  };

  const toggleAddToFavorites = (product: Product) => {
    if (!isInFavorites) {
      addToFavorites(product);
    } else {
      deleteFromFavorites(id);
    }
  };

  const isInCart = isProductInCart(id);
  const isInFavorites = isProductInFavorites(id);

  return (
    <Card
      sx={{
        boxSizing: 'border-box',
        maxWidth: 272,
        maxHeight: 506,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: 1,
        borderColor: '#E2E6E9',
      }}
    >
      <CardContent sx={{ m: 1, p: '32px' }}>
        <Link
          to={`/${category}/${itemId}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {isLoading ? (
            <Skeleton
              variant="rounded"
              animation="wave"
              width="100%"
              height={196}
            />
          ) : (
            <>
              <CardMedia
                component="img"
                height="50%"
                image={image}
                sx={{
                  height: 196,
                  maxWidth: 208,
                  objectFit: 'contain',
                  objectPosition: 'center',
                }}
              />
              <Box
                sx={{
                  pt: 1,
                }}
              >
                <Tooltip title={name}>
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      WebkitLineClamp: 2,
                    }}
                  />
                </Tooltip>
              </Box>
            </>
          )}
          <Box
            height={36}
            sx={{
              pt: 1,
              pb: 1,
            }}
          >
            <Typography
              variant="body1"
              component="div"
              sx={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitLineClamp: 2,
              }}
            >
              {isLoading ? (
                <Skeleton variant="rounded" animation="wave" width="100%" height={40} />
              ) : (
                name
              )}
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} sx={{ pt: 2, pb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {isLoading ? (
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={50}
                  height={40}
                />
              ) : (
                `$${price}`
              )}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: '#89939A',
                textDecoration: 'line-through',
              }}
            >
              {isLoading ? (
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={50}
                  height={40}
                />
              ) : (
                `$${fullPrice}`
              )}
            </Typography>
          </Stack>

          <Divider />

          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: 'space-between', pt: 2 }}
          >
            <Typography variant="body1" sx={{ color: '#89939A' }}>
              {isLoading ? (
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={50}
                  height={18}
                />
              ) : (
                'Screen'
              )}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'black', fontWeight: 'bold' }}
            >
              {isLoading ? (
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={125}
                  height={18}
                />
              ) : (
                screen
              )}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: 'space-between', pt: 0.5 }}
          >
            <Typography variant="body1" sx={{ color: '#89939A' }}>
              {isLoading ? (
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={70}
                  height={18}
                />
              ) : (
                'Capacity'
              )}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'black', fontWeight: 'bold' }}
            >
              {isLoading ? (
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={50}
                  height={18}
                />
              ) : (
                capacity
              )}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: 'space-between', pt: 0.5 }}
          >
            <Typography variant="body1" sx={{ color: '#89939A' }}>
              {isLoading ? (
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={40}
                  height={19}
                />
              ) : (
                'RAM'
              )}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'black', fontWeight: 'bold' }}
            >
              {isLoading ? (
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  width={40}
                  height={19}
                />
              ) : (
                ram
              )}
            </Typography>
          </Stack>
        </Link>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            pt: 2,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {isLoading ? (
            <Skeleton
              variant="rounded"
              animation="wave"
              width={160}
              height={50}
            />
          ) : (
            <Button
              variant={!isInCart ? 'contained' : 'outlined'}
              onClick={() => toggleAddToCard(product)}
              color="accent"
              sx={{
                width: '160px',
                py: 1,
                '&.MuiButton-contained': { color: '#fff' },
              }}
            >
              <Typography
                variant="button"
                color="white"
                sx={{ textTransform: 'none', textDecoration: 'none' }}
              >
                {!isInCart ? 'Add to cart' : 'Added'}
              </Typography>
            </Button>
          )}

          {isLoading ? (
            <Skeleton
              variant="circular"
              animation="wave"
              width={40}
              height={40}
            />
          ) : (
            <IconButton
              sx={{ border: 1, borderColor: '#B4BDC3', color: 'black' }}
              aria-label="add to favorites"
              onClick={() => toggleAddToFavorites(product)}
            >
              {!isInFavorites ? (
                <FavoriteBorderIcon />
              ) : (
                <FavoriteIcon color="secondaryAccent" />
              )}
            </IconButton>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};
