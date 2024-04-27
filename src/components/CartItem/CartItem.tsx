import Container from '../Container/Container';
import {
  CartItemWrapper,
  ContainerLeftSide,
  ContainerRightSide,
  ContentContainer,
  DeleteIcon,
  IconButtonQuantityMinus,
  IconButtonQuantityPlus,
  Image,
  ProductImage,
  ProductName,
  ProductQuantity,
} from './CartItem.styles.tsx';
import { IconButton, Typography, styled } from '@mui/material';
import React from 'react';
import { useCartContext } from '../../hooks/useCartContext.ts';
import { ProductInCart } from '../../types/ProductInCart.ts';
import { Link } from 'react-router-dom';

import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

type Props = {
  product: ProductInCart;
};

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.element.main,
  border: '1px solid {theme.palette.element.main}',
  borderRadius: '50%',
  ':hover, :focus': {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
}));

const CartItem: React.FC<Props> = ({ product }) => {
  const { deleteFromCart, increaseQuantity, decreaseQuantity, cart } =
    useCartContext();
  const { prodId, name, price, img, category } = product.product;

  return (
    <Container>
      <CartItemWrapper color="backgoundSecondary">
        <ContentContainer
          spacing={{ xs: 2, sm: 3, md: 4 }}
          direction={{ xs: 'column', sm: 'row' }}
        >
          <ContainerLeftSide
            spacing={{ xs: 2, sm: 3 }}
            direction={{ xs: 'row' }}
          >
            <StyledIconButton onClick={() => deleteFromCart(prodId)}>
              <DeleteIcon
                color="primary"
                sx={({ palette }) => ({
                  '&:hover': {
                    color: palette.secondary.main,
                  },
                })}
              />
            </StyledIconButton>
            <Link to={`/${category}/${prodId}`}>
              <ProductImage
                sx={{
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Image src={img} />
              </ProductImage>
            </Link>

            <ProductName
              to={`/${category}/${prodId}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Typography variant="body1" color="primary">
                {name}
              </Typography>
            </ProductName>
          </ContainerLeftSide>

          <ContainerRightSide spacing={{ sm: 3 }} direction={{ xs: 'row' }}>
            <ProductQuantity>
              <IconButtonQuantityMinus onClick={() => decreaseQuantity(prodId)}>
                <RemoveOutlinedIcon
                  color="primary"
                  sx={{ width: '16px', height: '16px' }}
                />
              </IconButtonQuantityMinus>
              <Typography variant="body1" color="primary">
                {cart.find(item => item.product.prodId === prodId)?.quantity}
              </Typography>
              <IconButtonQuantityPlus onClick={() => increaseQuantity(prodId)}>
                <AddOutlinedIcon
                  color="primary"
                  sx={{ width: '16px', height: '16px' }}
                />
              </IconButtonQuantityPlus>
            </ProductQuantity>

            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold' }}
              color="primary"
            >
              {`$${price}`}
            </Typography>
          </ContainerRightSide>
        </ContentContainer>
      </CartItemWrapper>
    </Container>
  );
};

export default CartItem;
