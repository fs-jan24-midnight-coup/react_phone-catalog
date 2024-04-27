import { Breadcrumbs, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import WatchIcon from '@mui/icons-material/Watch';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import { useLocation } from 'react-router-dom';
import { FC } from 'react';
import { ProductExpanded } from '../../types';
import { StyledBreadCrumbs } from '.';

enum Page {
  Home = 'home',
  Phones = 'phones',
  Tablets = 'tablets',
  Accessories = 'accessories',
  Favorites = 'favorites',
  Cart = 'cart',
  About = 'about',
}

function getIcon(page: Page) {
  switch (page) {
    case Page.Home:
      return <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />;
    case Page.Phones:
      return <PhoneAndroidIcon sx={{ mr: 0.5 }} fontSize="inherit" />;
    case Page.Tablets:
      return <TabletAndroidIcon sx={{ mr: 0.5 }} fontSize="inherit" />;
    case Page.Accessories:
      return <WatchIcon sx={{ mr: 0.5 }} fontSize="inherit" />;
    case Page.Favorites:
      return <FavoriteIcon sx={{ mr: 0.5 }} fontSize="inherit" />;
    case Page.Cart:
      return <ShoppingCartIcon sx={{ mr: 0.5 }} fontSize="inherit" />;
    case Page.About:
      return <InfoIcon sx={{ mr: 0.5 }} fontSize="inherit" />;
    default:
      return;
  }
}

const createPath = (path: string) => {
  return Object.values(Page)
    .find(value => value === path)
    ?.split('')
    .reduce((acc, ch, i) => (i === 0 ? acc + ch.toUpperCase() : acc + ch), '');
};

function getFullPath(curPath: string[], page: string) {
  const prevPath = [];

  if (page === Page.Home) {
    return '';
  }

  for (const elem of curPath) {
    if (elem === page) {
      return [...prevPath, page].join('/');
    } else {
      if (elem !== Page.Home) {
        prevPath.push(elem);
      }
    }
  }
  return [...curPath, page].join('/');
}

type Props = {
  product?: ProductExpanded | null;
};

export const BreadCrumbsComponent: FC<Props> = ({ product }) => {
  const location = useLocation();
  const currentPath = location.pathname.split('/');
  currentPath[0] = 'home';

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<KeyboardArrowRightIcon color="primary" fontSize="small" />}
      sx={{
        py: 2,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {currentPath.map((path, index) => (
        <StyledBreadCrumbs
          href={`/react_phone-catalog/#/${getFullPath(currentPath, path)}`}
          key={index}
        >
          {getIcon(path as Page)}
          {index !== currentPath.length - 1 ? (
            <Typography variant="body1">
              {createPath(path) || product?.name}
            </Typography>
          ) : (
            <Typography
              variant="body1"
              sx={{ fontWeight: 'bold', fontSize: 18 }}
            >
              {createPath(path) || product?.name}
            </Typography>
          )}
        </StyledBreadCrumbs>
      ))}
    </Breadcrumbs>
  );
};
