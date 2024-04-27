import React from 'react';
import { useLocation } from 'react-router-dom';

import { HeaderOtherLinks } from '../../types';
import {
  ActiveLink,
  ChangeModeButton,
  DesktopButtonsWrapper,
  StyledBurgerButton,
  StyledWrapperButton,
} from '.';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';

import { useCartContext } from '../../hooks/useCartContext';
import { useFavoritesContext } from '../../hooks/useFavoritesContext';
import Badge from '@mui/material/Badge';
import { Search } from './Search';
import { toggleBurgerMenu } from '../../functions';
import { useSearchContext } from '../../hooks/useSearchContext';
import { useBurgerMenuContext } from '../../hooks/useBurgerMenuContext';
import { Divider } from '@mui/material';
import { useThemeChangeContext } from '../../hooks/useThemeChangeContext';

interface Props {
  searchField: boolean;
}

export const NavBarButtons: React.FC<Props> = ({ searchField }) => {
  const locationPathname = useLocation().pathname;
  const { mode, setMode } = useThemeChangeContext();
  const { cartQuantity } = useCartContext();
  const { favoritesQuantity } = useFavoritesContext();

  const { isSearchOpen, setIsSearchOpen, handleClearSearch } =
    useSearchContext();
  const { isBurgerMenuShown, setIsBurgerMenuShown } = useBurgerMenuContext();

  const handleChangeIcon = (link: string) => {
    if (link === HeaderOtherLinks.cart) {
      return (
        <Badge badgeContent={cartQuantity} max={99} color="info">
          {locationPathname === HeaderOtherLinks.cart ? (
            <ShoppingCartIcon
              color="primary"
              sx={{ width: '20px', height: '20px' }}
            ></ShoppingCartIcon>
          ) : (
            <ShoppingCartOutlinedIcon
              color="primary"
              sx={{ width: '20px', height: '20px' }}
            ></ShoppingCartOutlinedIcon>
          )}
        </Badge>
      );
    }

    return (
      <Badge badgeContent={favoritesQuantity} color="info" max={99}>
        {locationPathname === HeaderOtherLinks.favorites ? (
          <FavoriteIcon
            color="primary"
            sx={{ width: '20px', height: '20px' }}
          ></FavoriteIcon>
        ) : (
          <FavoriteBorderIcon
            color="primary"
            sx={{ width: '20px', height: '20px' }}
          ></FavoriteBorderIcon>
        )}
      </Badge>
    );
  };

  return (
    <StyledWrapperButton>
      {searchField && <Search />}

      <DesktopButtonsWrapper>
        {Object.entries(HeaderOtherLinks).map(([text, link]) => {
          return (
            <ActiveLink key={text} label={handleChangeIcon(link)} to={link} />
          );
        })}
      </DesktopButtonsWrapper>

      <StyledBurgerButton
        disableElevation
        onClick={() => {
          toggleBurgerMenu(setIsBurgerMenuShown, isBurgerMenuShown);
          if (isSearchOpen) {
            setIsSearchOpen(false);
            handleClearSearch();
          }
        }}
      >
        {isBurgerMenuShown ? (
          <MenuOpenIcon
            color="primary"
            sx={{ width: '16px', height: '16px' }}
          ></MenuOpenIcon>
        ) : (
          <MenuIcon
            color="primary"
            sx={{ width: '16px', height: '16px' }}
          ></MenuIcon>
        )}
      </StyledBurgerButton>

      <Divider
        orientation="vertical"
        sx={({ breakpoints, palette }) => ({
          backgroundColor: palette.element.main,
          height: '64px',
          [breakpoints.down('md')]: {
            height: '48px',
          },
        })}
      />

      <ChangeModeButton
        disableElevation
        disableRipple
        onClick={() => {
          if (mode === 'dark') {
            setMode('light');
          } else {
            setMode('dark');
          }
        }}
      >
        {mode === 'dark' ? (
          <NightlightOutlinedIcon />
        ) : (
          <LightModeOutlinedIcon />
        )}
      </ChangeModeButton>
    </StyledWrapperButton>
  );
};
