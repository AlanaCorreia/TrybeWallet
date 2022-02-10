import { FAILED_REQUEST_TYPE, GET_EXPENSES_TYPE, REQUEST_API_TYPE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  loading: false,
  error: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API_TYPE:
    return {
      ...state,
      loading: true,
    };
  case GET_EXPENSES_TYPE:
    return {
      ...state,
      expenses: [...state.expenses, {
        id: state.expenses.length,
        ...action.expense,
        exchangeRates: action.rates,
      }],
      loading: false,
    };
  case FAILED_REQUEST_TYPE:
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  default:
    return state;
  }
};

export default walletReducer;
