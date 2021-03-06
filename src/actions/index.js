// Const da Action de salvar o email
export const SAVE_EMAIL = 'SAVE_EMAIL';

export const saveEmailAction = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

// Consts das Actions do fetch all Currencies
export const IS_FETCHING = 'IS_FETCHING';
export const FETCH_ALL_CURRENCIES = 'FETCH_ALL_CURRENCIES';

export const isFetchingAction = () => ({
  type: IS_FETCHING,
});

export const fetchingAllCoinSuccessAction = (payload) => ({
  type: FETCH_ALL_CURRENCIES,
  payload,
});

export const fetchAllCurrencies = () => {
  console.log('a');
  return async (dispatch) => {
    dispatch(isFetchingAction);
    try {
      const url = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(url);
      const data = await response.json();
      const currencies = Object.keys(data).filter((coin) => coin !== 'USDT');
      console.log(currencies);
      dispatch(fetchingAllCoinSuccessAction(currencies));
    } catch (error) {
      console.log(error);
    }
  };
};

// Consts das actions do fetch moeda especifica
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';

export const fetchingCoinSuccessAction = (expenses, currencies) => ({
  type: FETCH_CURRENCIES,
  expenses,
  currencies,
});

export const fetchCurrencie = (expenses) => {
  console.log(expenses);
  return async (dispatch) => {
    dispatch(isFetchingAction);
    try {
      const url = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(url);
      const data = await response.json();
      dispatch(fetchingCoinSuccessAction(expenses, data));
    } catch (error) {
      console.log(error);
    }
  };
};

// conts das actions da logica de excluir gasto da wallet
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const removeExpenseAction = (id) => ({
  type: REMOVE_EXPENSE,
  id,
});

// consts das actions da logica de editar o gasto da wallet
export const EDIT_BTN_FORMS = 'EDIT_BTN_FORMS';

export const editBtnFormsAction = (id, expense) => ({
  type: EDIT_BTN_FORMS,
  id,
  expense,
});

export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';

export const updateExpensesAction = (expenses) => ({
  type: UPDATE_EXPENSES,
  expenses,
});
