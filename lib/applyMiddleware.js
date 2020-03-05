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
  //一层层封装dispatch, 链式调用
  return (...args) => functionList.reduceRight((composed, f) => f(composed), ...args);
}


export default function applyMiddleware(...middlewares) {
  return createStore => (reducer, initState) => {
    const store = createStore(reducer, initState);
    let dispatch = store.dispatch;
    const middlewareAPI = {
      getState: store.getState,
      //为了让最后各个middleware拿到的dispatch是最新的,
      //这里必须用匿名函数 action => dispatch(action), 而不能直接用store.dispatch
      dispatch: action => dispatch(action)
    };
    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);//包装dispatch
    return {
      ...store,
      dispatch
    };
  };
}
