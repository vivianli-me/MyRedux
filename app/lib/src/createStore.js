/**
 * Created by lipeiwei on 16/10/12.
 */


var globalReducer;
var globalState;
var subscriberList = [];

function subscribe(subscriber) {
  if (typeof subscriber === 'function') {
    subscriberList.push(subscriber);
    return () => {
      let index = subscriberList.indexOf(subscriber);
      if (index != -1) {
        subscriberList.splice(index, 1);//删除index位置的元素
      }
    }
  }
  console.warn(`the param should be a function`);
}

function clearSubscribe() {
  subscriberList = [];
}

function dispatch(action) {
  console.log(`dispatch action = ${JSON.stringify(action)}`);
  //调用reducer更新状态
  globalState = globalReducer(globalState, action);
  //通知订阅器已更新
  subscriberList.forEach(subscriber => {
    subscriber();
  });
}

function getState() {
  return globalState;
}

const store = {
  subscribe,
  clearSubscribe,
  dispatch,
  getState
};


export default function createStore(reducer) {
  if (typeof reducer !== 'function') {
    throw new Error(`the param must be a function. typeof reducer ${typeof reducer}`);
  }
  globalReducer = reducer;
  return store;

}


