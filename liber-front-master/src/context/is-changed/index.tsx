import React, { useState, createContext, useMemo } from 'react';

const ChangerContext = createContext({} as any);

export const ChangerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isChanged, setIsChanged] = useState(false);

  const memoizedValue = useMemo(
    () => ({
      isChanged,
      setIsChanged,
    }),
    [isChanged, setIsChanged]
  );

  return (
    <ChangerContext.Provider value={memoizedValue}>
      {children}
    </ChangerContext.Provider>
  );
};

export default ChangerContext;
