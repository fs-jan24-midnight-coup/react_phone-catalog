import { Stack, Typography } from '@mui/material';

type Props = {
  screen: string;
  resolution: string;
  ram: string;
  processor: string;
};

const keyStyle = {
  color: 'secondary.main',
};

const valueStyle = {
  color: 'primary.main',
  fontWeight: '700',
};

export const SmallSpecsBlock: React.FC<Props> = ({
  screen,
  resolution,
  ram,
  processor,
}) => {
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'space-between', pt: 2 }}
      >
        <Typography variant="body1" sx={keyStyle}>
          Screen
        </Typography>
        <Typography variant="body1" sx={valueStyle}>
          {screen}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'space-between', pt: 0.5 }}
      >
        <Typography variant="body1" sx={keyStyle}>
          Resolution
        </Typography>
        <Typography variant="body1" sx={valueStyle}>
          {resolution}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'space-between', pt: 0.5 }}
      >
        <Typography variant="body1" sx={keyStyle}>
          Processor
        </Typography>
        <Typography variant="body1" sx={valueStyle}>
          {processor}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'space-between', pt: 0.5 }}
      >
        <Typography variant="body1" sx={keyStyle}>
          RAM
        </Typography>
        <Typography variant="body1" sx={valueStyle}>
          {ram}
        </Typography>
      </Stack>
    </>
  );
};
