import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import HttpsIcon from '@mui/icons-material/Https';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import { InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { customTypography } from '../../theme/typography.config';
import { Button, Grow, GrowProps, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { StyledIconButton } from '../CartItem/CartItem';
import { DeleteIcon } from '../CartItem/CartItem.styles';
import { isToastOpen } from '../../types';
import { ModalBox } from '../CartModal';
import { loginUser, registerUser } from '../../utils';

const textBoxStyle = {
  m: '0 auto',
  display: 'flex',
  alignItems: 'flex-end',
  minWidth: '300px',
};

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  setIsToastOpen: (isToastOpen: isToastOpen) => void;
};

export const AuthModal: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  setIsToastOpen,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let isValid = true;
  const [isRegistered, setIsRegistered] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const togglePasswordHide = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [error, setError] = useState<string[]>([]);
  function GrowTransition(props: GrowProps) {
    return <Grow {...props} />;
  }

  const handleClose = () => {
    setIsModalOpen(false);
    setError([]);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const fieldName = e.target.name;
    const inputValue = e.target.value;

    switch (fieldName) {
      case 'name':
        setName(inputValue);
        setError(prev => prev.filter(item => item !== fieldName));

        break;
      case 'email':
        setEmail(inputValue);
        setError(prev => prev.filter(item => item !== fieldName));

        break;
      case 'password':
        setPassword(inputValue);
        setError(prev => prev.filter(item => item !== fieldName));

        break;
      default:
        return null;
    }
  };

  const validateField = (fieldName: string) => {
    switch (fieldName) {
      case 'name':
        return name.length === 0 && setError(prev => [...prev, fieldName]);
      case 'email':
        return (
          (emailRegExp.test(email) === false || email.length === 0) &&
          setError(prev => [...prev, fieldName])
        );
      case 'password':
        return password.length < 6 && setError(prev => [...prev, fieldName]);
      case 'confimation':
        name.length === 0
          ? (setError(prev => [...prev, 'name']), (isValid = false))
          : null;
        if (!isRegistered) {
          email.length === 0 || !emailRegExp.test(email)
            ? (setError(prev => [...prev, 'email']), (isValid = false))
            : null;
        }
        password.length < 6
          ? (setError(prev => [...prev, 'password']), (isValid = false))
          : null;

        break;
      default:
        return null;
    }
  };

  const onConfirm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateField('confimation');

    if (isValid === true) {
      let message = 'Success!';
      let isError = false;

      if (isRegistered) {
        try {
          await loginUser(name, password);
          setIsModalOpen(false);
          setName('');
          setEmail('');
          setPassword('');
        } catch (error) {
          message = 'Password or username is uncorrect';
          isError = true;
        }
        setIsToastOpen({
          open: true,
          Transition: GrowTransition,
          message: message,
          status: isError ? 'error' : 'success',
        });
      } else if (!isRegistered) {
        try {
          await registerUser(name, email, password);
          setIsRegistered(false);
        } catch (error) {
          message = 'User already exist';
          isError = true;
        }
        isRegistered
          ? setIsModalOpen(false)
          : !isError
            ? setIsRegistered(true)
            : null;
        setIsToastOpen({
          open: true,
          Transition: GrowTransition,
          message: message,
          status: isError ? 'error' : 'success',
        });
      }
    }
  };

  const onSignStatus = () => {
    setIsRegistered(!isRegistered);
    setError([]);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isModalOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 800,
          },
        }}
      >
        <Fade in={isModalOpen}>
          <ModalBox
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            gap={'16px'}
          >
            <form onSubmit={onConfirm} onInvalid={onConfirm}>
              <Box
                position={'relative'}
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <StyledIconButton
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                  }}
                >
                  <DeleteIcon />
                </StyledIconButton>
                <Typography
                  variant="h2"
                  textAlign={'center'}
                  gutterBottom
                  sx={customTypography.h2}
                >
                  {isRegistered ? 'Sign in' : 'Sign up'}
                </Typography>
              </Box>
              <Box
                display={'flex'}
                flexDirection={'row'}
                flexWrap={'wrap'}
                rowGap={'8px'}
              >
                <Box sx={textBoxStyle}>
                  <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    error={error.includes('name')}
                    helperText={
                      error.includes('name') && 'Name must be correct'
                    }
                    autoComplete="name"
                    fullWidth
                    label="Name"
                    type="text"
                    id="fullWidth"
                    variant="standard"
                    required
                    value={name}
                    name="name"
                    onBlur={e => validateField(e.target.name)}
                    onChange={e => handleChange(e)}
                  />
                </Box>
                {!isRegistered && (
                  <Box sx={textBoxStyle}>
                    <EmailIcon
                      sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                    />
                    <TextField
                      error={error.includes('email')}
                      helperText={
                        error.includes('email') && 'Email must be correct'
                      }
                      fullWidth
                      label="Email"
                      type="email"
                      id="fullWidth-error"
                      variant="standard"
                      required
                      value={email}
                      name="email"
                      onBlur={e => validateField(e.target.name)}
                      onChange={e => handleChange(e)}
                    />
                  </Box>
                )}
                <Box sx={textBoxStyle}>
                  <HttpsIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    error={error.includes('password')}
                    helperText={
                      error.includes('password') && 'Password must be correct'
                    }
                    fullWidth
                    label="Password"
                    type={isPasswordShown ? 'text' : 'password'}
                    id="fullWidth"
                    variant="standard"
                    required
                    value={password}
                    name="password"
                    onBlur={e => validateField(e.target.name)}
                    onChange={e => handleChange(e)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {' '}
                          {isPasswordShown ? (
                            <Visibility
                              sx={{ cursor: 'pointer' }}
                              onClick={togglePasswordHide}
                            />
                          ) : (
                            <VisibilityOff
                              onClick={togglePasswordHide}
                              sx={{ cursor: 'pointer' }}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Button
                variant="contained"
                color="accent"
                sx={{
                  mt: '32px',
                  width: '100%',
                  py: 1,
                  '&.MuiButton-contained': { color: 'white.main' },
                  textTransform: 'none',
                }}
                type="submit"
              >
                Confirm
              </Button>
            </form>
            <Button
              onClick={onSignStatus}
              sx={{
                margin: '0 auto',
                width: '100px',
              }}
            >
              {isRegistered ? 'Or sign up' : 'Or sign in'}
            </Button>
          </ModalBox>
        </Fade>
      </Modal>
    </div>
  );
};
