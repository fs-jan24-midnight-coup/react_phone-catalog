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
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useCartContext } from '../../hooks/useCartContext';
import { useFavoritesContext } from '../../hooks/useFavoritesContext';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
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

  const toggleAddToCard = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    if (!isInCart) {
      addToCart({
        prodId: product.itemId,
        img: product.image,
        name: product.name,
        category: product.category,
        price: product.price,
      });
    } else {
      deleteFromCart(product.itemId);
    }
  };

  const toggleAddToFavorites = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    if (!isInFavorites) {
      addToFavorites(product.itemId);
    } else {
      deleteFromFavorites(product.itemId);
    }
  };

  const isInCart = isProductInCart(product.itemId);
  const isInFavorites = isProductInFavorites(product.itemId);

  return (
    <Link
      to={`/${category}/${itemId}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Card
        sx={({ palette }) => ({
          boxSizing: 'border-box',
          maxWidth: 272,
          maxHeight: 506,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: `1px solid ${palette.element.main}`,
          backgroundColor: palette.backgoundSecondary.main,
        })}
      >
        <CardContent sx={{ width: '100%', m: 1, p: '32px' }}>
          <CardMedia
            component="img"
            height="50%"
            image={image}
            sx={{
              height: 196,
              maxWidth: 208,
              objectFit: 'contain',
              objectPosition: 'center',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          />
          <Box
            sx={{
              pt: 1,
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
            />
          </Box>
          <Box
            height={36}
            sx={{
              pt: 1,
              pb: 1,
            }}
          >
            <Tooltip title={name}>
              <Typography
                variant="body1"
                component="div"
                color="primary"
                sx={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: 2,
                }}
              >
                {name}
              </Typography>
            </Tooltip>
          </Box>

          <Stack direction="row" spacing={2} sx={{ pt: 2, pb: 1 }}>
            <Typography
              color="primary"
              variant="h5"
              sx={{ fontWeight: 'bold' }}
            >
              ${price}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: 'secondary.main',
                textDecoration: 'line-through',
              }}
            >
              ${fullPrice}
            </Typography>
          </Stack>

          <Divider />

          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: 'space-between', pt: 2 }}
          >
            <Typography variant="body1" sx={{ color: 'secondary.main' }}>
              Screen
            </Typography>
            <Typography
              variant="body1"
              color="primary"
              sx={{ fontWeight: 'bold' }}
            >
              {screen}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: 'space-between', pt: 0.5 }}
          >
            <Typography variant="body1" sx={{ color: 'secondary.main' }}>
              Capacity
            </Typography>
            <Typography
              variant="body1"
              color="primary"
              sx={{ fontWeight: 'bold' }}
            >
              {capacity}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: 'space-between', pt: 0.5 }}
          >
            <Typography variant="body1" sx={{ color: 'secondary.main' }}>
              RAM
            </Typography>
            <Typography
              variant="body1"
              color="primary"
              sx={{ fontWeight: 'bold' }}
            >
              {ram}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              pt: 2,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button
              variant={!isInCart ? 'contained' : 'outlined'}
              onClick={event => toggleAddToCard(product, event)}
              color="accent"
              sx={{
                width: '160px',
                py: 1,
                '&.MuiButton-contained': { color: 'white.main' },
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
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
            <IconButton
              sx={{ border: 1, borderColor: 'icon.main' }}
              color="primary"
              aria-label="add to favorites"
              onClick={event => toggleAddToFavorites(product, event)}
            >
              {!isInFavorites ? (
                <FavoriteBorderIcon />
              ) : (
                <FavoriteIcon color="secondaryAccent" />
              )}
            </IconButton>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};
