import React, {useState, useEffect} from "react";
import {IFilters} from "../../utils/types.ts";
import Select from "./Select.tsx";
import useAxios from "../../utils/hooks/useAxios.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../store/store.ts";
import {IFilterList, setCurrentPage, setFilters} from "../../store/charactersSlice.ts";
import {setError} from "../../store/errorSlice.ts";
import './Filters.css';
import {AxiosError} from "axios";

const Filters: React.FC = () => {
    const dispatch = useDispatch();
    const filters: IFilterList = useSelector((state: RootState) => state.characters.filters);

    const location = useLocation();
    const navigate = useNavigate();

    const { request } = useAxios();
    const [filtersApi, setFiltersApi] = useState<IFilters[]>([]);

    const resetFilters = () => {
        dispatch(setFilters({
            status: '',
            specie: '',
            type: '',
            name: '',
            page: 1,
        }))
        const searchParams = new URLSearchParams(location.search);
        searchParams.delete('status');
        searchParams.delete('specie');
        searchParams.delete('type');
        searchParams.delete('name');
        searchParams.set('page', '1')
        dispatch(setCurrentPage(1));
        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFilter('name', e.target.value);
    };

    const updateFilter = (filterKey: string , value: string) => {
        dispatch(setFilters({
            ...filters,
            [filterKey]: value,
        }));

        const searchParams = new URLSearchParams(location.search);
        if (value === '') {
            searchParams.delete(filterKey);
        } else {
            searchParams.set(filterKey, value);
        }
        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    useEffect(() => {
        const getFilters = async () => {
            try {
                const response = await request('/filters', {
                    method: 'GET',
                });
                setFiltersApi(response);
                dispatch(setError(null));
            } catch (err: unknown) {
                dispatch(setError(err as AxiosError));
            }
        };

        getFilters();
    }, []);

    return (
        <div
            className="filtersContainer"
        >
            <div
                className="searchContainer"
            >
                <label
                    htmlFor="search"
                    className="searchLabel"
                >
                    Search
                </label>
                <input
                    name="search"
                    className="searchInput"
                    value={filters.name}
                    onChange={handleSearch}
                    placeholder={'Start typing...'}
                />
            </div>
            {
                filtersApi && filtersApi.map((filter: IFilters, index: number) => {
                    return (
                        <Select
                            key={`${filter.type}-${index}`}
                            options={filter.content}
                            value={filters[filter.type as string as keyof IFilterList] as string}
                            setOption={(value: string) => updateFilter(filter.type as keyof IFilters, value)}
                            param={filter.type}
                        />
                    )
                })
            }
            <button
                className="resetButton"
                onClick={resetFilters}
            >
                Reset filters
            </button>
        </div>
    )
}

export default Filters;