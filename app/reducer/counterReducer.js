/**
 * Created by lipeiwei on 16/10/12.
 */

import {ACTIONS} from '../action/counterAction';

/**
 *
 * @param state 初始状态为{value: 0}
 * @param action
 */
export default function counterReducer(state = {value: 0}, action) {
  console.log(`counterReducer state = ${JSON.stringify(state)}  action = ${JSON.stringify(action)}`);
  switch (action.type) {
    case ACTIONS.INCREASEVALUE:
      return {
        ...state,
        value: state.value + 1
      };
    case ACTIONS.DECREASEVALUE:
      return {
        ...state,
        value: state.value - 1
      };
    default:
      return state;
  }
}
