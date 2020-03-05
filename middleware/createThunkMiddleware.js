/**
 * Created by lipeiwei on 16/10/13.
 */

export default function createThunkMiddleware() {
  return function ({getState, dispatch}) {
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState)
        }
        return next(action);
      }
    }
  }
}