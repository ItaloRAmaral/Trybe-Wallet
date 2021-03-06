import {
  IS_FETCHING,
  FETCH_ALL_CURRENCIES,
  FETCH_CURRENCIES,
  REMOVE_EXPENSE,
  EDIT_BTN_FORMS,
  UPDATE_EXPENSES,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: false,
  editExpenseBtn: false,
  editExpenseId: '',
  editExpenseObj: {},
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

  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };

  case EDIT_BTN_FORMS:
    return {
      ...state,
      editExpenseBtn: true,
      editExpenseId: action.id,
      editExpenseObj: { ...action.expense },
    };

  case UPDATE_EXPENSES:
    return {
      ...state,
      editExpenseBtn: false,
      editExpenseId: '',
      editExpenseObj: {},
      expenses: [...action.expenses],
    };

  default:
    return state;
  }
};

export default walletReducer;
