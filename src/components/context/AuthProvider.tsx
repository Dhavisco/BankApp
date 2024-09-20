// import React, { createContext, useState } from 'react';
// import useLogin from '../hooks/useLogin';
// import { useSignup } from '../hooks/useSignup';

// type AuthContextType = {
//     user: string | null;
//     login: (credentials: { email: string; password: string }, ) => Promise<void>;
//     signup: (userData: {
//         first_name: string;
//         last_name: string;
//         date_of_birth: string;
//         email: string;
//         password: string;
//         address: string;
//         phone_number: string;
//     }) => Promise<void>;
//     logout: () =>  void;
// }

// //creating context
// const AuthContext = createContext<AuthContextType | undefined>(undefined);



// //defining provider component
// const AuthProvider: React.FC<{children: React.ReactNode}> = (props) => {
//     const [user, setUser] = useState<string | null>(null)
    
//     const login = useLogin();
//     const { mutateAsync: signup } = useSignup();


//     const loginHandler = async (credentials: { email: string; password: string }) => {
//       try {
//         await login(credentials);
//         setUser(credentials.email);
//         console.log('User logged in:', credentials.email);
//         console.log('User logged in:', credentials);
//       } catch (error) {
//         console.error('Login error', error);
//       }
//     };
//     const signupHandler = async (userData: {
//         first_name: string;
//         last_name: string;
//         date_of_birth: string;
//         email: string;
//         password: string;
//         address: string;
//         phone_number: string;
//     }) => {
//         try {
//             await signup(userData); // Call the signup hook
//             setUser(userData.email);
//             console.log('User Successfully signed up', userData.email);
//         } catch (error) {
//             console.error('Signup error', error);
//         }
//     };


//     const logout = () => {
//         setUser(null);
//         console.log('User logged out successfully');
//     };


//     const contextValue : AuthContextType = {
//         user: user,
//         login: loginHandler,
//         signup:signupHandler,
//         logout: logout
//     }

//     return (
//         <AuthContext.Provider 
//         value={contextValue}>
//             {props.children}
//         </AuthContext.Provider>
//     );
// };


// export {AuthContext,  AuthProvider}

import React, { createContext, useState } from 'react';
import useLogin from '../hooks/useLogin';
import { useSignup } from '../hooks/useSignup';

type AuthContextType = {
  user: { email: string } | null; // Store the user as an object to handle more user info
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
  const [user, setUser] = useState<{ email: string } | null>(null); // Store user object

  const loginMutation = useLogin();
  const signupMutation = useSignup();

  const loginHandler = async (credentials: { email: string; password: string }) => {
    try {
      await loginMutation.mutateAsync(credentials);
      setUser({ email: credentials.email }); // Store user email in the state
      console.log('User logged in:', credentials.email);
    } catch (error: unknown) {
      // Improve error handling and casting
      const errorMessage = error instanceof Error
        ? error.message
        : (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Login error occurred';
      console.error('Login error:', errorMessage);
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
      setUser({ email: userData.email });
      console.log('User successfully signed up:', userData.email);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error
        ? error.message
        : (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Signup error occurred';
      console.error('Signup error:', errorMessage);
      throw new Error(errorMessage); // Optional: propagate the error
    }
  };
  const logout = () => {
    setUser(null); // Clear user data on logout
    console.log('User logged out successfully');
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
