import PropTypes from 'prop-types';
// import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../routes/paths';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth();

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
        <button style={{ backgroundColor: '#ff0000' }}>Logout?</button>
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
      <button style={{ backgroundColor: '#ff0000' }}>
        Login! Still Guest currently.
      </button>
      {children}
    </>
  );

  return <>{children}</>;
}
