import { useState } from 'react';
import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// material
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
// hooks
import { MIconButton } from 'src/minimalComponents/@material-extend';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
//
import GuestGuard from 'src/guards/GuestGuard';

// ----------------------------------------------------------------------

export default function RegisterFormDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // & Below is all the form stuff from the RegisterForm.js component:
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Last name required'),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        console.log('onSubmit', register);
        await register(
          values.email,
          values.password,
          values.firstName,
          values.lastName
        );
        enqueueSnackbar('Register success', {
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
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  // & Above is all the form stuff from the RegisterForm.js component...

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Register
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">Join CarX, it's fast and easy.</DialogTitle>
        <DialogContent>
          <DialogContentText />
          <br />

          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {errors.afterSubmit && (
                  <Alert severity="error">{errors.afterSubmit}</Alert>
                )}

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="First name"
                    {...getFieldProps('firstName')}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />

                  <TextField
                    fullWidth
                    label="Last name"
                    {...getFieldProps('lastName')}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Stack>

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
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />

                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Register
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          {/* <Button onClick={handleClose} variant="contained">
            Register
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
