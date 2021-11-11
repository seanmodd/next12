import { useState } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Link as RouterLink } from 'next';
import { useRouter } from 'next/router';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Alert,
  Checkbox,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  Container,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from 'src/routes/paths';
// hooks
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
//
import { MIconButton } from 'src/minimalComponents/@material-extend';

// ----------------------------------------------------------------------

export default function LoginFormDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // & Below is for the form
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    router.push('/dashboard/shop');
  };
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await login(values.email, values.password);
        enqueueSnackbar('Login success', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          ),
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: error.message });
        }
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  console.log('isAuthenticated : ', isAuthenticated);
  // & Above is for the form

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Login
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login now</DialogTitle>
        <DialogContent>
          <DialogContentText />
          <br />

          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {/* {errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit}</Alert>
          )} */}

                <TextField
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="Email address"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  {...getFieldProps('password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end">
                          <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ my: 2 }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      {...getFieldProps('remember')}
                      checked={values.remember}
                    />
                  }
                  label="Remember me"
                />

                <Link
                  component={RouterLink}
                  variant="subtitle2"
                  href="/dashboard/user/reset-password"
                >
                  Forgot password?
                </Link>
              </Stack>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Login
              </LoadingButton>
            </Form>
          </FormikProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          {/* <Button onClick={handleClose} variant="contained">
            Login
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
