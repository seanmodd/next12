import { createContext, useState } from 'react';

export const ContextCarfax = createContext();

export function ContextCarfaxProvider({ children }) {
  const vehicleDropdown = {
    make: '',
    model: '',
    year: '',
    mileage: '',
    exteriorColor: '',
    sliderVehicleCondition: 2,
    email: '',
    phone: '',
    zip: '',
    vin: '',
    licensePlate: '',
  };

  const [chosenVehicle, setChosenVehicle] = useState(vehicleDropdown);
  return (
    <ContextCarfax.Provider value={{ chosenVehicle, setChosenVehicle }}>
      {children}
    </ContextCarfax.Provider>
  );
}
