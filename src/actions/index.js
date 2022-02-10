export const GET_EMAIL_TYPE = 'GET_EMAIL_TYPE';
export const GET_EXPENSES_TYPE = 'GET_EXPENSES_TYPE';
export const REQUEST_API_TYPE = 'REQUEST_API_TYPE';
export const FAILED_REQUEST_TYPE = 'FAILED_REQUEST_TYPE';

export const getEmail = (email) => ({
  type: GET_EMAIL_TYPE,
  payload: email,
});

const requestAPI = () => ({
  type: REQUEST_API_TYPE,
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

export const cotacaoFetch = (expense) => async (dispatch) => {
  dispatch(requestAPI());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const dataRates = await response.json();
    return dispatch(getExpenses(expense, dataRates));
  } catch (error) {
    return dispatch(failedRequest(error));
  }
};
