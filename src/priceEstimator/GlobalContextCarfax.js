import { createContext, useState } from 'react';

export const ContextCarfax = createContext();

export function ContextCarfaxProvider({ children }) {
  const vehicleDropdown = [
    {
      make: 'Acura',
      model: 'CL',
      year: '2003',
    },
    {
      make: 'Acura',
      model: 'CL',
      year: '2002',
    },
    {
      make: 'Acura',
      model: 'CL',
      year: '2001',
    },
  ];
  const [chosenVehicle, setChosenVehicle] = useState(vehicleDropdown);
  return (
    <ContextCarfax.Provider value={{ chosenVehicle, setChosenVehicle }}>
      {children}
    </ContextCarfax.Provider>
  );
}
