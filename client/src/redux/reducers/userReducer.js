
const intialState = {
  user: {
    id: '',
    name: ''
  },
};

export const userReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case 'getCurrentUser': {
        const updateUser = {
            id: payload.id,
            name: payload.name
        }
        return { ...state, user: updateUser}
    }
    default:
      return state;
  }
};
