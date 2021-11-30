import { useEffect, useState, useRef } from 'react';

// material
import { Container, Block, Paper, Stack } from '@mui/material';
import { PATH_DASHBOARD } from 'src/routes/paths';
// hooks
import useSettings from 'src/hooks/useSettings';
// components
import Page from 'src/minimalComponents/Page';
import HeaderBreadcrumbs from 'src/minimalComponents/HeaderBreadcrumbs';
import DashboardLayout from 'src/layouts/dashboard';
import CarfaxForm from 'src/priceEstimator/EntryCarfaxForm';
import CarfaxStepper from 'src/priceEstimator/CarfaxStepper';

const CarValueEstimator = () => {
  const { themeStretch } = useSettings();
  const [openDevTool, setOpenDevTool] = useState(false);

  const handleChange = (event) => {
    setOpenDevTool(event.target.checked);
  };

  return (
    <DashboardLayout>
      <Container direction="row" sx={{ mb: 0, mt: 0, px: 15 }}>
        <Page title="CarX Trade-In | CarX">
          <Container maxWidth={themeStretch ? false : 'lg'}>
            <HeaderBreadcrumbs
              heading="Pre-Owned Price Estimator"
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                {
                  name: 'Carfax Value Estimator',
                  href: '/dashboard/carfax-value/',
                },
                { name: 'Finding Price' },
              ]}
            />

            <Container align="center" justify="center" maxWidth="lg">
              <Stack spacing={5}>
                <Paper
                  sx={{
                    p: 3,
                    width: '100%',
                    boxShadow: (theme) => theme.customShadows.z8,
                  }}
                >
                  <CarfaxStepper />
                </Paper>
              </Stack>
            </Container>
          </Container>
        </Page>
      </Container>
    </DashboardLayout>
  );
};
export default CarValueEstimator;
