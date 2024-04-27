import { Box, Typography, useMediaQuery } from '@mui/material';
import { Category } from '../../types/Category';
import { useTheme } from '@mui/material/styles';
import { customBreakpoints } from '../../theme/breakpoints.config';

type Props = {
  category: Category;
};

export const CategoryCard: React.FC<Props> = ({ category }) => {
  const { sm, lg } = customBreakpoints.values;
  const theme = useTheme();

  const isTablet = useMediaQuery(theme.breakpoints.between(sm, lg)); // 640px to 1199px
  const isMobile = useMediaQuery(theme.breakpoints.down(sm)); // up to 639p

  interface BoxProps {
    width: string;
    height: string;
  }

  const getBoxProps = (): BoxProps => {
    switch (true) {
      case isTablet:
        return {
          width: '187px',
          height: '187px',
        };
      case isMobile:
        return {
          width: '288px',
          height: '288px',
        };
      default:
        return {
          width: '368px',
          height: '368px',
        };
    }
  };

  return (
    <Box>
      <Box
        sx={{
          borderRadius: '8px',
          position: 'relative',
          bgcolor: category.background,
          overflow: 'hidden',
        }}
        {...getBoxProps()}
      >
        <Box
          component="img"
          src={category.img}
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            objectFit: 'cover',
            objectPosition: '0 80px',
            transform: 'scale(1) translate(20%)',
          }}
        ></Box>
      </Box>
      <Typography variant="h3" sx={{ pt: '24px' }} color="primary">
        {category.name}
      </Typography>
      <Typography variant="body2" color="secondary" sx={{ pt: '4px' }}>
        {category.amount} models
      </Typography>
    </Box>
  );
};
