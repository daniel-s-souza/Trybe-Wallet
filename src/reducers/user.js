const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CHANGE_EMAIL':
    return { ...state, email: action.payload };
  default:
    return state;
  }
};
export default userReducer;
