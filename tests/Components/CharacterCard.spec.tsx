import {ReactNode} from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../src/store/userSlice';
import CharacterCard from '../../src/components/shared/CharacterCard';
import {ICharacter} from "../../src/utils/types";

const mockRequest = jest.fn();
jest.mock('../../src/utils/hooks/useAxios', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        request: mockRequest,
    })),
}));

const characterMock: ICharacter = {
    id: 1,
    name: 'Test Character',
    status: 'Alive',
    species: 'Human',
    gender: 'Female',
    origin: {
        name: 'Earth',
        url: 'https://rickandmortyapi.com/api/location/1',
    },
    image: 'test-image.jpg',
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z',
    type: 'Human',
    location: {
        name: 'Earth',
        url: 'https://rickandmortyapi.com/api/location/1',
    },
    episode: [
        'https://rickandmortyapi.com/api/episode/1',
    ]
};

const renderWithProviders = (component: ReactNode) => {
    const store = configureStore({
        reducer: {
            user: userReducer,
        },
        preloadedState: {
            user: {
                user: {
                    _id: 1,
                    username: 'Test User',
                    password: 'test',
                    email: 'testUser@mail.com',
                    favorites: []
                }
            },
        }
    });
    return render(
        <Provider store={store}>
            {component}
        </Provider>
    );
};

describe('Characters Card Component', () => {
    it('Should render character card', () => {
        renderWithProviders(<CharacterCard {...characterMock} />);
        expect(screen.getByText(characterMock.name)).toBeInTheDocument();
        expect(screen.getByText(characterMock.species)).toBeInTheDocument();
        expect(screen.getByText(characterMock.gender)).toBeInTheDocument();
        expect(screen.getByText(characterMock.origin.name)).toBeInTheDocument();
    });

    it('Should toggles favorite status when clicked', async () => {
        renderWithProviders(<CharacterCard {...characterMock} />);
        expect(screen.getByTestId('removed-favorite-1')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('manage-favorite-1'));

        await waitFor(() => {
            expect(mockRequest).toHaveBeenCalledWith('/manage-favorites', expect.anything());
            expect(screen.getByTestId('added-favorite-1')).toBeInTheDocument();
        });
    });
});
