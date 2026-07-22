import { useContext } from 'react';
import { AuthContext } from '../contest/AuthContext/AuthContext';

const useAuth = () => {
    const authInfo = useContext(AuthContext);
    return authInfo;
};

export default useAuth;