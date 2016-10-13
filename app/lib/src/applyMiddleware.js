/**
 * Created by lipeiwei on 16/10/13.
 */

/**
 * compose(f, g, h)
 * @return (...args) => f(g(h(...args))).
 */
function compose(...functionList) {
  if (functionList.length === 0) {
    return arg => arg;
  }
  if (functionList.length === 1) {
    return functionList[0];
  }
  //箭头函数要注意return, reduceRight是为了让中间件按从左到右的方式执行
  return (...args) => functionList.reduceRight((composed, f) => f(composed), ...args);
}


export default function applyMiddleware(...middlewares) {
  return createStore => (reducer, initState) => {
    var store = createStore(reducer, initState);
    var middlewareAPI = {
      getState: store.getState,
      dispatch: store.dispatch
    };
    var chain = [];
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    var dispatch = compose(...chain)(store.dispatch);//包装dispatch
    return {
      ...store,
      dispatch
    };

  };
}
