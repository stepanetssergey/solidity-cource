import { createContext } from 'react';

const DataContext = createContext({
  setCurrentRate: () => {},
  setUSDTAmount: () => {},
  setUpliner: () => {},
})

export default DataContext;
