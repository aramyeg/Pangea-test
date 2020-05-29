import {t} from '../actions';

const initState = {
  loader : false,
  userQuery : null,
  total_count : null,
  usersList: null,
};

export const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case t.LOAD_MORE_DATA:
      return {
        ...state,
        userQuery: action.query,
        loader: true,
      }
    case t.LOAD_USER_DATA:
      return{
        ...state,
        userQuery: action.query,
        loader: true,
      }
    case t.LOAD_USER_DATA_SUCCESS:
      return {
        ...state,
        loader: false,
        total_count: action.data.data.total_count,
        usersList: {
          ...state.usersList,
          [action.data.page]: action.data.data.items,
        },
      };
    case t.LOAD_USER_DATA_FAIL:
      return{
        ...state,
        error: action.error,
        loader: false,
      }
    default:
      return state;
  }
};