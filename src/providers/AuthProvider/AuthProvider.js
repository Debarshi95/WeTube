import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { getLocalStorageData, setLocalStorageData } from 'utils/helperFuncs';
import { FETCH_USER_DATA } from 'constants/queries/queries';
import { Loader } from 'components';

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const [loginUser, { loading }] = useLazyQuery(FETCH_USER_DATA);

  useEffect(() => {
    const userToken = getLocalStorageData('token') || '';

    const userLogin = async () => {
      try {
        const res = await loginUser({
          variables: {
            token: userToken,
          },
        });
        if (res?.data?.user) {
          const { token } = res.data.user || '';
          setLocalStorageData('token', token);
          setUser(res.data.user);
        }
      } catch (err) {
        setUser(null);
        setError(err?.message || 'Some error occurred');
      }
    };

    if (!user) {
      userLogin();
    }
  }, [loginUser, user]);

  const value = useMemo(() => ({ user, error, setUser }), [user, error]);

  if (loading) return <Loader />;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
