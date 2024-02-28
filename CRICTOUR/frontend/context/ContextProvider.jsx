import React, { useEffect } from 'react';
import { createContext, useState } from "react";

export const StateContext = createContext();

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     setUser(JSON.parse(localStorage.getItem('user')));
    //     console.log('user: ', user);
    // }, []);

    useEffect(() => {
        // setUser(localStorage.getItem(JSON.stringify('user')));
        // console.log('user: ', user);
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const authInfo = {
        user,
        setUser,
    }

    return (
        <StateContext.Provider value={authInfo}>
            {children}
        </StateContext.Provider>
    );
};

export default ContextProvider;
