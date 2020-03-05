/**
 * Created by lipeiwei on 16/10/12.
 */

import {ACTIONS} from '../action/fontSizeAction';

/**
 *
 * @param state 初始状态为{value: 0}
 * @param action
 */
export default function fontSizeReducer(state = {value: 18}, action) {
  switch (action.type) {
    case ACTIONS.BIGGER:
      return {
        ...state,
        value: state.value + 2
      };
    case ACTIONS.SMALLER:
      return {
        ...state,
        value: state.value - 2
      };
    default:
      return state;
  }
}
