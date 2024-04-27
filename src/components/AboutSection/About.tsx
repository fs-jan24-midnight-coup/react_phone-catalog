import { Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { Description } from '../../types';

interface AboutProps {
  description: Description[];
}

export const About: React.FC<AboutProps> = ({ description }) => {
  return (
    <Stack sx={{ flex: 1 }}>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Typography variant="h3" color="primary">
            About
          </Typography>
          <Divider />
        </Stack>
        {description?.map(descr => {
          return (
            <Stack key={descr.title} spacing={2}>
              <Typography variant="h4" color="primary">
                {descr.title}
              </Typography>
              <Typography variant="body1" color="secondary">
                {descr.text}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
