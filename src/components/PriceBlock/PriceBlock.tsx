import { Stack, Typography } from '@mui/material';

type Props = {
  price: number;
  fullPrice: number;
};

export const PriceBlock: React.FC<Props> = ({ price, fullPrice }) => {
  return (
    <Stack direction="row" spacing={2} sx={{ pt: '8px', pb: 1 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: '800', fontSize: '32px' }}
        color="primary"
      >
        ${price}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: '500',
          fontSize: '22px',
          color: 'secondary.main',
          textDecoration: 'line-through',
        }}
      >
        ${fullPrice}
      </Typography>
    </Stack>
  );
};
