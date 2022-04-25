import React, { createContext, useContext, useMemo, useState } from 'react';

const SideDrawerContext = createContext();

const SideDrawerProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const value = useMemo(() => ({ open, toggle: () => setOpen((prev) => !prev) }), [open]);
  return <SideDrawerContext.Provider value={value}>{children}</SideDrawerContext.Provider>;
};

export const useSideDrawerContext = () => useContext(SideDrawerContext);

export default SideDrawerProvider;
