import { createContext, useState } from 'react';

export const ContextCarfax = createContext();

export function ContextCarfaxProvider({ children }) {
  const vehicleDropdown = {
    make: '',
    model: '',
    year: '',
  };

  const [chosenVehicle, setChosenVehicle] = useState(vehicleDropdown);
  return (
    <ContextCarfax.Provider value={{ chosenVehicle, setChosenVehicle }}>
      {children}
    </ContextCarfax.Provider>
  );
}
