import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Fade,
  Grow,
  GrowProps,
  Slide,
  Stack,
  Typography,
} from '@mui/material';
import Container from '../../components/Container/Container';
import { useCartContext } from '../../hooks/useCartContext';
import CartItem from '../../components/CartItem';
import { useState } from 'react';
import { CartModal } from '../../components/CartModal';
import { TransitionProps } from '@mui/material/transitions';
import { Toast } from '../../components/Toast';
import { Transition } from '../../types';
import { BreadCrumbsComponent } from '../../components';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { Link } from 'react-router-dom';

export const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<
          React.ReactNode,
          string | React.JSXElementConstructor<React.ReactNode>
        >;
      }
    >;
    message: string;
    status: 'warning' | 'success' | null;
  }>({
    open: false,
    Transition: Grow,
    message: '',
    status: null,
  });

  const handleEmpty = (Transition: Transition) => {
    setIsToastOpen({
      open: true,
      Transition,
      message: 'Cart is empty',
      status: 'warning',
    });
  };

  function GrowTransition(props: GrowProps) {
    return <Grow {...props} />;
  }

  const { cart, cartQuantity } = useCartContext();
  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <>
      <Container>
        <BreadCrumbsComponent />
        <Slide in={true} direction="down" timeout={1200}>
          <Typography
            variant="h1"
            component="h2"
            sx={{ py: 2 }}
            color="primary"
          >
            Cart
          </Typography>
        </Slide>
        <script
          src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
          type="module"
        ></script>

        {cartQuantity === 0 && (
          <Fade in={true} timeout={1000}>
            <Stack
              direction={'column'}
              spacing={2}
              sx={{ alignItems: 'center' }}
            >
              <Typography variant="h4" color="primary">
                Looks like you have not added anything to your cart.
              </Typography>
              <Box
                sx={{ alignSelf: 'center', width: '20vmax', height: '20vmax' }}
              >
                <DotLottiePlayer
                  src="https://lottie.host/46ed7366-2fcd-4229-b1fd-6d9272c77c19/3AwlFQdV0q.json"
                  background="transparent"
                  loop
                  autoplay
                ></DotLottiePlayer>
              </Box>
              <Typography variant="h4" sx={{}} color="primary">
                Go ahead & explore top categories.
              </Typography>
              <Link to="/">
                <Button
                  variant="contained"
                  color="accent"
                  sx={{
                    width: '160px',
                    alignSelf: 'center',
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
                    Return To Shop
                  </Typography>
                </Button>
              </Link>
            </Stack>
          </Fade>
        )}
        {cartQuantity > 0 && (
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box
              sx={{ width: { md: '70%', xs: '100%' }, pr: { sm: 2, xs: 0 } }}
            >
              {cartQuantity > 0 &&
                cart.map(item => (
                  <Box key={item.product.prodId} sx={{ pb: 2 }}>
                    <CartItem product={item} />
                  </Box>
                ))}
            </Box>
            <Box
              sx={{
                width: { md: '30%', xs: '100%' },
                position: 'sticky',
                top: '72px',
                height: 'fit-content',
              }}
            >
              <Card
                sx={({ palette }) => ({
                  backgroundColor: palette.backgoundSecondary.main,
                  border: `1px solid ${palette.element.main}`,
                  boxShadow: 'none',
                })}
              >
                <CardContent>
                  <Stack direction="column" spacing={2}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        variant="h2"
                        color="primary"
                      >{`$${totalPrice}`}</Typography>
                      <Typography variant="body1" color="secondary">
                        Total for {cartQuantity}{' '}
                        {cartQuantity === 1 ? 'item' : 'items'}
                      </Typography>
                    </Box>
                    <Divider
                      sx={({ palette }) => ({
                        backgroundColor: palette.element.main,
                      })}
                      variant="middle"
                    />
                    <Button
                      variant="contained"
                      color="accent"
                      sx={{
                        width: '100%',
                        py: 1,
                        '&.MuiButton-contained': { color: 'white.main' },
                        textTransform: 'none',
                      }}
                      onClick={() =>
                        cart.length !== 0
                          ? setIsModalOpen(true)
                          : handleEmpty(GrowTransition)
                      }
                    >
                      Checkout
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </Box>
        )}
      </Container>
      <CartModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setIsToastOpen={setIsToastOpen}
      />
      <Toast isToastOpen={isToastOpen} setIsToastOpen={setIsToastOpen} />
    </>
  );
};
