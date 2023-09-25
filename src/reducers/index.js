const initialState = {
    heroes: [],
    filteredHeroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    selectedFilter: 'all',
    filtersLoadingStatus: 'idle'
    
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETED':
            const newHeroList = state.heroes.filter((item) => item.id !== action.payload);
            const newFilteredHeroList = state.filteredHeroes
            .filter((item) => item.id !== action.payload);
            return {
                ...state,
                heroes: newHeroList,
                filteredHeroes: newFilteredHeroList
            }  
        case 'HERO_CREATED':
            let newHero;
            if (action.payload.element === state.selectedFilter) {
                newHero = action.payload
            }
            const listWithNewHero = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: listWithNewHero,
                filteredHeroes: [...state.filteredHeroes, newHero].filter(item => item)
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }   
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }  
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'FILTER_SELECT':
            return {
                ...state,
                selectedFilter: action.payload
            }       
        case 'FILTERING_HEROES_LIST':
            return {
                ...state,
                filteredHeroes: action.payload
            }     
        default: return state
    }
}

export default reducer;