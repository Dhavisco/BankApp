import React, { createContext, useState } from 'react';
import useLogin from '../hooks/useLogin';
import { useSignup } from '../hooks/useSignup';


type User = {
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  address: string;
  phone_number: string;
  avatar: string;
}

type AuthContextType = {
  user: User | null; // Store the user as an object to handle more user info
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signup: (userData: {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    email: string;
    password: string;
    address: string;
    phone_number: string;
  }) => Promise<void>;
  logout: () => void;
};

// Creating context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Defining provider component
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // Store user object

  const loginMutation = useLogin();
  const signupMutation = useSignup();

  const loginHandler = async (credentials: { email: string; password: string }) => {
    try {
      const loginResponse = await loginMutation.mutateAsync(credentials);
      setUser(loginResponse); // Stores the user info recieved from the fetched data
    } catch (error: unknown) {
       let errorMessage = 'An unknown error occurred'; // Default error message

    if (error) {
      const axiosError = error as {
        response?: { data?: { error?: string; message?: string } };
      };

      errorMessage =
        axiosError.response?.data?.error || // Prefer `error` if it exists
        'An unknown error occurred'; // Default
    }
    //testing purpose
    // console.error('Login error:', errorMessage); // Log the extracted error message
    // console.error('Raw error object:', error); // Log the raw error for debugging
    throw new Error(errorMessage); // Optional: propagate the error

    }
  };
  const signupHandler = async (userData: {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    email: string;
    password: string;
    address: string;
    phone_number: string;
  }) => {
    try {
      await signupMutation.mutateAsync(userData); // Call the signup hook
    } catch (error: unknown) {
      const errorMessage = error instanceof Error
        ? error.message
        : (error as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Signup error occurred';
      // console.error('Signup error:', errorMessage);
      // console.error('Error', error)
      throw new Error(errorMessage); // Optional: propagate the error
    }
  };
  const logout = () => {
    setUser(null); // Clear user data on logout
  };

  const contextValue: AuthContextType = {
    user: user,
    login: loginHandler,
    signup: signupHandler,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
