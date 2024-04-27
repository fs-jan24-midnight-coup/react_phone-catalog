import Container from '../Container/Container';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import {
  BackToTopButton,
  Footer as StyledFooter,
  FooterContent,
  FooterLogoLink,
  FooterLinks,
  FooterLink,
} from './Footer.styles';
import { Box, Typography } from '@mui/material';
import { useThemeChangeContext } from '../../hooks/useThemeChangeContext';

const Footer = () => {
  const { mode } = useThemeChangeContext();

  return (
    <StyledFooter component="footer">
      <Container>
        <FooterContent>
          <FooterLogoLink to="/">
            <img
              src={
                mode === 'dark'
                  ? 'img/header/logo-dark-mode.svg'
                  : 'img/header/logo.svg'
              }
              alt="Logo Nice gadget"
            />
          </FooterLogoLink>
          <FooterLinks
            spacing={{ xs: 2, md: 13 }}
            direction={{ xs: 'column', sm: 'row' }}
          >
            <FooterLink to="/">
              <Typography variant="button">Github</Typography>
            </FooterLink>
            <FooterLink to="/">
              <Typography variant="button">Contact</Typography>
            </FooterLink>
            <FooterLink to="/">
              <Typography variant="button">Rights</Typography>
            </FooterLink>
          </FooterLinks>
          <BackToTopButton to="#root">
            <Typography variant="caption">Back to top</Typography>
            <Box
              sx={({ palette }) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
                borderRadius: '100%',
                border: `1px solid ${palette.primary.main}`,
              })}
            >
              <ArrowBackIosNewIcon
                style={{
                  width: '16px',
                  height: '16px',
                  rotate: '90deg',
                }}
                color="primary"
              />
            </Box>
          </BackToTopButton>
        </FooterContent>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
