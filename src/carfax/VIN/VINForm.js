import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState, useContext, useEffect } from 'react';
import {
  Container,
  Button,
  TextField,
  Typography,
  CardHeader,
  CardContent,
  Card,
  Grid,
  Box,
  Select,
  MenuItem,
} from '@mui/material';
import {
  fetchVehicleFromVin,
  fetchVehicleFromVinTEST,
} from 'src/carfax/carfaxAPIs/VinAPI';
import { ContextCarfax } from 'src/carfax/GlobalContextCarfax';
import styles from '../../../styles/Home.module.css';

function CarfaxForm() {
  const { chosenVehicle, setChosenVehicle } = useContext(ContextCarfax);

  const router = useRouter();

  // state for model
  const [vinValue, setVinValue] = useState('');
  const [vinData, setVinData] = useState([]);

  // updating field selction

  const handleVin = (e) => {
    setVinValue(e.target.value);
    setChosenVehicle({ ...chosenVehicle, vin: e.target.value });
    fetchVehicleFromVinDataTEST(e.target.value);
    // fetchVehicleFromVinData(e.target.value);
    console.log('This is e.target.value : ', e.target.value);
    console.log('This is vinValue : ', vinValue);
    console.log('This is vinData : ', vinData);
    console.log('This is chosenVehicle : ', chosenVehicle);
  };

  const fetchVehicleFromVinDataTEST = () => {
    fetchVehicleFromVinTEST()
      .then((res) => {
        console.log('This is res : ', res);
        setVinData(res);
      })
      .catch((err) => {
        console.log('This is err : ', err);
      });
  };

  const fetchVehicleFromVinData = (vin) => {
    console.log('This is the vin param from fetchVehicleFromVinData : ', vin);
    fetchVehicleFromVin(vin)
      .then((res) => {
        // setVinData(res.data.data.getMakeModels);
        setVinData(res.data.data.getMakeModels);
      })
      .catch((err) => {
        alert(err?.toString());
      });
  };

  useEffect(() => {
    // fetchMakesData();
    // fetchVehicleFromVinData(vin);
  }, []);

  function handleSubmitClick(e) {
    e.preventDefault();
    router.push('/dashboard/carfax-value/vin/');
  }

  return (
    <>
      <Typography sx={{ mt: '15px' }} variant="h6">
        Enter your vehicle's information to get started!
      </Typography>

      <CardContent className={styles.form}>
        <span>Enter VIN</span>
        <TextField
          value={vinValue}
          sx={{ maxWidth: '400px' }}
          onChange={handleVin}
        >
          {vinData}
          {vinValue}
          {vinData?.map((car, i) => (
            <MenuItem key={i?.toString()} value={car.model}>
              {car.model}
            </MenuItem>
          ))}
        </TextField>

        <Button
          fullWidth
          size="large"
          type="button"
          disabled={!vinValue}
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
    </>
  );
}

export default CarfaxForm;
