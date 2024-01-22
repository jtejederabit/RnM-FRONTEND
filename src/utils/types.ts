export interface ICharacter {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export interface IUser {
    _id: number;
    username: string;
    password: string;
    email: string;
    favorites: number[];
}
export interface IFilters {
    type: string;
    content: {
        value: string;
        label: string;
    }[];
}