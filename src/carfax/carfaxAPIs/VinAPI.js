import axios from 'axios';

const requestBody = (type, value) => {
  switch (type) {
    case 'vehicleFromVin':
      const vinData = {
        query: `query{
          vin: "${value}"
        }`,
      };
      return vinData;

    default:
      break;
  }
};

// API base url
const BASE_URL = 'https://consumerapi.carfax.com/smc/smb/initial-vehicle-info';

// API call to fetch vin data
// export const fetchVehicleFromVin = (vin) =>
//   axios.post(BASE_URL, requestBody('vehicleFromVin', vin));

export const fetchVehicleFromVin = (vin) =>
  axios.post(BASE_URL, { vin, vehicleZip: '95117' });

export const fetchVehicleFromVinTEST = () =>
  console.log('THIS AXIOS POST IS RUNNING NOW no vin param');
axios.post(BASE_URL, { vin: '1C4RJFAG8MC634695', vehicleZip: '95117' });

fetch('https://consumerapi.carfax.com/smc/smb/initial-vehicle-info', {
  headers: {
    accept: 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9,la;q=0.8',
    'content-type': 'application/json',
    'sec-ch-ua':
      '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
  },
  referrer: 'https://static.carfax.com/',
  referrerPolicy: 'strict-origin-when-cross-origin',
  body: '{"vin":"2C4RC1FG5MR558981","vehicleZip":"95117"}',
  method: 'POST',
  mode: 'cors',
  credentials: 'omit',
});
