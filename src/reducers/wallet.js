import { DELETE_EXPENSE_TYPE, FAILED_REQUEST_TYPE, GET_CURRENCY_TYPE,
  GET_EXPENSES_TYPE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_EXPENSES_TYPE:
    return {
      ...state,
      expenses: [...state.expenses, {
        id: state.expenses.length,
        ...action.expense,
        exchangeRates: action.rates,
      }],
    };
  case FAILED_REQUEST_TYPE:
    return {
      ...state,
      error: action.error,
    };
  case GET_CURRENCY_TYPE:
    return {
      ...state,
      currencies: action.payload,
    };
  case DELETE_EXPENSE_TYPE:
    return {
      ...state,
      expenses: [...state.expenses].filter(({ id }) => id !== Number(action.payload)),
    };
  default:
    return state;
  }
};

export default walletReducer;
