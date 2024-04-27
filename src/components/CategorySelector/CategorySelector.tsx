import { Box, Typography } from '@mui/material';
import { CustomGrid } from '../CustomGrid';
import { Link } from 'react-router-dom';
import { CategoryCard } from '../CategoryCard';
import { Category } from '../../types/Category';
import { customTypography } from '../../theme/typography.config';

type Props = {
  categories: Category[];
};

export const CategorySelector: React.FC<Props> = ({ categories }) => {
  return (
    <Box>
      <Typography
        variant="h2"
        gutterBottom
        sx={customTypography.h2}
        color="primary"
      >
        Shop by category
      </Typography>
      <Box display={'flex'} justifyContent={'center'}>
        <CustomGrid
          columns={{
            DT: 3,
            LT: 3,
            TB: 3,
          }}
        >
          {categories.map(category => (
            <Link
              to={category.path}
              key={category.id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <CategoryCard category={category} />
            </Link>
          ))}
        </CustomGrid>
      </Box>
    </Box>
  );
};
