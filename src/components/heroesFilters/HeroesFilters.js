import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import classNames from "classnames";
import store from '../../store';

import { filterSelect, fetchFilters, selectAll } from "./filtersSlice";
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
    const {selectedFilter, filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line    
    }, []);

    if (filtersLoadingStatus === 'loading') {
        return <Spinner/>;
    } else if (filtersLoadingStatus === 'error') {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтров пока нет</h5>
        }

        return arr.map(({className, label, name}) => {

            const btnClass = classNames('btn', className, {active: name === selectedFilter});

            return (
                <button 
                    onClick={() => dispatch(filterSelect(name))} 
                    key={uuidv4()} 
                    id={name} 
                    className={btnClass}>{label}</button>
                )
        });
        
    } 


    const buttons = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;