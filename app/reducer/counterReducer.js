/**
 * Created by lipeiwei on 16/10/12.
 */

import {ACTIONS} from '../action/counterAction';

/**
 *
 * @param state 初始状态为0
 * @param action
 */
export function reducer(state = 0, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return state + 1;
    case ACTIONS.DECREMENT:
      return state - 1;
    default:
      return state;
  }
}