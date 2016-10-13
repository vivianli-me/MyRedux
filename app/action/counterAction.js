/**
 * Created by lipeiwei on 16/10/12.
 */


export const ACTIONS = {
  INCREASEVALUE: 'INCREASEVALUE',
  DECREASEVALUE: 'DECREASEVALUE'
};

export function increaseValue() {
  return {
    type: ACTIONS.INCREASEVALUE,
  };
}

export function decreaseValue() {
  return {
    type: ACTIONS.DECREASEVALUE
  };
}

//异步action
export function increaseValueAsyn() {
  return dispatch => {
    setTimeout(() => {
      dispatch(increaseValue());
    }, 1000);
  }
}