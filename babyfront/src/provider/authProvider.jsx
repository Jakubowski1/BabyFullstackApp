import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
    auth: null,
    setAuth: () => { },
    user: null,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const isAuth = async () => {
            try {
                const res = await axios.get(
                    'http://localhost:21436/api/Login/login',
                    { withCredentials: true }
                );
                setUser(res.data);  
                setAuth(true);
            } catch (error) {
                setUser(null);
            };
        };

        isAuth();
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;