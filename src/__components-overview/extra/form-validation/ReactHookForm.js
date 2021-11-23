import { useFormik } from 'formik';
import { useEffect, useState, useRef } from 'react';
import { filter, includes, orderBy } from 'lodash';
// material
import {
  Backdrop,
  Container,
  Typography,
  CircularProgress,
  Stack,
  Button,
  Checkbox,
  TextField,
  Switch,
  FormControl,
  FormLabel,
  FormGroup,
  Box,
  IconButton,
  InputAdornment,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';

import { PATH_DASHBOARD } from 'src/routes/paths';

// hooks
import useSettings from 'src/hooks/useSettings';
// components
import Page from 'src/minimalComponents/Page';
import HeaderBreadcrumbs from 'src/minimalComponents/HeaderBreadcrumbs';
import {
  ShopTagFiltered,
  ShopProductSort,
  ShopProductList,
  ShopFilterSidebar,
} from 'src/minimalComponents/_dashboard/e-commerce/shop';

import DashboardLayout from 'src/layouts/dashboard';

// import draftToHtml from 'draftjs-to-html';
// import { convertToRaw } from 'draft-js';
import { DevTool } from '@hookform/devtools';
import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import cloudUploadFill from '@iconify/icons-eva/cloud-upload-fill';
// material

import { LoadingButton } from '@mui/lab';
import DatePicker from '@mui/lab/DatePicker';
import { fData } from 'src/utils/formatNumber';
import { fTimestamp } from 'src/utils/formatTime';
// import { QuillEditor, DraftEditor } from 'src/minimalComponents/editor';
import {
  FormSchema,
  defaultValues,
} from 'src/__components-overview/extra/form-validation';

const ReactHookForm = ({ openDevTool }) => {
  // const [openDevTool, setOpenDevTool] = useState(false);

  const handleChange = (event) => {
    setOpenDevTool(event.target.checked);
  };

  const { themeStretch } = useSettings();
  const fileInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

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
      <Box sx={{ mb: 5, display: 'flex', justifyContent: 'flex-end' }}>
        <FormControlLabel
          control={<Switch checked={openDevTool} onChange={handleChange} />}
          label="Open Dev Tool"
        />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
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
        {openDevTool && <DevTool control={control} placement="top-right" />}
      </form>
    </>
  );
};
export default ReactHookForm;
