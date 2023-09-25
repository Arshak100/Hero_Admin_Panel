import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import classNames from "classnames";

import { filtersFetching, filtersFetched, filtersFetchingError, filterSelect, filteringHeroesList } from "../../actions";
import Spinner from "../spinner/Spinner";
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {heroes, filters, selectedFilter, filtersLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(filters => dispatch(filtersFetched(filters)))
            .catch(() => dispatch(filtersFetchingError));
     
        // eslint-disable-next-line    
    }, [request]);

    const selectFilter = (e) => {
        filters.forEach((filter) => {
            if (filter.name === e.target.id) {
                dispatch(filterSelect(filter.name));
                const newHeroesList = heroes.filter((hero) => {
                    return hero.element === filter.name;
                });
                dispatch(filteringHeroesList(newHeroesList));
            }
        });
    }

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
                    onClick={selectFilter} 
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