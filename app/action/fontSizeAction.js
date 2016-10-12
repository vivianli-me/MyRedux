/**
 * Created by lipeiwei on 16/10/12.
 */


export const ACTIONS = {
  BIGGER: 'BIGGER',
  SMALLER: 'SMALLER'
};

export function increaseFontSize() {
  return {
    type: ACTIONS.BIGGER,
  };
}

export function decreaseFontSize() {
  return {
    type: ACTIONS.SMALLER
  };
}
