import React, { useContext } from 'react';
import Context from '../store/context';

export const Nav = () => {
  const { globalState, globalDispatch } = useContext(Context);

  return (
    <nav>
      {globalState.isLoggedIn ? (
        <button
          type="buttton"
          onClick={() => globalDispatch({ type: 'LOGOUT' })}
        >
          Logout
        </button>
      ) : (
        <button
          type="buttton"
          onClick={() => globalDispatch({ type: 'LOGIN' })}
        >
          Login
        </button>
      )}
    </nav>
  );
};
