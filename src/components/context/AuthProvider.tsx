import React, { createContext, useState } from 'react';

type AuthContextType = {
    user: string | null;
    login: (email: string, password: string) =>  void;
    signup: (email: string, password: string) => void;
    logout: () =>  void;
}

//creating context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//defining provider component
const AuthProvider: React.FC<{children: React.ReactNode}> = (props) => {
    const [user, setUser] = useState<string | null>(null)

    
    const login = (email:  string, password: string) => {
       
        setUser(email);
        console.log(password)
        console.log('User logged in:', email);
    };

    const signup = (email:  string, password: string) => {
       
        setUser(email);
        console.log(password)
        console.log('User Successfully signed up', email);
    };

    const logout = () => {
        setUser(null);
        console.log('User logged out successfully');
    };


    const contextValue : AuthContextType = {
        user: user,
        login: login,
        signup:signup,
        logout: logout
    }

    return (
        <AuthContext.Provider 
        value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};


export {AuthContext,  AuthProvider}