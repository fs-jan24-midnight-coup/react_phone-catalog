import { Product } from '../../types/Product';
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

type Props = {
  product: Product;
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
  const { id, name, price, image } = product;

  return (
    <Container>
      <CartItemWrapper>
        <ContentContainer
          spacing={{ xs: 2, sm: 3, md: 4 }}
          direction={{ xs: 'column', sm: 'row' }}
        >
          <ContainerLeftSide
            spacing={{ xs: 2, sm: 3 }}
            direction={{ xs: 'row' }}
          >
            <StyledIconButton onClick={() => deleteFromCart(id)}>
              <DeleteIcon />
            </StyledIconButton>

            <ProductImage>
              <Image src={image} />
            </ProductImage>

            <ProductName to="/">
              <Typography variant="body1">{name}</Typography>
            </ProductName>
          </ContainerLeftSide>

          <ContainerRightSide spacing={{ sm: 3 }} direction={{ xs: 'row' }}>
            <ProductQuantity>
              <IconButtonQuantityMinus onClick={() => decreaseQuantity(id)} />
              <Typography variant="body1">
                {cart.find(item => item.prodId === id)?.quantity}
              </Typography>
              <IconButtonQuantityPlus onClick={() => increaseQuantity(id)} />
            </ProductQuantity>

            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {`$${price}`}
            </Typography>
          </ContainerRightSide>
        </ContentContainer>
      </CartItemWrapper>
    </Container>
  );
};

export default CartItem;
