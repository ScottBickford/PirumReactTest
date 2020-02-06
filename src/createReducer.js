// This function enables you to create a reducer in a different, more readable way.
// Instead of having everything in one giant method with a switch statement for your actions, this function
// splits your actions into it's own methods making it more readable
export const createReducer = (initialState, fnMap) => {
  return (state = initialState, { type, payload }) => {
    const handler = fnMap[type];

    return handler ? handler(state, payload) : state;
  };
};
