import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../src/store/userSlice';
import charactersReducer from '../../src/store/charactersSlice';
import CharactersGrid from '../../src/components/shared/CharactersGrid';
import {ReactNode} from "react";
import {characterMock} from "../__mocks__/mockData";

const mockRequest = jest.fn();
jest.mock('../../src/utils/hooks/useAxios', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        request: mockRequest,
    })),
}));


beforeEach(() => {
    mockRequest.mockClear();
    mockRequest.mockResolvedValue({
        results: characterMock,
        info: { pages: 1 }
    });
});

const renderWithProviders = (component: ReactNode) => {
    const store = configureStore({
        reducer: {
            user: userReducer,
            characters: charactersReducer,
        },
        preloadedState: {
            user: {
                user: {
                    _id: 1,
                    username: 'Test User',
                    password: 'test',
                    email: 'testUser@mail.com',
                    favorites: [],
                },
            },
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
    return render(<Provider store={store}>{component}</Provider>);
};

describe('Characters Grid Component', () => {
    it('Should character list', async () => {
        renderWithProviders(<CharactersGrid />);
        await waitFor(() => {
            expect(screen.getByText(characterMock[0].name)).toBeInTheDocument();
            expect(screen.getByText(characterMock[0].species)).toBeInTheDocument();
            expect(screen.getByText(characterMock[0].gender)).toBeInTheDocument();
            expect(screen.getByText(characterMock[0].origin.name)).toBeInTheDocument();
        });
    });
});
