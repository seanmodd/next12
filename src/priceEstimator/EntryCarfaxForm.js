import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState, useContext, useEffect } from 'react';
import {
  Container,
  Button,
  Typography,
  CardHeader,
  CardContent,
  Card,
  Grid,
  Box,
  Select,
  MenuItem,
} from '@mui/material';
import { fetchMakes, fetchModels, fetchYears } from 'src/utils/Api';
import { ContextCarfax } from 'src/priceEstimator/GlobalContextCarfax';
import styles from '../../styles/Home.module.css';

function CarfaxForm() {
  const { chosenVehicle, setChosenVehicle } = useContext(ContextCarfax);

  const router = useRouter();
  // state for make
  const [makeValue, setMakeValue] = useState('');
  const [makesData, setMakesData] = useState([
    { make: 'one' },
    { make: 'two' },
  ]);

  // state for model
  const [modelValue, setmodelValue] = useState('');
  const [modelsData, setmodelsData] = useState([]);

  // state for year
  const [yearValue, setyearValue] = useState('');
  const [yearsData, setyearsData] = useState([]);

  // updating field selction
  const selectMake = (e) => {
    setMakeValue(e.target.value);
    setmodelValue('');
    setyearValue('');
    setChosenVehicle({ ...chosenVehicle, make: e.target.value });
    fetchModelsData(e.target.value);
  };

  const selectModel = (e) => {
    setmodelValue(e.target.value);
    setChosenVehicle({ ...chosenVehicle, model: e.target.value });
    fetchYearsData(e.target.value);
  };

  const selectYear = (e) => {
    setyearValue(e.target.value);
    setChosenVehicle({ ...chosenVehicle, year: e.target.value });
  };

  const fetchMakesData = () => {
    fetchMakes()
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setMakesData(response.data.data.getMakes);
        }
      })
      .catch((err) => {
        alert(err?.toString());
      });
  };

  const fetchModelsData = (make) => {
    fetchModels(make)
      .then((res) => {
        setmodelsData(res.data.data.getMakeModels);
      })
      .catch((err) => {
        alert(err?.toString());
      });
  };

  const fetchYearsData = (model) => {
    fetchYears(makeValue, model)
      .then((res) => {
        setyearsData(res.data.data.getYMMs);
      })
      .catch((err) => {
        alert(err?.toString());
      });
  };

  useEffect(() => {
    fetchMakesData();
  }, []);

  function handleSubmitClick(e) {
    e.preventDefault();
    router.push('/dashboard/carfax-value/vehicle-info/');
  }

  return (
    <div>
      <Container alignItems="center" justifyContent="center" sx={{ mt: 4 }}>
        <Grid alignItems="center" justifyContent="center" container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Card>
              <Container
                // display="flex"
                align="center"
                justify="center"
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
              <CardHeader title="Get Your CARFAX Trade-In Value" />
              <Typography sx={{ mt: 1, mb: 5 }} variant="h6">
                <h5>Enter your vehicle's information to get started!</h5>
              </Typography>
              {/* <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Typography variant="body">
                  {chosenVehicle.make && (
                    <p>
                      <b>Make:</b> {chosenVehicle.make}
                    </p>
                  )}
                </Typography>
                <Typography variant="body">
                  {chosenVehicle.model && ( 
                    <p>
                      <b>Model:</b> {chosenVehicle.model}
                    </p>
                  )}
                </Typography>
                <Typography variant="body">
                  {chosenVehicle.year && (
                    <p>
                      <b>Year:</b> {chosenVehicle.year}
                    </p>
                  )}
                </Typography>
              </Box> */}
              <CardContent className={styles.form}>
                <span>Select Maker</span>
                <Select
                  id="demo-simple-select"
                  value={makeValue}
                  onChange={selectMake}
                >
                  {makesData?.map((item, i) => (
                    <MenuItem key={i?.toString()} value={item.make}>
                      {item.make}
                    </MenuItem>
                  ))}
                </Select>
                {/* model select */}
                <span>Select Model</span>
                <Select
                  disabled={makeValue === ''}
                  id="demo-simple-select"
                  value={modelValue}
                  onChange={selectModel}
                >
                  {modelsData?.map((item, i) => (
                    <MenuItem key={i?.toString()} value={item.model}>
                      {item.model}
                    </MenuItem>
                  ))}
                </Select>
                {/* year select */}
                <span>Select Year</span>
                <Select
                  id="demo-simple-select"
                  disabled={modelValue === ''}
                  className={styles.demoSimpleSelect}
                  value={yearValue}
                  onChange={selectYear}
                >
                  {yearsData?.map((item, i) => (
                    <MenuItem key={i?.toString()} value={item.year}>
                      {item.year}
                    </MenuItem>
                  ))}
                </Select>

                <Button
                  fullWidth
                  size="large"
                  type="button"
                  disabled={!makeValue || !modelValue || !yearValue}
                  variant="contained"
                  onClick={handleSubmitClick}
                  sx={{
                    whiteSpace: 'nowrap',
                    marginTop: '20px',
                    marginBottom: '20px',
                  }}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default CarfaxForm;
