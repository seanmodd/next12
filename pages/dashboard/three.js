import { useEffect, useState, useRef } from 'react';
// material
import {
  Container,
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
// hooks
import useSettings from 'src/hooks/useSettings';
// components
import Page from 'src/minimalComponents/Page';
import HeaderBreadcrumbs from 'src/minimalComponents/HeaderBreadcrumbs';
import DashboardLayout from 'src/layouts/dashboard';
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

          <Container
            alignItems="center"
            justifyContent="center"
            sx={{ mt: 10 }}
          >
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <Card sx={{ position: 'relative' }}>
                  <Box
                    sx={{ mb: 5, display: 'flex', justifyContent: 'center' }}
                  >
                    <FormControlLabel
                      control={
                        <Switch checked={openDevTool} onChange={handleChange} />
                      }
                      label="Open Dev Tool"
                    />
                  </Box>
                  <CardHeader title="React Hook Form" />

                  <CardContent>
                    <ReactHookForm openDevTool={openDevTool} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
          {/* </Stack> */}
        </Container>
      </Page>
    </DashboardLayout>
  );
};
export default CarValueEstimator;
