import React, { useState, useEffect } from 'react';
import {
  Container,
  Button,
  Typography,
  CardHeader,
  CardContent,
  Card,
  Grid,
  Box,
} from '@mui/material';
import styles from '../../../styles/Home.module.css';

function CarfaxForm() {
  return (
    <div>
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
              <CardContent className={styles.form}>
                <span>Vehicle Condition</span>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default CarfaxForm;
