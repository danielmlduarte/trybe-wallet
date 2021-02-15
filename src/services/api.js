import { requestCurrencies, failedRequest, listCurrencies } from '../actions';

const fetchCurrencies = () => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  return async (dispatch) => {
    dispatch(requestCurrencies());
    try {
      const response = await fetch(endpoint);
      const object = await response.json();
      dispatch(listCurrencies(object));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
};

export default fetchCurrencies;
