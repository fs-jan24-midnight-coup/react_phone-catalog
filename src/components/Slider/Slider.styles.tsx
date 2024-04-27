import { Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';

import slideOne from '/img/slider/slide-one/slide_one_desktop.png';
import slideOneTablet from '/img/slider/slide-one/slide_one_tablet.png';
import slideOneMobile from '/img/slider/slide-one/slide_one_mobile.png';

import slideTwo from '/img/slider/slide-two/slide_two_desktop.png';
import slideTwoTablet from '/img/slider/slide-two/slide_two_tablet.png';
import slideTwoMobile from '/img/slider/slide-two/slide_two_mobile.png';

import slideThreeDesktop from '/img/slider/slide-three/slider_three_desktop.png';
import slideThreeTablet from '/img/slider/slide-three/slider_three_tablet.png';
import slideThreeMobile from '/img/slider/slide-three/slider_three_mobile.png';
import { Container } from '@mui/material';

export const SliderContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    padding: '0',
  },

  [theme.breakpoints.up('sm')]: {
    width: '576px',
  },

  [theme.breakpoints.up('md')]: {
    width: 'auto',
  },
}));

export const SliderBanner = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '8px',

  [theme.breakpoints.up('xs')]: {
    '.swiper': {
      width: '100vh',
      borderRadius: '0',
    },
  },

  [theme.breakpoints.up('sm')]: {
    '.swiper': {
      width: '490px',
      gap: '19px',
      borderRadius: '8px',
    },
  },

  [theme.breakpoints.up('md')]: {
    '.swiper': {
      width: '1040px',
      margin: '0',
    },
  },
}));

export const SwiperArrow = styled(Box)(({ theme }) => ({
  '&::after': {
    content: 'none',
  },
  alignSelf: 'stretch',
  position: 'relative',
  border: '1px solid',
  borderColor: theme.palette.icon.main,
  borderRadius: '48px',
  top: 'unset !important',
  left: 'unset !important',
  bottom: 'unset !important',
  width: '32px !important',
  right: 'unset !important',
  margin: 0,
  textAlign: 'center',
  minWidth: '32px',

  [theme.breakpoints.up('xs')]: {
    display: 'none',
  },

  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    height: '189px',
    boxSizing: 'border-box',
  },

  [theme.breakpoints.up('md')]: {
    height: '400px',
  },
}));

export const LinkOne = styled(Link)(({ theme }) => ({
  display: 'block',
  width: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'top center',

  [theme.breakpoints.up('xs')]: {
    backgroundImage: `url(${slideOneMobile})`,
    height: '100vw',
  },

  [theme.breakpoints.up('sm')]: {
    backgroundImage: `url(${slideOneTablet})`,
    height: '189px',
  },
  [theme.breakpoints.up('md')]: {
    backgroundImage: `url(${slideOne})`,
    height: '400px',
  },
}));

export const LinkTwo = styled(Link)(({ theme }) => ({
  display: 'block',
  width: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'top center',

  [theme.breakpoints.up('xs')]: {
    backgroundImage: `url(${slideTwoMobile})`,
    height: '100vw',
  },

  [theme.breakpoints.up('sm')]: {
    backgroundImage: `url(${slideTwoTablet})`,
    height: '189px',
  },
  [theme.breakpoints.up('md')]: {
    backgroundImage: `url(${slideTwo})`,
    height: '400px',
  },
}));

export const LinkThree = styled(Link)(({ theme }) => ({
  display: 'block',
  width: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'top center',

  [theme.breakpoints.up('xs')]: {
    backgroundImage: `url(${slideThreeMobile})`,
    height: '100vw',
  },

  [theme.breakpoints.up('sm')]: {
    backgroundImage: `url(${slideThreeTablet})`,
    height: '189px',
  },

  [theme.breakpoints.up('md')]: {
    backgroundImage: `url(${slideThreeDesktop})`,
    height: '400px',
  },
}));

export const SwiperPaginationWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  top: 'unset !important',
  left: 'unset !important',
  bottom: 'unset !important',
  right: 'unset !important',

  '.swiper-pagination-bullet': {
    width: '14px',
    height: '4px',
    margin: '4px',
    borderRadius: 'initial',
    backgroundColor: theme.palette.secondary.main,
    cursor: 'pointer',
  },
  '.swiper-pagination-bullet-active': {
    backgroundColor: theme.palette.primary.main,
  },
}));
