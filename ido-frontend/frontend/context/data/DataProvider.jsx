import React, { useState } from "react";
import DataContext from "./DataContext";

const DataProvider = ({ children }) => {
  const [rate, setRate] = useState(0);
  const [usdt, setUSDT] = useState(0);
  const [upliner, setUpliner] = useState('')

  const setCurrentRate = (rate) => {
    setRate(rate);
  };
  const setUSDTAmount = (rate) => {
    setUSDT(rate);
  }

  const setUpline = (upliner) => {
    setUpliner(upliner)
  }

  const valueDataProvider = {
    setCurrentRate,
    setUSDTAmount,
    setUpliner,
    upliner,
    rate,
    usdt,
  };

  return (
    <DataContext.Provider value={valueDataProvider}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
