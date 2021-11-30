import { useRouter } from 'next/router';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
// material
import {
  Box,
  Step,
  Container,
  TextField,
  Paper,
  Grid,
  Block,
  Card,
  CardContent,
  Slider,
  CardHeader,
  Button,
  Stepper,
  MenuItem,
  Select,
  StepLabel,
  Typography,
} from '@mui/material';

export default function HorizontalLinearStepper() {
  //* Below is navigation of stepper
  const router = useRouter();
  const steps = ['Vehicle Found', 'Calculate Price', 'Success!'];

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

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
  //* Above is navigation of stepper
  //* Below is miles and colors state
  const [vehicleMiles, setVehicleMiles] = useState('');
  const allColors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indigo',
    'purple',
    'black',
    'white',
  ];
  const [vehicleColor, setVehicleColor] = useState(allColors);
  const selectColor = (e) => {
    e.preventDefault();
    setVehicleColor(e.target.value);
  };
  // const selectMiles = (e) => {
  //   console.log('This is e: ', e);
  //   e.preventDefault();
  //   setVehicleMiles(e.target.value);
  // };
  useEffect(() => {
    (vehicleMiles) => {
      vehicleMiles.preventDefault();
      setVehicleMiles(vehicleMiles);
    };
    console.log('This is vehicleMiles from useEffect: ', vehicleMiles);
  }, [vehicleMiles]);
  //* Above is miles and colors state

  //* Below is all slider related
  const [sliderValue, setSliderValue] = useState(0);
  function valueLabelFormatPrice(value) {
    return value > 65 ? `😃` : value > 35 ? `😊` : `🙂`;
  }
  const StatusOfSlider = () => {
    if (sliderValue > 65) {
      return (
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" component="h2">
            Vehicle Condition: Excellent
          </Typography>
          <Box sx={{ mx: 5 }}>
            <Typography variant="body2" component="h2">
              Helpful tip: Only 3% of used cars are considered to be in
              excellent condition. Excellent condition means your car has no
              cosmetic or mechanical flaws.
            </Typography>
          </Box>
        </Box>
      );
    }
    if (sliderValue > 35) {
      return (
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" component="h2">
            Vehicle Condition: Good
          </Typography>
        </Box>
      );
    }
    return (
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" component="h2">
          Vehicle Condition: Fair
          <Box sx={{ mx: 5, mb: 5 }}>
            <Typography variant="body2" component="h2">
              Helpful tip: The majority of pre-owned vehicles fall under this
              category.
            </Typography>
          </Box>
        </Typography>
      </Box>
    );
  };

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };
  function valuetoColor(sliderValue) {
    return !sliderValue
      ? `#ffc109`
      : sliderValue > 65
      ? `#1c3cca`
      : sliderValue > 35
      ? `#52af77`
      : `#ffc109`;
  }

  const PrettoSlider = styled(Slider)({
    color: valuetoColor(sliderValue),
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      fontSize: 40,
      background: 'unset',
      padding: 0,
      marginBottom: 500,
      width: 20,
      height: 30,
      borderRadius: '50%',
      backgroundColor: valuetoColor(sliderValue),
      transformOrigin: 'bottom left',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {},
      '& > *': {},
    },
  });
  //* Above is all slider related

  function ComponentStep1() {
    return (
      <>
        <Box>
          <Typography sx={{ my: 1 }}> Step {activeStep + 1}</Typography>
          <Container sx={{ mt: 4 }}>
            <Grid justifyContent="center" container spacing={5}>
              <Grid item xs={12} sm={6}>
                <Card>
                  {/* Below is the vehicle you found. */}
                  <>
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
                    <CardHeader title="We found your car!" />
                    <Typography sx={{ mt: 1 }} variant="h6">
                      <h5>Confirm details below to continue</h5>
                    </Typography>
                    <Paper
                      sx={{
                        borderRadius: '0px',
                        my: 3,
                        bgcolor: 'grey.50012',
                      }}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        flexDirection="row"
                      >
                        <Box sx={{ p: 3.5, backgroundColor: 'grey.300' }}>
                          <Box
                            component="img"
                            src="/static/car_logo.svg"
                            sx={{
                              maxWidth: '50px',
                            }}
                          />
                        </Box>
                        <Box display="flex" alignItems="center">
                          <Box
                            display="flex"
                            alignItems="flex-start"
                            flexDirection="column"
                            sx={{ my: 0, ml: 2, mr: 10 }}
                          >
                            <Typography>
                              <strong>Make:</strong> Toyota
                            </Typography>
                            <Typography>
                              <strong>Model:</strong> Camry
                            </Typography>
                            <Typography>
                              <strong>Year:</strong> 2019
                            </Typography>
                          </Box>
                          <Button
                            variant="contained"
                            color="warning"
                            size="small"
                            startIcon={<ThreeSixtyIcon />}
                            onClick={() => {
                              router.push('/dashboard/carfax-value');
                            }}
                          >
                            Reset
                          </Button>
                        </Box>
                      </Box>
                    </Paper>
                  </>
                  <FormHeader formtopic="I. CONDITION" />
                  <Typography sx={{ mt: 1 }} variant="h6">
                    <StatusOfSlider />
                  </Typography>

                  <CardContent>
                    <Grid item xs={12} md={4}>
                      <PrettoSlider
                        defaultValue={50}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                        valueLabelFormat={valueLabelFormatPrice}
                        value={sliderValue}
                        step={1}
                      />
                    </Grid>
                  </CardContent>
                  <FormHeader formtopic="II. TRIM & OPTION" />
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        mx: 16, // transform: 'scale(0.8)',
                      }}
                    >
                      <span>Enter Mileage</span>
                      <TextField
                        id="outlined-number"
                        label="Mileage"
                        type="number"
                        value={vehicleMiles}
                        onChange={(e) => {
                          e.preventDefault();
                          setVehicleMiles(e.target.value);
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <span>Select Color</span>
                      <Select value={vehicleColor} onChange={selectColor}>
                        {allColors?.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
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
                  <CardHeader title="Calculate Price" />
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

  function ComponentStep3() {
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
    </>;
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
      {activeStep === 2 && <ComponentStep3 />}
    </>
  );
}

const FormHeader = ({ formtopic }) => (
  <>
    <Paper
      minWidth="100%"
      sx={{
        borderRadius: '0px',
        bgcolor: 'grey.50012',
      }}
    >
      <Box
        display="flex"
        minWidth="100%"
        alignItems="center"
        flexDirection="row"
      >
        <Box sx={{ p: 1.25, backgroundColor: 'grey.300' }}>
          <Typography>
            <strong>{formtopic}</strong>
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            sx={{ my: 0, ml: 2, mr: 10 }}
          />
        </Box>
      </Box>
    </Paper>
  </>
);
