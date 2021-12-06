//* Logout message is here
import { Button, Stack as MuiStack, Container } from '@mui/material';
import PropTypes from 'prop-types';
// import { Navigate } from 'react-router-dom';
// hooks
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
import LoginFormDialog from 'src/minimalComponents/authentication/popup/LoginFormDialog';
import RegisterFormDialog from 'src/minimalComponents/authentication/popup/RegisterFormDialog';
import { Stack } from 'immutable';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push('/dashboard/user/login');
  };
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      enqueueSnackbar(`You've logged out`, { variant: 'warning' });
      // router.push('/');
      if (isMountedRef.current) {
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout', { variant: 'error' });
    }
  };

  console.log(
    '🥸🥸🥸 This is from src/guards/GuestGuard.js, this is useAuth which we destructure to extract isAuthenticated from it : ',
    useAuth()
  );

  if (isAuthenticated) {
    console.log(
      'From src/guards/GuestGuard.js, isAuthenticated : ',
      isAuthenticated
    );
    // return <Navigate href={PATH_DASHBOARD.root} />;

    return (
      <>
        {/* <Navigate href={PATH_DASHBOARD.root} /> */}
        <Button variant="outlined" onClick={handleLogout}>
          Logout?
        </Button>
        {children}
      </>
    );
  }

  console.log(
    'From src/guards/GuestGuard.js, when isAuthenticated is equal to false : ',
    isAuthenticated
  );

  return (
    <>
      {/* <Navigate href={PATH_DASHBOARD.root} /> */}
      {/* <Button
        variant="contained"
        // style={{ backgroundColor: '#ff0000' }}
        onClick={handleClick}
      >
        Login! Still Guest currently.
      </Button> */}
      <MuiStack alignItems="center">
        <RegisterFormDialog />
        <br />
        <LoginFormDialog />
      </MuiStack>
      {children}
    </>
  );

  return <>{children}</>;
}
