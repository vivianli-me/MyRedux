/**
 * Created by lipeiwei on 16/10/13.
 */

export default function createThunkMiddleware() {
  return function ({getState, dispatch}) {
    return function (next) {
      return function (action) {
        console.log('check the "action" type');
        if (typeof action === 'function') {
          return action(dispatch, getState)
        }
        return next(action);
      }
    }
  }
}