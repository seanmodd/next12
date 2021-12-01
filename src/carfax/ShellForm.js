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
  Tab,
  Tabs,
  Stack,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  fetchMakes,
  fetchModels,
  fetchYears,
} from 'src/carfax/carfaxAPIs/MakeAPI';
import { ContextCarfax } from 'src/carfax/GlobalContextCarfax';
import styles from '../../styles/Home.module.css';
import MakeForm from './Make/MakeForm';
import { Block } from './Block';

function CarfaxForm() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': { mx: '8px !important' },
  };

  const SIMPLE_TAB = [
    { value: '1', label: 'Make & Model', disabled: false, form: <MakeForm /> },
    {
      value: '2',
      label: 'Vehicle VIN',
      disabled: false,
      form: <h1>No form</h1>,
    },
    {
      value: '3',
      label: 'License Plate',
      disabled: true,
      form: <h1>No form</h1>,
    },
  ];
  return (
    <>
      <Container alignItems="center" justifyContent="center" sx={{ mt: 4 }}>
        <Grid alignItems="center" justifyContent="center" container spacing={5}>
          <Grid item>
            <Card>
              <Block title="3 Fast Estimates on Your Car!" sx={style}>
                <TabContext value={value}>
                  <TabList onChange={handleChange}>
                    {SIMPLE_TAB.map((tab, index) => (
                      <Tab
                        key={tab.value}
                        label={tab.label}
                        value={String(index + 1)}
                      />
                    ))}
                  </TabList>
                  <Box
                    sx={{
                      p: 2,
                      mt: 2,

                      width: '100%',
                      borderRadius: 1,
                      bgcolor: 'grey.50012',
                    }}
                  >
                    {SIMPLE_TAB.map((panel, index) => (
                      <TabPanel key={panel.value} value={String(index + 1)}>
                        <Box
                          component="img"
                          src="/static/carfax.jpg"
                          sx={{
                            maxWidth: '200px',
                          }}
                        />
                        <CardHeader title="Get Your CARFAX Trade-In Value" />
                        <Button>Here</Button>
                        {panel.form}
                      </TabPanel>
                    ))}
                  </Box>
                </TabContext>

                {/* <MakeForm /> */}
                {/* </Container> */}
              </Block>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default CarfaxForm;
