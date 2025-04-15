import { SET_LISTVIEW, SET_GRIDVIEW } from '../actions';
import { FilterState } from './types';

const filter_reducer = (state: FilterState, action: any) => {
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
