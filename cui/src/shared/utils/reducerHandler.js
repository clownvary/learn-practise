'use strict';

export default (initialState, handlers)=> {
  return (state = initialState, action)=> {
    const type = action.type;

    if (!handlers[type]) {
      return state;
    }

    return handlers[type](state, action);
  }
}
