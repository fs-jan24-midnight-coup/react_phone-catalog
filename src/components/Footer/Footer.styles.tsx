import { Box, Stack, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export const FooterLogoLink = styled(Link)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    marginBottom: '32px',
  },
  [theme.breakpoints.up('sm')]: {
    marginBottom: 0,
  },
}));

export const BackToTopButton = styled(HashLink)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  color: theme.palette.secondary.main,
  textTransform: 'none',
  textDecoration: 'none',
  padding: '0',
  transition: '0,2s easy-out',

  [theme.breakpoints.up('xs')]: {
    alignSelf: 'center',
  },

  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
  },
  '&:focus': {
    outline: 'none',
  },
}));

export const Footer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingTop: 32,
  paddingBottom: 32,
  marginTop: '20px',
  background: theme.palette.backgoundSecondary.main,
  boxShadow: '0px -1px 0px 0px' + theme.palette.element.main,
}));

export const FooterLinks = styled(Stack)(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  [theme.breakpoints.up('xs')]: {
    flexDirection: 'column',
    marginBottom: '32px',
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    marginBottom: 0,
  },
}));

export const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.secondary.main,
  textTransform: 'uppercase',
  textDecoration: 'inherit',

  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

export const ButtonToTopIcon = styled('img')({
  display: 'inline-block',
  rotate: '-90deg',
  marginLeft: 8,
  textDecoration: 'none',
});

export const FooterContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  height: '100%',
  width: '100%',
  [theme.breakpoints.up('xs')]: {
    flexDirection: 'column',
    alignItems: 'start',
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));
