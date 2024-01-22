import {ReactNode} from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import charactersReducer, {setCurrentPage} from '../../src/store/charactersSlice';
import PaginationController from '../../src/components/shared/PaginationController';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

const store = configureStore({
    reducer: {
        characters: charactersReducer,
    },
    preloadedState: {
        characters: {
            characters: [],
            filters: {
                status: '',
                specie: '',
                type: '',
                name: '',
                page: 1,
            },
            count: 5,
            currentPage: 1,
        },
    },
});

const renderWithProviders = (component: ReactNode) => {
    return render(
        <Provider store={store}>
            <MemoryRouter>
                {component}
            </MemoryRouter>
        </Provider>
    );
};

describe('Pagination Controller Component', () => {
    it('Should render current page and total count', () => {
        renderWithProviders(<PaginationController />);
        expect(screen.getByText('1 of 5')).toBeInTheDocument();
    });

    it('Should navigates to next page on Next button click', () => {
        renderWithProviders(<PaginationController />);
        fireEvent.click(screen.getByText('Next'));
        expect(screen.getByText('2 of 5')).toBeInTheDocument();
    });

    it('Should navigates to previous page on Previous button click when not on first page', () => {
        store.dispatch(setCurrentPage(2));
        renderWithProviders(<PaginationController />);
        fireEvent.click(screen.getByText('Previous'));
        expect(screen.getByText('1 of 5')).toBeInTheDocument();
    });

    it('Should navigates to first page on First button click', () => {
        store.dispatch(setCurrentPage(3));
        renderWithProviders(<PaginationController />);
        fireEvent.click(screen.getByText('<<'));
        expect(screen.getByText('1 of 5')).toBeInTheDocument();
    });

    it('Should navigates to last page on Last button click', () => {
        renderWithProviders(<PaginationController />);
        fireEvent.click(screen.getByText('>>'));
        expect(screen.getByText('5 of 5')).toBeInTheDocument();
    });
});
