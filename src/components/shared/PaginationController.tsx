import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage, setFilters } from "../../store/charactersSlice.ts";
import { RootState } from "../../store/store.ts";
import './PaginationController.css';

const PaginationController: React.FC = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.characters.filters);
    const count = useSelector((state: RootState) => state.characters.count);
    const currentPage = useSelector((state: RootState) => state.characters.currentPage);
    const navigate = useNavigate();

    const updatePage = (newPage: number) => {
        dispatch(setCurrentPage(newPage));
        dispatch(setFilters({ ...filters, page: newPage }));

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('page', `${newPage}`);
        navigate(`${window.location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    const handleNavigation = (action: 'first' | 'last' | 'next' | 'prev') => {
        switch (action) {
            case 'first':
                return updatePage(1);
            case 'last':
                return updatePage(count);
            case 'next':
                return updatePage(currentPage + 1);
            case 'prev':
                return updatePage(currentPage - 1);
            default:
                break;
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const page = searchParams.get('page') || 1;
        dispatch(setCurrentPage(Number(page)));
        searchParams.set('page', `${page}`);
        navigate(`${window.location.pathname}?${searchParams.toString()}`, { replace: true });
    }, []);

    return (
        <div className="paginationContainer">
            <button className="paginationButton" onClick={() => handleNavigation('first')}
                    disabled={currentPage === 1}>{`<<`}</button>
            <button className="paginationButton" onClick={() => handleNavigation('prev')}
                    disabled={currentPage === 1}>Previous
            </button>
            <span className="currentPageInfo">{currentPage} of {count}</span>
            <button className="paginationButton" onClick={() => handleNavigation('next')}
                    disabled={currentPage === count || count === 0}>Next
            </button>
            <button className="paginationButton" onClick={() => handleNavigation('last')}
                    disabled={currentPage === count || count === 0}>{`>>`}</button>
        </div>
    );
}

export default PaginationController;
