import React, { useState, useEffect, createContext, useMemo } from 'react';
import { loadState, saveState } from 'utils/storage';

const initialState = {
  darkMode: false,
  font: 'Roboto',
  fontSize: 16,
  light: 0,
};

const BookViewContext = createContext({} as any);

export const BookViewProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const localOptions = loadState('bookOptions');
  const [settings, setSettings] = useState(localOptions || initialState);
  //   useEffect(() => {
  //     if (localOptions !== settings) saveState('bookOptions', settings);
  //   }, [settings]);

  const memoizedValue = useMemo(
    () => ({
      settings,
      setSettings,
    }),
    [settings, setSettings]
  );

  return (
    <BookViewContext.Provider value={memoizedValue}>
      {children}
    </BookViewContext.Provider>
  );
};

export default BookViewContext;
