const STATE_WALLET = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = STATE_WALLET, action) => {
  switch (action.type) {
  case 'CURRENCIES':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'INFO_WALLET':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
};
export default walletReducer;
