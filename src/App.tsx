import { Header } from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { BurgerMenu } from './components/BurgerMenu/BurgerMenu';
import { Box } from '@mui/material';
import { toggleBurgerMenu } from './functions';
import { useBurgerMenuContext } from './hooks/useBurgerMenuContext';
import { Overlay } from './components';

function App() {
  const { isBurgerMenuShown, setIsBurgerMenuShown } = useBurgerMenuContext();

  return (
    <Box
      sx={({ palette }) => ({
        width: '100%',
        height: '100%',
        backgroundColor: palette.backgoundPrimary.main,
      })}
    >
      <Header />
      {isBurgerMenuShown && (
        <>
          <BurgerMenu />
          <Overlay
            onClick={() =>
              toggleBurgerMenu(setIsBurgerMenuShown, isBurgerMenuShown)
            }
          />
        </>
      )}
      <Box
        sx={({ palette }) => ({
          minHeight: 'calc(100vh - 64px - 125px)',
          backgroundColor: palette.backgoundPrimary.main,
        })}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
