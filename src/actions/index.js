export const GET_EMAIL_TYPE = 'GET_EMAIL_TYPE';
export const GET_EXPENSES_TYPE = 'GET_EXPENSES_TYPE';
export const FAILED_REQUEST_TYPE = 'FAILED_REQUEST_TYPE';
export const GET_CURRENCY_TYPE = 'GET_CURRENCY_TYPE';

export const getEmail = (email) => ({
  type: GET_EMAIL_TYPE,
  payload: email,
});

const failedRequest = (error) => ({
  type: FAILED_REQUEST_TYPE,
  error,
});

const getExpenses = (expense, rates) => ({
  type: GET_EXPENSES_TYPE,
  expense,
  rates,
});

const getCurrency = (currencies) => ({
  type: GET_CURRENCY_TYPE,
  payload: currencies,
});

export const cotacaoFetch = (expense) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const dataRates = await response.json();
    return dispatch(getExpenses(expense, dataRates));
  } catch (error) {
    return dispatch(failedRequest(error));
  }
};

export const currencyFetch = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const dataJson = await response.json();
    const dataCurrencies = Object.keys(dataJson)
      .filter((currency) => currency !== 'USDT');
    return dispatch(getCurrency(dataCurrencies));
  } catch (error) {
    return dispatch(failedRequest(error));
  }
};
