// Coloque aqui suas actions
export const userEmail = (payload) => ({
  type: 'CHANGE_EMAIL',
  payload,
});

export const walletCurrencies = (currencies) => ({
  type: 'CURRENCIES',
  currencies,
});

export const infoWAllet = (expenses) => ({
  type: 'INFO_WALLET',
  payload: expenses,
});

export const getCurrencies = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const apiResult = await response.json();
    const codeArray = Object.keys(apiResult).filter((code) => code !== 'USDT');
    dispatch(walletCurrencies(codeArray));
  } catch (error) {
    console.log(error);
  }
};

export function adicionarDispesa(expenses) {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all/');
    const result = await response.json();
    const dados = { exchangeRates: result, ...expenses };
    dispatch(infoWAllet(dados));
  };
}

// action thunk implementado com auxílio da mentoria da Luá, na construção da action em si e no entendimento da lógica;
