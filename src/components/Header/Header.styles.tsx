import {
  AppBar,
  Box,
  Button,
  IconButton,
  Input,
  List,
  ListItem,
  styled,
} from '@mui/material';
import { Link, NavLink } from 'react-router-dom';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'sticky',
  background: theme.palette.backgoundSecondary.main,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.element.main}`,
}));

export const StyledFlexWrapper = styled(Box)(() => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
}));

export const StyledWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '48px',
  [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
    gap: '32px',
  },
}));

export const StyledWrapperButton = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const StyledLogoLink = styled(Link)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  minHeight: '64px',
  zIndex: 1,
  [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
    minHeight: '48px',
  },
}));

export const StyledLogo = styled('img')(({ theme }) => ({
  [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
    height: '22px',
  },
}));

export const StyledNav = styled('nav')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

export const StyledList = styled(List)(({ theme }) => ({
  padding: '0',
  display: 'flex',
  alignItems: 'center',
  gap: '64px',
  [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
    gap: '24px',
  },
}));

export const StyledItem = styled(ListItem)(() => ({
  padding: '0',
}));

export const DesktopButtonsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

export const StyledButton = styled(Button)(() => ({
  padding: '0',
  borderRadius: '0',
  fontWeight: '700',
  fontSize: '12px',
  height: '100%',
  '&:hover': {
    background: 'transparent',
  },
}));

export const StyledSearchWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledSearchButton = styled(IconButton)(({ theme }) => ({
  padding: 0,
  minHeight: '64px',
  width: '64px',

  svg: {
    width: '24px',
    height: '24px',
  },

  '&:after': {
    content: '""',
    position: 'absolute',
    right: '0',
    bottom: '0',
    display: 'block',
    width: '100%',
    height: '3px',
    transform: 'scaleX(0)',
    backgroundColor: theme.palette.primary.main,
    transition: 'transform 500ms',
  },

  '&:hover, &:active': {
    background: 'transparent',
  },

  '&:hover::after, &.active::after': {
    transform: 'scaleX(1)',
  },

  [theme.breakpoints.down('md')]: {
    width: '48px',
    minHeight: '48px',
    svg: {
      width: '16px',
      height: '16px',
    },
  },
}));

export const StyledSearchInput = styled(Input)(({ theme }) => ({
  paddingInline: '10px',
  height: '40px',
  width: '300px',
  borderRadius: '10px',
  border: `1px solid ${theme.palette.primary.main}`,
  outline: 'none',
  cursor: 'arrow',

  input: {
    padding: 0,
    paddingBlock: '10px',
    '&:placeholder': {
      color: theme.palette.primary.main,
    },
  },

  '&:before, &:after': {
    display: 'none',
  },

  [theme.breakpoints.down('md')]: {
    paddingInline: '8px',
    height: '32px',
    fontSize: '12px',
    input: {
      paddingBlock: '8px',
    },
  },

  [theme.breakpoints.down('sm')]: {
    paddingInline: '6px',
    height: '28px',
    fontSize: '10px',
    input: {
      paddingBlock: '6px',
    },
  },
}));

export const StyledBurgerButton = styled(Button)(({ theme }) => ({
  display: 'none',
  padding: '0',
  minWidth: 'unset',
  minHeight: '64px',
  width: '64px',
  borderRadius: '0',
  borderLeft: `1px solid ${theme.palette.element.main}`,

  svg: {
    width: '24px',
    height: '24px',
  },

  '&:after': {
    content: '""',
    position: 'absolute',
    right: '0',
    bottom: '0',
    display: 'block',
    width: '100%',
    height: '3px',
    transform: 'scaleX(0)',
    backgroundColor: theme.palette.primary.main,
    transition: 'transform 500ms',
  },

  '&:hover': {
    background: 'transparent',
  },

  '&:hover::after, &.active::after': {
    transform: 'scaleX(1)',
  },

  [theme.breakpoints.down('lg')]: {
    display: 'flex',
  },

  [theme.breakpoints.down('md')]: {
    width: '48px',
    minHeight: '48px',
    svg: {
      width: '16px',
      heigth: '16px',
    },
  },
}));

export const StyledLink = styled(NavLink)(({ theme }) => {
  return {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '64px',
    textDecoration: 'none',

    '&:after': {
      content: '""',
      position: 'absolute',
      right: '0',
      bottom: '0',
      display: 'block',
      width: '100%',
      height: '3px',
      transform: 'scaleX(0)',
      backgroundColor: theme.palette.primary.main,
      transition: 'transform 500ms',
    },

    '&:hover::after, &.active::after': {
      transform: 'scaleX(1)',
    },

    [theme.breakpoints.down('md')]: {
      minHeight: '48px',
    },
  };
});

export const StyledButtonClear = styled(Button)(({ theme }) => ({
  padding: 0,
  paddingBlock: '10px',
  paddingLeft: '10px',
  width: '24px',
  minWidth: '0',
  height: '100%',
  background: 'transparent',

  svg: {
    width: '16px',
    height: '16px',
  },

  '&:hover': {
    background: 'transparent',
  },

  [theme.breakpoints.down('md')]: {
    paddingBlock: '8px',
  },

  [theme.breakpoints.down('sm')]: {
    paddingBlock: '6px',
  },
}));

export const ChangeModeButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  padding: '0',
  minWidth: 'unset',
  minHeight: '64px',
  width: '64px',
  borderRadius: '0',

  svg: {
    width: '24px',
    height: '24px',
  },

  '&:after': {
    content: '""',
    position: 'absolute',
    right: '0',
    bottom: '0',
    display: 'block',
    width: '100%',
    height: '3px',
    transform: 'scaleX(0)',
    backgroundColor: theme.palette.primary.main,
    transition: 'transform 500ms',
  },

  '&:hover': {
    background: 'transparent',
  },

  '&:hover::after': {
    transform: 'scaleX(1)',
  },

  [theme.breakpoints.down('md')]: {
    width: '48px',
    minHeight: '48px',
    svg: {
      width: '16px',
      heigth: '16px',
    },
  },
}));
