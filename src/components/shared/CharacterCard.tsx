import React, {useState} from "react";
import {ICharacter} from "../../utils/types.ts";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../store/store.ts";
import {manageFavorites} from "../../store/userSlice.ts";
import useAxios from "../../utils/hooks/useAxios.tsx";
import './CharactersCard.css';

const CharacterCard: React.FC<ICharacter> = (character) => {
    const { request } = useAxios();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const [imageLoaded, setImageLoaded] = useState(false);
    const isFavorite = () => {
        return user?.favorites?.includes(character.id);
    }

    const addFavorite = async () => {
        try{
            await request('/manage-favorites', {
                method: 'POST',
                data: {
                    characterId: character.id,
                },

            })
            dispatch(manageFavorites(character.id));
        } catch (err: unknown) {
            console.error(err);
        }
    }

    enum CharacterStatus {
        Alive = '🙂',
        Dead = '💀',
        unknown = '❓',
    }

    return (
        <div className="characterCard">
            <div className="imageContainer">
                {!imageLoaded && (
                    <div className="imageLoader">
                        <span className="loader"></span>
                    </div>
                )}
                <img
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                    src={character.image}
                    alt={character.name}
                    className="characterImage"
                />
                <div
                    data-testid={`manage-favorite-${character.id}`}
                    className="favoriteIcon"
                    onClick={addFavorite}
                >
                    {
                        isFavorite() ? (
                            <svg
                                data-testid={`added-favorite-${character.id}`}
                                className="icon w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red">
                                <path
                                    d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/>
                            </svg>
                        ) : (
                            <svg
                                data-testid={`removed-favorite-${character.id}`}
                                className="icon w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                 fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                            </svg>
                        )
                    }
                </div>
                <div className="statusIcon">
                    {character.status} {CharacterStatus[character.status as keyof typeof CharacterStatus]}
                </div>
            </div>

            <span style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'left',
                alignItems: 'left',
                width: '100%',
            }}>
                <div className='name'>
                    <span><strong>{character.name}</strong></span>
                </div>
                <div className="details">
                    <span>{character.species}</span>
                    <span>{character.gender}</span>
                </div>
                <div className="location">
                    <span>Last known location:</span>
                    <br/>
                    <span>{character.origin.name}</span>
                </div>
            </span>
        </div>
    );
}

export default CharacterCard;