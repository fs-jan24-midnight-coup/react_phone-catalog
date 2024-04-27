import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Slider, Stack } from '@mui/material';

type Props = {
  maxPriceInCategory: number;
  minPriceInCategory: number;
};

export const CategoryPriceRange: React.FC<Props> = ({
  minPriceInCategory,
  maxPriceInCategory,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState<number[]>([
    minPriceInCategory,
    maxPriceInCategory,
  ]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const minPrice = Number(params.get('minPrice') || `${minPriceInCategory}`);
    const maxPrice = Number(params.get('maxPrice') || `${maxPriceInCategory}`);

    setPriceRange([minPrice, maxPrice]);
  }, [searchParams, minPriceInCategory, maxPriceInCategory]);

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    const params = new URLSearchParams(searchParams);

    if (Array.isArray(newValue) && newValue[0] !== newValue[1]) {
      params.set('minPrice', newValue[0].toString());
      params.set('maxPrice', newValue[1].toString());
    }

    setSearchParams(params);
  };

  return (
    <Stack sx={{ width: 270, pb: 3, pr: 1 }} spacing={2} direction="column">
      <Box sx={{ pl: 1 }}>
        <Slider
          aria-label="Price"
          value={priceRange}
          onChange={handlePriceChange}
          min={minPriceInCategory}
          max={maxPriceInCategory}
          step={100}
          valueLabelDisplay="auto"
          color="accent"
          sx={{
            '& .MuiSlider-thumb': {
              height: 18,
              width: 18,
              backgroundColor: 'background.paper',
              border: '2px solid currentColor',
            },
          }}
        />
      </Box>
    </Stack>
  );
};
