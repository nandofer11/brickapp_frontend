import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signed, setSigned] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const loadStorageData = async () => {
      const storagedUser = await AsyncStorage.getItem('@user');
      const storagedToken = await AsyncStorage.getItem('@token');
      const storagedUserType = await AsyncStorage.getItem('@userType');

      if (storagedUser && storagedToken && storagedUserType) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        setUser(JSON.parse(storagedUser));
        setUserType(storagedUserType);
        setSigned(true);
      }
    };

    loadStorageData();
  }, []);

  const signIn = async (data, type) => {
    console.log("User data: ", data.user); // Imprimir el objeto usuario para verificar su contenido
    setUser(data.user);
    setUserType(type);
    setSigned(true);
    await AsyncStorage.setItem('@user', JSON.stringify(data.user));
    await AsyncStorage.setItem('@token', data.token);
    await AsyncStorage.setItem('@userType', type);
    api.defaults.headers.Authorization = `Bearer ${data.token}`;
  };

  const signOut = async () => {
    await AsyncStorage.clear();
    setUser(null);
    setUserType(null);
    setSigned(false);
    api.defaults.headers.Authorization = null;
  };

  return (
    <AuthContext.Provider value={{ user, signed, userType, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
