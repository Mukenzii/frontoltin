import React, { useState, useEffect, createContext, useMemo } from 'react';
import { useRouter } from 'next/router';
import { saveState } from 'utils/storage';
import { get } from 'lodash';
import { isAuthenticated } from 'services/AuthService';
import { UserAuthContextProps } from './index.type';

const UserContext = createContext({} as UserAuthContextProps);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState({});
  const router = useRouter();
  useEffect(() => {
    const checkLoggedIn = async () => {
      let isUser = isAuthenticated();
      if (isUser === null) {
        saveState('user', '');
        isUser = '';
      }
      setCurrentUser(isUser);
    };

    checkLoggedIn();
  }, []);

  const memoizedValue = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
    }),
    [currentUser, setCurrentUser]
  );
  useEffect(() => {
    if (get(memoizedValue, 'currentUser.access.length') < 100) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <UserContext.Provider value={memoizedValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
