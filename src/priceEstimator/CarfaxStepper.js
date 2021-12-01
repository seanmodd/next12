import { useRouter } from 'next/router';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import { useState, useEffect, useContext } from 'react';
// material
import {
  Box,
  Step,
  Container,
  FormControl,
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
import { ContextCarfax } from 'src/priceEstimator/GlobalContextCarfax';

const defaultComponentStep1Values = {
  exteriorColor: '',
  mileage: '',
  sliderVehicleCondition: 2,
};
const defaultComponentStep2Values = {
  email: '',
  phone: '',
};

export default function HorizontalLinearStepper() {
  const { chosenVehicle, setChosenVehicle } = useContext(ContextCarfax);
  //* Below is navigation of stepper
  const steps = ['Vehicle Found', 'Calculate Price', 'Success!'];
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  //* Above is navigation of stepper
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

  //* Below is ComponentStep1 form related
  const [formComponentStep1Values, setFormComponentStep1Values] = useState(
    defaultComponentStep1Values
  );
  const handleMilesChange = (e) => {
    setFormComponentStep1Values({
      ...formComponentStep1Values,
      mileage: e.target.value,
    });
    setChosenVehicle({
      ...chosenVehicle,
      mileage: e.target.value,
    });
  };
  const handleColorChange = (e) => {
    setFormComponentStep1Values({
      ...formComponentStep1Values,
      exteriorColor: e.target.value,
    });
    setChosenVehicle({
      ...chosenVehicle,
      exteriorColor: e.target.value,
    });
  };
  const handleSliderChange = (name) => (e, value) => {
    setFormComponentStep1Values({
      ...formComponentStep1Values,
      [name]: value,
    });
    setChosenVehicle({
      ...chosenVehicle,
      sliderVehicleCondition: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formComponentStep1Values);
    setFormComponentStep1Values({
      exteriorColor: '',
      mileage: '',
      sliderVehicleCondition: 2,
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const StatusOfSlider = () => {
    if (formComponentStep1Values.sliderVehicleCondition == 3) {
      return (
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" component="h2">
            Vehicle Condition: Excellent
          </Typography>
          <Typography variant="h3">😃</Typography>
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
    if (formComponentStep1Values.sliderVehicleCondition == 2) {
      return (
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" component="h2">
            Vehicle Condition: Good
          </Typography>
          <Typography variant="h3">😊</Typography>
        </Box>
      );
    }
    return (
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" component="h2">
          Vehicle Condition: Fair
          <Typography variant="h3">🙂</Typography>
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
  const form1Validation = () => {
    if (formComponentStep1Values.mileage == '') {
      return true;
    }

    if (formComponentStep1Values.exteriorColor == '') {
      return true;
    }
    return false;
  };

  // & BELOW IS EVERYTHING COMPONENT STEP 2 RELATED

  const [formComponentStep2Values, setFormComponentStep2Values] = useState(
    defaultComponentStep2Values
  );
  const handleEmailChange = (e) => {
    setFormComponentStep2Values({
      ...formComponentStep2Values,
      email: e.target.value,
    });
  };
  const handlePhoneChange = (e) => {
    setFormComponentStep2Values({
      ...formComponentStep2Values,
      phone: e.target.value,
    });
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();
    console.log(formComponentStep1Values);
    setFormComponentStep2Values({
      email: '',
      phone: '',
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const form2Validation = () => {
    if (formComponentStep2Values.email == '') {
      return true;
    }

    if (formComponentStep2Values.phone == '') {
      return true;
    }
    return false;
  };

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
                  <VehicleFoundComponent1 />
                  <FormHeader formtopic="I. CONDITION" />

                  <form onSubmit={handleSubmit}>
                    <CardContent>
                      <Grid item>
                        <div style={{ width: '400px' }}>
                          <StatusOfSlider />
                          <Slider
                            value={
                              formComponentStep1Values.sliderVehicleCondition
                            }
                            onChange={handleSliderChange(
                              'sliderVehicleCondition'
                            )}
                            defaultValue={1}
                            step={1}
                            min={1}
                            max={3}
                            marks={[
                              {
                                value: 1,
                                label: 'Fair',
                              },
                              {
                                value: 2,
                                label: 'Good',
                              },
                              {
                                value: 3,
                                label: 'Excellent',
                              },
                            ]}
                            valueLabelDisplay="off"
                          />
                        </div>
                      </Grid>
                    </CardContent>

                    <FormHeader formtopic="II. TRIM & OPTION" />
                    <CardContent>
                      <Grid item>
                        <TextField
                          id="mileage-input"
                          name="mileage"
                          label="Mileage"
                          type="number"
                          value={formComponentStep1Values.mileage}
                          onChange={handleMilesChange}
                        />
                      </Grid>

                      <Grid item sx={{ my: 3 }}>
                        <FormControl>
                          <Typography variant="body2">
                            Select Vehicle Color
                          </Typography>
                          <Select
                            name="exteriorColor"
                            value={formComponentStep1Values.exteriorColor}
                            onChange={handleColorChange}
                          >
                            {allColors?.map((item) => (
                              <MenuItem key={item} value={item}>
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Button
                        variant="contained"
                        disabled={form1Validation()}
                        color="primary"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </CardContent>
                  </form>
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
                  {/* Below is the vehicle you found. */}
                  <VehicleFoundComponent2 />
                  <FormHeader formtopic="III. LAST STEPS" />

                  <form onSubmit={handleSubmit2}>
                    <CardContent>
                      <Grid item>
                        <TextField
                          id="email-input"
                          name="email"
                          label="email"
                          type="email"
                          value={formComponentStep2Values.email}
                          onChange={handleEmailChange}
                        />
                      </Grid>

                      <Grid item sx={{ my: 3 }}>
                        <FormControl>
                          <Grid item>
                            <TextField
                              id="phone-input"
                              name="phone"
                              label="mobile"
                              type="phone"
                              value={formComponentStep2Values.phone}
                              onChange={handlePhoneChange}
                            />
                          </Grid>
                        </FormControl>
                      </Grid>

                      <Button
                        variant="contained"
                        disabled={form2Validation()}
                        color="primary"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </CardContent>
                  </form>
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
        </Box>
      </>
    );
  }

  function ComponentStep3() {
    return (
      <>
        <Paper sx={{ p: 3, my: 3, minHeight: 120, bgcolor: 'grey.50012' }}>
          <Box display="flex" alignItems="center" flexDirection="column">
            <Typography sx={{ my: 3 }}>
              Ready to find the price of your vehicle?
            </Typography>
            <Box display="flex">
              <Button
                color="primary"
                variant="contained"
                onClick={(e) => {
                  console.log('e clicked on view price', e);
                  return e.preventDefault();
                }}
              >
                View Price
              </Button>
            </Box>
          </Box>
        </Paper>

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

function VehicleFoundComponent2() {
  const { chosenVehicle, setChosenVehicle } = useContext(ContextCarfax);
  const router = useRouter();
  return (
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
        <Box display="flex" alignItems="center" flexDirection="row">
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
                <strong>Make:</strong> {chosenVehicle.make}
              </Typography>
              <Typography>
                <strong>Model:</strong> {chosenVehicle.model}
              </Typography>
              <Typography>
                <strong>Year:</strong> {chosenVehicle.year}
              </Typography>
              <Typography>
                <strong>Mileage:</strong> {chosenVehicle.mileage}
              </Typography>
              <Typography>
                <strong>Color:</strong> {chosenVehicle.exteriorColor}
              </Typography>
              <Typography>
                <strong>Slider:</strong> {chosenVehicle.sliderVehicleCondition}
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
  );
}
function VehicleFoundComponent1() {
  const { chosenVehicle, setChosenVehicle } = useContext(ContextCarfax);
  const router = useRouter();
  return (
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
        <Box display="flex" alignItems="center" flexDirection="row">
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
                <strong>Make:</strong> {chosenVehicle.make}
              </Typography>
              <Typography>
                <strong>Model:</strong> {chosenVehicle.model}
              </Typography>
              <Typography>
                <strong>Year:</strong> {chosenVehicle.year}
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
  );
}
