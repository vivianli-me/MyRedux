/**
 * Created by lipeiwei on 16/10/12.
 */


/**
 * 实现reducers的拆分合并
 * @param reducers
 * @returns {function()}
 */
export default function combineReducers(reducers) {
  const keys = Object.keys(reducers);//拿到传入对象的所有key
  const finalReducers = {};//必须先声明为空对象{}
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let value = reducers[key];
    if (typeof value === 'function') {//筛选出类型为function的, 并组成一个新的对象finalReducers
      finalReducers[key] = value;
    }
  }

  return (prevState = {}, action) => {
    const nextState = {};
    const reducerKeys = Object.keys(finalReducers);
    for (let i = 0; i < reducerKeys.length; i++) {
      let key = reducerKeys[i];
      nextState[key] = finalReducers[key](prevState[key] ,action);
    }
    return nextState;
  };
}