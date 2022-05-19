import {
  IS_FETCHING,
  FETCH_ALL_CURRENCIES,
  FETCH_CURRENCIES,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: false,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_FETCHING:
    return {
      ...state,
      isLoading: true,
    };

  case FETCH_ALL_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
      isLoading: false,
    };

  case FETCH_CURRENCIES:
    return {
      ...state,
      expenses: [...state.expenses, {
        ...action.expenses,
        exchangeRates: action.currencies,
      }],
      isLoading: false,
    };

  default:
    return state;
  }
};

export default walletReducer;
