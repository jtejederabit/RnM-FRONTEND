import React, {useEffect} from 'react';
import useAxios from "../utils/hooks/useAxios.tsx";
import {useSelector, useDispatch} from "react-redux";
import {setError} from "../store/errorSlice.ts";
import {setUser} from "../store/userSlice.ts";
import {RootState} from "../store/store.ts";

import PaginationController from "../components/shared/PaginationController";
import ErrorMessage from "../components/common/ErrorMessage";
import Filters from "../components/shared/Filters";
import CharactersGrid from "../components/shared/CharactersGrid";
import {AxiosError} from "axios";


const MainPage: React.FC = () => {
    const error = useSelector((state: RootState) => state.error.error);
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();
    const { request } = useAxios();

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await request('/user-info', {
                    method: 'GET',
                });
                dispatch(setUser(response));
                dispatch(setError(null));
            } catch (err: unknown) {
                dispatch(setError(err as AxiosError));
            }
        };
        
        if (!user) {
            getUserInfo();
        }
    }, [dispatch, request, user]);

    return (
        <div>
            <Filters />
            {
                error ? (
                    <ErrorMessage/>
                ) : (
                    <>
                        <PaginationController/>
                        <CharactersGrid/>
                    </>
                )
            }
        </div>
    );
};

export default MainPage;

