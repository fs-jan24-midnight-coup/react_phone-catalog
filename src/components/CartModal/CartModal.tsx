import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

import { customTypography } from '../../theme/typography.config';
import { Button, Grow, GrowProps, TextField, styled } from '@mui/material';
import { useCartContext } from '../../hooks/useCartContext';
import { ChangeEvent, FormEvent, useState } from 'react';
import { StyledIconButton } from '../CartItem/CartItem';
import { DeleteIcon } from '../CartItem/CartItem.styles';
import { isToastOpen } from '../../types';

export const ModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: theme.palette.backgoundSecondary.main,
  border: '2px solid',
  borderColor: theme.palette.element.main,
  borderRadius: '16px',
  boxShadow: '24px',
  padding: '32px',
}));

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

export const CartModal: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  setIsToastOpen,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postIndex, setPostIndex] = useState('');
  const [creditCard, setCreditCard] = useState('');
  let isValid = true;

  const [error, setError] = useState<string[]>([]);
  function GrowTransition(props: GrowProps) {
    return <Grow {...props} />;
  }

  const handleClose = () => {
    setIsModalOpen(false);
    setError([]);
  };
  const { clearCart } = useCartContext();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const fieldName = e.target.name;
    const inputValue = e.target.value;
    const numberReg = /^\d+$/;

    switch (fieldName) {
      case 'name':
        setName(inputValue);
        setError(prev => prev.filter(item => item !== fieldName));

        break;
      case 'email':
        setEmail(inputValue);
        setError(prev => prev.filter(item => item !== fieldName));

        break;
      case 'phone':
        if (numberReg.test(inputValue) || inputValue.length === 0) {
          setPhone(inputValue);
          setError(prev => prev.filter(item => item !== fieldName));
        }

        break;
      case 'address':
        setAddress(inputValue);
        setError(prev => prev.filter(item => item !== fieldName));

        break;
      case 'postIndex':
        if (numberReg.test(inputValue) || inputValue.length === 0) {
          setPostIndex(inputValue);
          setError(prev => prev.filter(item => item !== fieldName));
        }

        break;
      case 'creditCard':
        if (numberReg.test(inputValue) || inputValue.length === 0) {
          setCreditCard(inputValue);
          setError(prev => prev.filter(item => item !== fieldName));
        }
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
        return email.length === 0 && setError(prev => [...prev, fieldName]);
      case 'phone':
        return phone.length === 0 && setError(prev => [...prev, fieldName]);
      case 'address':
        return address.length === 0 && setError(prev => [...prev, fieldName]);
      case 'postIndex':
        return postIndex.length === 0 && setError(prev => [...prev, fieldName]);
      case 'creditCard':
        return (
          creditCard.length === 0 && setError(prev => [...prev, fieldName])
        );
      case 'confimation':
        name.length === 0
          ? (setError(prev => [...prev, 'name']), (isValid = false))
          : null;
        email.length === 0
          ? (setError(prev => [...prev, 'email']), (isValid = false))
          : null;
        phone.length === 0
          ? (setError(prev => [...prev, 'phone']), (isValid = false))
          : null;
        address.length === 0
          ? (setError(prev => [...prev, 'address']), (isValid = false))
          : null;
        postIndex.length === 0
          ? (setError(prev => [...prev, 'postIndex']), (isValid = false))
          : null;
        creditCard.length === 0
          ? (setError(prev => [...prev, 'creditCard']), (isValid = false))
          : null;

        break;
      default:
        return null;
    }
  };

  const onConfirm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateField('confimation');

    if (isValid === true) {
      clearCart();
      setIsModalOpen(false);
      setIsToastOpen({
        open: true,
        Transition: GrowTransition,
        message: 'Success!',
        status: 'success',
      });
    }
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
            timeout: 500,
          },
        }}
      >
        <Fade in={isModalOpen}>
          <ModalBox>
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
                  color="primary"
                >
                  Enter your info
                </Typography>
              </Box>
              <Box
                display={'flex'}
                flexDirection={'row'}
                flexWrap={'wrap'}
                rowGap={'8px'}
              >
                <Box sx={textBoxStyle}>
                  <PersonIcon sx={{ mr: 1, my: 0.5 }} color="primary" />
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
                    sx={({ palette }) => ({
                      color: palette.primary.main,
                    })}
                    required
                    value={name}
                    name="name"
                    onBlur={e => validateField(e.target.name)}
                    onChange={e => handleChange(e)}
                  />
                </Box>
                <Box sx={textBoxStyle}>
                  <EmailIcon sx={{ mr: 1, my: 0.5 }} color="primary" />
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
                    color="primary"
                    required
                    value={email}
                    name="email"
                    onBlur={e => validateField(e.target.name)}
                    onChange={e => handleChange(e)}
                  />
                </Box>
                <Box sx={textBoxStyle}>
                  <PhoneIcon sx={{ mr: 1, my: 0.5 }} color="primary" />
                  <TextField
                    error={error.includes('phone')}
                    helperText={
                      error.includes('phone') && 'Phone must be correct'
                    }
                    fullWidth
                    label="Phone number"
                    type="tel"
                    id="fullWidth"
                    variant="standard"
                    color="primary"
                    required
                    value={phone}
                    name="phone"
                    onBlur={e => validateField(e.target.name)}
                    onChange={e => handleChange(e)}
                  />
                </Box>
                <Box sx={textBoxStyle}>
                  <HomeIcon sx={{ mr: 1, my: 0.5 }} color="primary" />
                  <TextField
                    error={error.includes('address')}
                    helperText={
                      error.includes('address') && 'Address must be correct'
                    }
                    fullWidth
                    label="Address"
                    type="text"
                    id="fullWidth"
                    variant="standard"
                    color="primary"
                    required
                    value={address}
                    name="address"
                    onBlur={e => validateField(e.target.name)}
                    onChange={e => handleChange(e)}
                  />
                </Box>
                <Box sx={textBoxStyle}>
                  <LocalShippingIcon sx={{ mr: 1, my: 0.5 }} color="primary" />
                  <TextField
                    error={error.includes('postIndex')}
                    helperText={
                      error.includes('postIndex') &&
                      'Post index must be correct'
                    }
                    fullWidth
                    label="Post index"
                    type="text"
                    id="fullWidth"
                    variant="standard"
                    color="primary"
                    required
                    value={postIndex}
                    name="postIndex"
                    onBlur={e => validateField(e.target.name)}
                    onChange={e => handleChange(e)}
                  />
                </Box>
                <Box sx={textBoxStyle}>
                  <CreditCardIcon sx={{ mr: 1, my: 0.5 }} color="primary" />
                  <TextField
                    error={error.includes('creditCard')}
                    helperText={
                      error.includes('creditCard') &&
                      'Credit card must be correct'
                    }
                    autoComplete="cc-number"
                    fullWidth
                    label="Credit card"
                    type="text"
                    id="fullWidth"
                    variant="standard"
                    color="primary"
                    required
                    value={creditCard}
                    name="creditCard"
                    onBlur={e => validateField(e.target.name)}
                    onChange={e => handleChange(e)}
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
          </ModalBox>
        </Fade>
      </Modal>
    </div>
  );
};
