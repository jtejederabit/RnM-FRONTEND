import {ICharacter} from "../../src/utils/types";

export const characterMock: ICharacter[] = [
    {
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
            name: 'Pluton',
            url: 'https://rickandmortyapi.com/api/location/1',
        },
        episode: ['https://rickandmortyapi.com/api/episode/1'],
    },
    {
        id: 2,
        name: 'Test Character 2',
        status: 'Alive',
        species: 'Alien',
        gender: 'Male',
        origin: {
            name: 'Jupiter',
            url: 'https://rickandmortyapi.com/api/location/1',
        },
        image: 'test-image2.jpg',
        url: 'https://rickandmortyapi.com/api/character/2',
        created: '2017-11-05T18:48:46.250Z',
        type: 'Human',
        location: {
            name: 'Venus',
            url: 'https://rickandmortyapi.com/api/location/1',
        },
        episode: ['https://rickandmortyapi.com/api/episode/2'],
    }
];