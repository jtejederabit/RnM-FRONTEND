import {ReactNode} from 'react';
import { render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from '../../src/store/charactersSlice';
import errorReducer from '../../src/store/errorSlice';
import Filters from '../../src/components/shared/Filters';
import { MemoryRouter } from 'react-router-dom';
import { characterMock } from '../__mocks__/mockData';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
    useLocation: () => ({
        pathname: '/current-path',
        search: '',
    }),
}));

jest.mock('../../src/utils/hooks/useAxios', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        request: jest.fn().mockResolvedValue([
            {
                type: 'status',
                content: [
                    { value: 'Alive', label: 'Alive' },
                    { value: 'Dead', label: 'Dead' }
                ]
            },
            {
                type: 'species',
                content: [
                    { value: 'Human', label: 'Human' },
                    { value: 'Alien', label: 'Alien' }
                ] }
        ]),
    })),
}));

const mockStore = configureStore({
    reducer: {
        characters: charactersReducer,
        error: errorReducer,
    },
    preloadedState: {
        characters: {
            characters: characterMock,
            filters: {
                type: '',
                name: '',
                status: '',
                specie: '',
                page: 1,
            },
            count: 0,
            currentPage: 1,
        },
    },
});

const renderWithProviders = (component: ReactNode) => {
    return render(
        <Provider store={mockStore}>
            <MemoryRouter>
                {component}
            </MemoryRouter>
        </Provider>
    );
};

describe('Filters Component', () => {
    it('Should render search input', () => {
        renderWithProviders(<Filters />);
        expect(screen.getByPlaceholderText('Start typing...')).toBeInTheDocument();
    });

    it('Should update input text on change', () => {
        renderWithProviders(<Filters />);
        fireEvent.change(screen.getByPlaceholderText('Start typing...'), { target: { value: 'Rick' } });
        expect(screen.getByDisplayValue('Rick')).toBeInTheDocument();
    });

    it('Should reset filters', () => {
        renderWithProviders(<Filters />);
        fireEvent.change(screen.getByPlaceholderText('Start typing...'), { target: { value: 'Rick' } });
        fireEvent.click(screen.getByText('Reset filters'));
        expect(screen.getByPlaceholderText('Start typing...').textContent).toBe('');
    });

    it('Should select filter from select', async () => {
        renderWithProviders(<Filters />);
        const select = await screen.findByTestId('select-status') as HTMLSelectElement;
        fireEvent.change(select, { target: { value: 'Alive' } }) ;
        expect(select.value).toBe('Alive');
    });
});
