import PropTypes from "prop-types";
// import { Navigate } from 'react-router-dom';
// hooks
import useAuth from "src/otherComponents/hooks/useAuth";
import { Alert } from '@mui/material'
// routes
import { PATH_DASHBOARD } from "src/otherComponents//routes/paths";

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth();

  console.log("🥸🥸🥸", useAuth());

  if (isAuthenticated) {
    console.log(
      "🚀 ~ file: GuestGuard.js ~ line 18 ~ GuestGuard ~ isAuthenticated is true: ",
      isAuthenticated
    );
    // return <Navigate href={PATH_DASHBOARD.root} />;

    return (
      <>
        {/* <Navigate href={PATH_DASHBOARD.root} /> */}
        <div className="warning-message">Logout?</div>
        {children}
      </>
    );
  }

  console.log(
    "🚀 ~ file: GuestGuard.js ~ line 18 ~ GuestGuard ~ isAuthenticated is false: ",
    isAuthenticated
  );

  return (
    <>
      {/* <Navigate href={PATH_DASHBOARD.root} /> */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Login or Register</strong> You're Still a Guest.
      </Alert>
      {children}
    </>
  );

  return <>{children}</>;
}
