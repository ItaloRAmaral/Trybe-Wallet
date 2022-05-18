// Const da Action de salvar o email
export const SAVE_EMAIL = 'SAVE_EMAIL';

// Consts das Actions do fetch
export const IS_FETCHING = 'IS_FETCHING';
export const FETCH_ALL_CURRENCIES = 'FETCH_ALL_CURRENCIES';

export const saveEmailAction = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

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
