import { useState } from 'react';
// material
import {
  Box,
  Step,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  Stepper,
  StepLabel,
  Typography,
} from '@mui/material';
import Stepper1CarfaxForm from 'src/priceEstimator/StepperForms/Stepper1CarfaxForm';

// ----------------------------------------------------------------------
export default function HorizontalLinearStepper() {
  const steps = [
    'Select campaign settings',
    'Create an ad group',
    'Create an ad',
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  // const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isNextDisabled = () => {
    if (activeStep === 0) {
      return false;
    }
    if (activeStep === 1) {
      return false;
    }
    if (activeStep === 2) {
      return false;
    }
    return true;
  };

  const activeStepIndex = activeStep;

  function ComponentStep1() {
    return (
      <>
        <Box>
          <Typography sx={{ my: 1 }}> Step {activeStep + 1}</Typography>
          <Container sx={{ mt: 4 }}>
            <Grid justifyContent="center" container spacing={5}>
              <Grid item xs={12} sm={6}>
                <Card>
                  <Container
                    sx={{
                      marginTop: '25px',
                    }}
                  >
                    <Box
                      component="img"
                      src="/static/carfax.jpg"
                      sx={{
                        maxWidth: '40%',
                      }}
                    />
                  </Container>
                  <CardHeader title="Your Vehicle Info" />
                  <Typography sx={{ mt: 1 }} variant="h6">
                    <h5>Step 1</h5>
                  </Typography>
                  <CardContent>
                    <h6>Sample content</h6>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flexGrow: 1 }} />

          <Button variant="contained" onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </>
    );
  }
  function ComponentStep2() {
    return (
      <>
        <Box>
          <Typography sx={{ my: 1 }}> Step {activeStep + 1}</Typography>
          <Container sx={{ mt: 4 }}>
            <Grid justifyContent="center" container spacing={5}>
              <Grid item xs={12} sm={6}>
                <Card>
                  <Container
                    sx={{
                      marginTop: '25px',
                    }}
                  >
                    <Box
                      component="img"
                      src="/static/carfax.jpg"
                      sx={{
                        maxWidth: '40%',
                      }}
                    />
                  </Container>
                  <CardHeader title="Your Vehicle Info" />
                  <Typography sx={{ mt: 1 }} variant="h6">
                    <h5>Step 2</h5>
                  </Typography>
                  <CardContent>
                    <h6>Sample content</h6>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flexGrow: 1 }} />

          <Button variant="contained" onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </>
    );
  }

  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === 0 && <ComponentStep1 />}
      {activeStep === 1 && <ComponentStep2 />}
      {activeStep === 2 && (
        <>
          <Paper sx={{ p: 3, my: 3, minHeight: 120, bgcolor: 'grey.50012' }}>
            <Typography sx={{ my: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
          </Paper>

          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              onClick={(e) => {
                console.log('e clicked on view price', e);
                return e.preventDefault();
              }}
            >
              View Price
            </Button>
          </Box>
        </>
      )}
    </>
  );
}
