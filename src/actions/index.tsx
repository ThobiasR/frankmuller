export const login1 = (token: string, data: string) => {
  return {
    type: 'LOGIN',
    payload: { token, data },
  };
};
export const logout1 = () => {
  return {
    type: 'LOGOUT',
  };
};
