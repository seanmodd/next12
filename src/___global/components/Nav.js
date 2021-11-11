import React, { useContext } from 'react';
import { Button } from '@mui/material';
import Context from '../store/context';

export const Nav = () => {
  const { globalState, globalDispatch } = useContext(Context);
  console.log('global state is as follows: ', globalState);
  return (
    <nav>
      {globalState.isLoggedIn ? (
        <Button
          type="buttton"
          onClick={() => globalDispatch({ type: 'LOGOUT' })}
          variant="outlined"
          color="primary"
        >
          Logout
        </Button>
      ) : (
        <Button
          type="buttton"
          onClick={() => globalDispatch({ type: 'LOGIN' })}
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      )}
    </nav>
  );
};
