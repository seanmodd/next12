import { useEffect, useState, useRef } from 'react';
import * as Yup from 'yup';
// material
import {
  Container,
  Typography,
  Stack,
  Box,
  FormControlLabel,
  Switch,
  CardHeader,
  CardContent,
  Card,
  Grid,
} from '@mui/material';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { fData } from 'src/utils/formatNumber';
// hooks
import useSettings from 'src/hooks/useSettings';
// components
import Page from 'src/minimalComponents/Page';
import HeaderBreadcrumbs from 'src/minimalComponents/HeaderBreadcrumbs';
import DashboardLayout from 'src/layouts/dashboard';
import ReactHookForm from 'src/__components-overview/extra/form-validation/ReactHookForm';
import CarfaxForm from 'src/priceEstimator/CarfaxForm';

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
          <CarfaxForm />
        </Container>
      </Page>
    </DashboardLayout>
  );
};
export default CarValueEstimator;
