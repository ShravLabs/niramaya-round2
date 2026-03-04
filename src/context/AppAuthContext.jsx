import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const signIn = (phone, role) => {
    // Mock authentication for demo
    const mockUser = {
      id: Date.now().toString(),
      phone: phone,
      role: role || 'patient'
    };
    setUser(mockUser);
    setProfile({
      name: role === 'asha' ? 'ASHA Worker Demo' : 'Patient Demo',
      role: role || 'patient',
      village: 'Demo Village'
    });
    return { success: true };
  };

  const signOut = () => {
    setUser(null);
    setProfile(null);
  };

  const updateProfile = (updates) => {
    setProfile({ ...profile, ...updates });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      signIn, 
      signOut, 
      updateProfile,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);