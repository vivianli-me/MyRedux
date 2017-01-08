/**
 * Created by lipeiwei on 16/10/13.
 */

export default function createLoggerMiddleware() {
  return function ({getState}) {
    return function (next) {
      return function (action) {
        const prevState = getState();
        const returnValue = next(action);
        const nextState = getState();
        console.log(JSON.stringify(`prevState = ${JSON.stringify(prevState)}`));
        console.log(JSON.stringify(`action = ${action}`));
        console.log(JSON.stringify(`nextState = ${JSON.stringify(nextState)}`));
        return returnValue;
      }
    }
  };
}