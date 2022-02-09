export const GET_EMAIL_TYPE = 'GET_EMAIL';

export const getEmail = (email) => ({
  type: GET_EMAIL_TYPE,
  payload: email,
});
