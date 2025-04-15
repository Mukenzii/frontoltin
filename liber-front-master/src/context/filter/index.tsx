import React, { useContext, useReducer, useMemo, useCallback } from 'react';
import reducer from './reducer';
import { SET_GRIDVIEW, SET_LISTVIEW } from '../actions';
import { FilterState } from './types';

const initialState = {
  grid_view: true,
};

const FilterContext = React.createContext({} as FilterState);

export const FilterProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setGridView = useCallback(() => {
    dispatch({ type: SET_GRIDVIEW });
  }, [dispatch]);

  const setListView = useCallback(() => {
    dispatch({ type: SET_LISTVIEW });
  }, [dispatch]);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      setGridView,
      setListView,
    }),
    [state, setGridView, setListView]
  );
  return (
    <FilterContext.Provider value={memoizedValue}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
