import { useEffect, useState, useRef } from 'react';

// material
import {
  Typography,
  Stack,
  TextField,
  Switch,
  Box,
  FormControlLabel,
} from '@mui/material';

import { PATH_DASHBOARD } from 'src/routes/paths';

// hooks
import useSettings from 'src/hooks/useSettings';

import { DevTool } from '@hookform/devtools';
import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import {
  FormSchema,
  defaultValues,
} from 'src/__components-overview/extra/form-validation';

const ReactHookForm = ({ openDevTool }) => {
  // const [openDevTool, setOpenDevTool] = useState(false);

  const {
    watch,
    reset,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    mode: 'onTouched',
    // resolver: yupResolver(FormSchema),
    defaultValues,
  });
  const watchAllFields = watch();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert(
      JSON.stringify(
        {
          ...data,
        },
        null,
        2
      )
    );
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          {/* <Box sx={{ mb: 0, display: 'flex', justifyContent: 'center' }}>
            <FormControlLabel
              control={<Switch checked={openDevTool} onChange={handleChange} />}
              label="Open Dev Tool"
            />
          </Box> */}
          <Controller
            name="fullName"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Full Name"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Email address"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            name="age"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Age"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />

          <LoadingButton
            fullWidth
            color="info"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            disabled={!isDirty}
          >
            Submit React Hook Form
          </LoadingButton>
        </Stack>
      </form>
      {openDevTool && <DevTool control={control} placement="top-right" />}
    </>
  );
};
export default ReactHookForm;
