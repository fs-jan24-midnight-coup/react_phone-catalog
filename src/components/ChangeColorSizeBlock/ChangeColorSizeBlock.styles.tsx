import { styled } from '@mui/material';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

export const Colors = styled(Box)({
  display: 'flex',
  gap: '8px',
});

export const OptionsTitle = styled(Box)(({ theme }) => ({
  marginTop: 0,
  marginBottom: '8px',
  fontFamily: 'Mont',
  fontSize: '12px',
  color: theme.palette.secondary.main,
}));

export const LineBox = styled(Box)(({ theme }) => ({
  borderTop: '1px solid',
  borderColor: theme.palette.element.main,
  marginBottom: '24px',

  [theme.breakpoints.up('sm')]: {
    width: '237px',
  },

  [theme.breakpoints.up('md')]: {
    width: '320px',
  },
}));

export const Capacityes = styled(Box)({
  display: 'flex',
  gap: '8px',
  marginBottom: '24px',
});

export const Capacity = styled(Link)(({ theme }) => ({
  padding: '8px',
  border: '1px solid',
  borderColor: theme.palette.element.main,
  borderRadius: '4px',
  color: theme.palette.primary.main,
  textDecoration: 'none',
  cursor: 'pointer',

  '&.active': {
    border: '1px solid',
    borderColor: theme.palette.backgoundPrimary.main,
    color: theme.palette.backgoundPrimary.main,
    backgroundColor: theme.palette.primary.main,
  },
}));

export const CapacityValue = styled('p')({
  fontFamily: 'Mont',
  fontSize: '14px',
  margin: 0,
  lineHeight: '10px',
});

export const ColorWrapper = styled(Link)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  border: '1px solid',
  borderColor: theme.palette.element.main,
  marginBottom: '24px',
  cursor: 'pointer',

  '&.active': {
    border: '1px solid',
    borderColor: theme.palette.primary.main,
  },
}));

export const Color = styled('p')(({ theme }) => ({
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  border: '2px solid',
  borderColor: theme.palette.white.main,
}));
