import { StyledLink } from '.';
import { Divider, Typography } from '@mui/material';

interface ActiveLinkProps {
  label: string | JSX.Element;
  to: string;
}

export const ActiveLink: React.FC<ActiveLinkProps> = ({ label, to }) => {
  const isJSXElem = typeof label !== 'string';

  return isJSXElem ? (
    <>
      <Divider
        orientation="vertical"
        sx={({ breakpoints, palette }) => ({
          backgroundColor: palette.element.main,
          height: '64px',
          [breakpoints.down('md')]: {
            height: '48px',
          },
        })}
      />
      <StyledLink
        to={to}
        sx={({ breakpoints }) => ({
          width: '64px',
          [breakpoints.down('md')]: {
            width: '48px',
          },
        })}
      >
        {label}
      </StyledLink>
    </>
  ) : (
    <StyledLink to={to}>
      {({ isActive }) => {
        return (
          <Typography
            variant="button"
            sx={{
              fontSize: '12px',
            }}
            color={isActive ? 'primary' : 'secondary'}
          >
            {label}
          </Typography>
        );
      }}
    </StyledLink>
  );
};
