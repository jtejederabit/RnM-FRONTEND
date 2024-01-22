import {ReactNode} from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../../src/pages/Login';
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../../src/store/loginSlice';
import userReducer from '../../src/store/userSlice';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: () => jest.fn()
}));

jest.mock('../../src/utils/hooks/useAxios', () => ({
    __esModule: true,
    default: () => ({
        request: jest.fn().mockResolvedValue({
            user: { id: 1, name: 'Test User' },
            accessToken: 'fakeToken'
        })
    })
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn()
}));

const renderWithProviders = (component: ReactNode) => {
    const store = configureStore({
        reducer: {
            login: loginReducer,
            user: userReducer,
        },
    });

    return render(
        <Provider store={store}>
            <BrowserRouter>
                {component}
            </BrowserRouter>
        </Provider>
    );
};

describe('Login page', () => {
    test('Should let a user to login', async () => {
        renderWithProviders(<LoginPage />);
        expect(screen.getByAltText('rnmLogo')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Or Register')).toBeInTheDocument()
        ;
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(screen.getByAltText('portalLogo')).toBeInTheDocument();
        });
    });

    test('Should let a user to register', async () => {
        renderWithProviders(<LoginPage />);
        fireEvent.click(screen.getByText('Or Register'));
        expect(screen.getByAltText('rnmLogo')).toBeInTheDocument();

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'testuser@mail.com' } });
        fireEvent.click(screen.getByText('Register'));

        await waitFor(() => {
            expect(screen.getByAltText('portalLogo')).toBeInTheDocument();
        });

    });
});
