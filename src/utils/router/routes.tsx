import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from '../middlewares/PrivateRoutes';
import MainPage from '../../pages/MainPage';
import LoginPage from '../../pages/Login';
import React from "react";

const routes = [
    {
        path: '/',
        component: MainPage,
        protected: true,
    },
    {
        path: '/login',
        component: LoginPage,
        protected: false,
    },
];
const RoutesProvider: React.FC = () => {
    return (
        <Routes>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        route.protected ?
                            <PrivateRoutes element={<route.component />} /> :
                            <route.component />
                    }
                />
            ))}
        </Routes>
    );
};

export default RoutesProvider;
