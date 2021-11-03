//* Account authentication must match this
import { Icon, InlineIcon } from '@iconify/react';
import facebookIcon from '@iconify/icons-simple-icons/facebook';

import React, { useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import Fields from './Fields';
import { EmailPassword } from './Login';
// import { setUser, setSnackbar } from '../contexts/actions';
import { setSnackbar } from '../contexts/actions';

// import addUserIcon from '../../images/add-user.svg';
// import nameAdornment from '../../images/name-adornment.svg';
// import forward from '../../images/forward-outline.svg';
// import backward from '../../images/backwards-outline.svg';

export const setUser = (user) => ({
  type: 'SET_USER',
  payload: { user },
});

const useStyles = makeStyles((theme) => ({
  addUserIcon: {
    height: '10rem',
    width: '11rem',
    marginTop: '5rem',
  },
  addUserIcons: {
    // height: '10rem',
    // width: '11rem',
    backgroundColor: '#2d3238',
    // borderWidth: '2px',
    color: '#2d3238',
    // marginTop: '5rem',
  },
  facebookSignUp: {
    width: '15rem',
    backgroundColor: '#2d3238',
    borderRadius: 50,
    // fontSize: '0.5rem',
    marginTop: '1rem',
    [theme.breakpoints.down('xs')]: {
      width: '15rem',
    },
  },
  facebookText: {
    textTransform: 'none',
    fontSize: '1rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.25rem',
    },
  },
  facebookLogo: {
    fontSize: '1.25rem',
    marginRight: '15px',
  },
  navigation: {
    height: '4rem',
    width: '4rem',
  },
  visibleIcon: {
    padding: 0,
  },
  emailAdornment: {
    height: 17,
    width: 22,
    marginBottom: 10,
  },
  removeButtonMargin: {
    marginTop: 0,
  },
}));

export default function SignUp({
  steps,
  setSelectedStep,
  dispatchUser,
  dispatchFeedback,
}) {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);
  const [info, setInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNavigate = (direction) => {
    if (direction === 'forward') {
      setInfo(true);
    } else if (info) {
      setInfo(false);
    } else {
      const login = steps.find((step) => step.label === 'Login');

      setSelectedStep(steps.indexOf(login));
    }
  };

  const handleComplete = () => {
    setLoading(true);

    axios
      .post(`${process.env.GATSBY_STRAPI_URL}/auth/local/register`, {
        username: values.name,
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        setLoading(false);
        dispatchUser(
          setUser({ ...response.data.user, jwt: response.data.jwt })
        );

        const complete = steps.find((step) => step.label === 'Complete');

        setSelectedStep(steps.indexOf(complete));
      })
      .catch((error) => {
        const { message } = error.response.data.message[0].messages[0];
        setLoading(false);
        console.error(error);
        dispatchFeedback(setSnackbar({ status: 'error', message }));
      });
  };

  const nameField = {
    name: {
      helperText: 'you must enter a name',
      placeholder: 'Username*',
      // startAdornment: <img src={nameAdornment.src} alt="name" />,
    },
  };

  const fields = info
    ? EmailPassword(false, false, visible, setVisible)
    : nameField;

  const disabled =
    Object.keys(errors).some((error) => errors[error] === true) ||
    Object.keys(errors).length !== Object.keys(values).length;

  return (
    <>
      <Grid item>
        {/* <img
          src={addUserIcon.src}
          alt="new user"
          className={classes.addUserIcon}
        /> */}
      </Grid>
      <Fields
        className={classes.addUserIcons}
        fields={fields}
        errors={errors}
        setErrors={setErrors}
        values={values}
        setValues={setValues}
      />
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          component={!info ? 'a' : undefined}
          href={
            !info
              ? `${process.env.GATSBY_STRAPI_URL}/connect/facebook`
              : undefined
          }
          disabled={loading || (info && disabled)}
          onClick={() => (info ? handleComplete() : null)}
          classes={{
            root: clsx(classes.facebookSignUp, {
              [classes.removeButtonMargin]: info,
            }),
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Icon className={classes.facebookLogo} icon={facebookIcon} />
              <Typography variant="h5" classes={{ root: classes.facebookText }}>
                Sign up{info ? '' : ' with Facebook'}
              </Typography>
            </>
          )}
        </Button>
      </Grid>
      <Grid item container justifyContent="space-between">
        <Grid item>
          <IconButton onClick={() => handleNavigate('backward')}>
            {/* <img
              src={backward.src}
              alt="back to login"
              className={classes.navigation}
            /> */}
          </IconButton>
        </Grid>
        {info ? null : (
          <Grid item>
            <IconButton onClick={() => handleNavigate('forward')}>
              {/* <img
                src={forward.src}
                alt="continue registration"
                className={classes.navigation}
              /> */}
            </IconButton>
          </Grid>
        )}
      </Grid>
    </>
  );
}
