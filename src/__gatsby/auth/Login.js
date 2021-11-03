import { Icon, InlineIcon } from '@iconify/react';
import facebookIcon from '@iconify/icons-simple-icons/facebook';
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import { useTheme } from '@mui/material/styles';
// import forgotPasswordIcon from 'src/images/forgot.svg';

// import accountIcon from 'src/images/account.svg';
import EmailAdornment from 'src/images/EmailAdornment';
import PasswordAdornment from 'src/images/PasswordAdornment';
import HidePasswordIcon from 'src/images/HidePassword';
import ShowPasswordIcon from 'src/images/ShowPassword';
// import addUserIcon from 'src/images/add-user.svg';
// import close from 'src/images/close.svg';
import { setUser, setSnackbar } from '../contexts/actions';
import Fields from './Fields';
// import backward from '../../images/backwards-outline.svg';

const useStyles = makeStyles((theme) => ({
  accountIcon: {
    marginTop: '2rem',
  },
  login: {
    width: '10rem',
    borderRadius: 5,
    textTransform: 'none',
    marginBottom: '25px',
    borderWidth: 10,

    borderColor: '#2d3238',
    backgroundColor: 'none',
    marginTop: '25px',
    [theme.breakpoints.down('xs')]: {
      width: '15rem',
    },
  },
  facebookText: {
    fontSize: '1.5rem',
    fontWeight: 600,

    textTransform: 'none',
  },
  facebookButton: {
    marginTop: '1rem',
    fontSize: '1.0rem',
  },
  passwordError: {
    marginTop: 0,
  },
  close: {
    paddingTop: 5,
  },
  facebookLogo: {
    fontSize: '1.25rem',
    marginRight: '15px',
  },
  reset: {
    marginTop: '-4rem',
    // backgroundColor: '#ff0000',
  },
  buttonText: {
    color: '#eeeeee',
    fontWeight: 600,
    // marginBottom: '25px',
    width: '10rem',
    textDecoration: 'none',
    textTransform: 'none',

    transition: 'color 0.5s',
    '&:hover': {
      color: '#7ccbff',
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    },
  },
}));

export const EmailPassword = (
  hideEmail,
  hidePassword,
  visible,
  setVisible,
  isWhite
) => ({
  email: {
    helperText: 'invalid email',
    placeholder: 'Email',
    type: 'text',
    hidden: hideEmail,
    startAdornment: (
      <span style={{ height: 17, width: 22, marginBottom: 10 }}>
        <EmailAdornment color={isWhite ? '#fff' : null} />
      </span>
    ),
  },
  password: {
    helperText:
      'your password must be at least eight characters and include one uppercase letter, one number, and one special character',
    placeholder: 'Password',
    hidden: hidePassword,
    type: visible ? 'text' : 'password',
    startAdornment: <PasswordAdornment color={isWhite ? '#fff' : null} />,
    endAdornment: (
      <IconButton style={{ padding: 0 }} onClick={() => setVisible(!visible)}>
        {visible ? (
          <ShowPasswordIcon color={isWhite ? '#fff' : null} />
        ) : (
          <HidePasswordIcon color={isWhite ? '#fff' : null} />
        )}
      </IconButton>
    ),
  },
});

export default function Login({
  steps,
  setSelectedStep,
  user,
  dispatchUser,
  dispatchFeedback,
}) {
  const classes = useStyles();
  // console.log(
  //   '🚀 6️⃣6️⃣6️⃣6️⃣6️⃣6️⃣6️⃣6️⃣   ~ file: Login.js ~ line 132 ~ forgotPasswordIcon',
  //   forgotPasswordIcon
  // );

  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const fields = EmailPassword(false, forgot, visible, setVisible);

  const navigateSignUp = () => {
    const signUp = steps.find((step) => step.label === 'Sign Up');

    setSelectedStep(steps.indexOf(signUp));
  };

  const handleLogin = () => {
    setLoading(true);

    axios
      .post(`${process.env.GATSBY_STRAPI_URL}/auth/local`, {
        identifier: values.email,
        password: values.password,
      })
      .then((response) => {
        setLoading(false);
        dispatchUser(
          setUser({
            ...response.data.user,
            jwt: response.data.jwt,
            onboarding: true,
          })
        );
      })
      .catch((error) => {
        const { message } = error.response.data.message[0].messages[0];
        setLoading(false);
        console.error(error);
        dispatchFeedback(setSnackbar({ status: 'error', message }));
      });
  };

  const handleForgot = () => {
    setLoading(true);

    axios
      .post(`${process.env.GATSBY_STRAPI_URL}/auth/forgot-password`, {
        email: values.email,
      })
      .then((response) => {
        setLoading(false);
        setSuccess(true);

        dispatchFeedback(
          setSnackbar({ status: 'success', message: 'Reset Code Sent' })
        );
      })
      .catch((error) => {
        const { message } = error.response.data.message[0].messages[0];
        setLoading(false);
        console.error(error);
        dispatchFeedback(setSnackbar({ status: 'error', message }));
      });
  };

  const disabled =
    Object.keys(errors).some((error) => errors[error] === true) ||
    Object.keys(errors).length !== Object.keys(values).length;

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setForgot(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, [success]);

  return (
    <>
      <Grid item classes={{ root: classes.accountIcon }}>
        {/* <img src={accountIcon.src} alt="login page" /> */}
      </Grid>
      <Fields
        // style={{ borderColor: 'none', backgroundColor: 'none' }}
        fields={fields}
        errors={errors}
        setErrors={setErrors}
        values={values}
        setValues={setValues}
      />
      <Grid item>
        <Button
          // variant="contained"
          // color="secondary"
          style={{
            backgroundColor: '#2073e8',
            borderWidth: '5px',
            marginTop: '1rem',
          }}
          backgroundColor="black"
          disabled={loading || (!forgot && disabled)}
          onClick={() => (forgot ? handleForgot() : handleLogin())}
          classes={{
            root: clsx(classes.buttonText, {
              [classes.reset]: forgot,
            }),
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant="h5" classes={{ root: classes.buttonText }}>
              {forgot ? 'Forgot Password' : 'Login'}
            </Typography>
          )}
        </Button>
      </Grid>
      {forgot ? null : (
        <Grid item>
          <Button
            component="a"
            href={`${process.env.GATSBY_STRAPI_URL}/connect/facebook`}
            classes={{
              root: clsx(classes.facebookButton, {
                [classes.passwordError]: errors.password,
              }),
            }}
          >
            <Icon className={classes.facebookLogo} icon={facebookIcon} />
            <Typography variant="h3" classes={{ root: classes.facebookText }}>
              Login with Facebook
            </Typography>
          </Button>
        </Grid>
      )}
      <Grid item container justifyContent="space-between">
        <Grid item>
          <IconButton onClick={navigateSignUp}>
            {/* <img src={addUserIcon.src} alt="sign up" /> */}
          </IconButton>
        </Grid>
        <Grid
          item
          classes={{
            root: clsx({
              [classes.close]: forgot,
            }),
          }}
        >
          <IconButton onClick={() => setForgot(!forgot)}>
            {/* <img
              src={forgot ? close.src : forgotPasswordIcon.src}
              alt={forgot ? 'Back to Login' : 'Forgot Password'}
            /> */}
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
