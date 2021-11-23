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
import ReactHookForm from 'src/__components-overview/extra/form-validation/ReactHookForm';

const CarValueEstimator = () => {
  const { themeStretch } = useSettings();
  const [openDevTool, setOpenDevTool] = useState(false);

  const handleChange = (event) => {
    setOpenDevTool(event.target.checked);
  };

  return (
    <DashboardLayout>
      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ mb: 0, mt: 0, px: 15 }}
      />

      <Page title="CarX Trade-In | CarX">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Pre-Owned Price Estimator"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Trade-In Value' },
            ]}
          />

          <Stack
            direction="row"
            flexWrap="wrap"
            alignItems="center"
            // justifyContent="flex"
            justifyContent="center"
            sx={{ mb: 5, mt: 15 }}
          >
            <ReactHookForm openDevTool={openDevTool} />
          </Stack>
        </Container>
      </Page>
    </DashboardLayout>
  );
};
export default CarValueEstimator;
