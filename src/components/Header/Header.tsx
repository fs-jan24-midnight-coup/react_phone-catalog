import React from 'react';
import { useLocation } from 'react-router-dom';

import {
  StyledAppBar,
  StyledFlexWrapper,
  StyledWrapper,
  StyledLogoLink,
  StyledLogo,
} from './Header.styles';
import { NavMenu } from './NavMenu';

import Container from '../Container/Container';
import { NavBarButtons } from '.';
import { useSearchContext } from '../../hooks/useSearchContext';
import { useBurgerMenuContext } from '../../hooks/useBurgerMenuContext';
import { useThemeChangeContext } from '../../hooks/useThemeChangeContext';

export const Header: React.FC = () => {
  const { mode } = useThemeChangeContext();
  const { isSearchOpen } = useSearchContext();
  const { setIsBurgerMenuShown } = useBurgerMenuContext();
  const { pathname } = useLocation();
  const searchField =
    pathname === '/phones' ||
    pathname === '/tablets' ||
    pathname === '/accessories';

  return (
    <StyledAppBar>
      <Container>
        <StyledFlexWrapper>
          <StyledWrapper>
            <StyledLogoLink
              sx={({ breakpoints }) => ({
                [breakpoints.down('sm')]: {
                  opacity: isSearchOpen ? 0 : 1,
                },
              })}
              to=""
              onClick={() => setIsBurgerMenuShown(false)}
            >
              <StyledLogo
                src={
                  mode === 'dark'
                    ? 'img/header/logo-dark-mode.svg'
                    : 'img/header/logo.svg'
                }
                alt="Nice Gadget Logo"
              />
            </StyledLogoLink>

            <NavMenu />
          </StyledWrapper>

          <NavBarButtons searchField={searchField} />
        </StyledFlexWrapper>
      </Container>
    </StyledAppBar>
  );
};
