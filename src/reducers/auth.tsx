const initialAuthState = {
  data: undefined,
  token: undefined,
};

const auth = (state = initialAuthState, action: any) => {
  switch (action.type) {
    case 'LOGIN': {
      const token = action.payload.token;
      const data = action.payload.data;

      return { ...state, token, data };
    }
    case 'LOGOUT': {
      return { initialAuthState };
    }

    default:
      return state;
  }
};

export default auth;
