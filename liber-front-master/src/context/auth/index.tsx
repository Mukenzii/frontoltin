import React, { useState, createContext, useMemo } from 'react';

const NewUserDetailsContext = createContext({} as any);

export const NewUserDetailsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [newUserDetails, setNewUserDetails] = useState({});

  const memoizedValue = useMemo(
    () => ({
      newUserDetails,
      setNewUserDetails,
    }),
    [newUserDetails, setNewUserDetails]
  );

  return (
    <NewUserDetailsContext.Provider value={memoizedValue}>
      {children}
    </NewUserDetailsContext.Provider>
  );
};

export default NewUserDetailsContext;
