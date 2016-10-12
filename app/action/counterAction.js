/**
 * Created by lipeiwei on 16/10/12.
 */


export const ACTIONS = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT'
};

export function increase() {
  return {
    type: ACTIONS.INCREMENT,
  };
}

export function decrease() {
  return {
    type: ACTIONS.DECREMENT
  };
}