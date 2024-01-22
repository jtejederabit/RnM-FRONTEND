import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface PrivateRoutesProps {
    element: ReactElement;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ element }) => {
    const token = useSelector((state: RootState) => state.login.token);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return element;
};

export default PrivateRoutes;
