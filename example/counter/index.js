/**
 * Created by lipeiwei on 16/10/12.
 */
import React from 'react';
import ReactDOM from 'react-dom'
import {increaseValue, decreaseValue, increaseValueAsyn} from './action/counterAction';
import {increaseFontSize, decreaseFontSize} from './action/fontSizeAction';
import createStore from '../../lib/createStore';
import reducers from './reducer';
import applyMiddleware from '../../lib/applyMiddleware';
import createLoggerMiddleware from '../../middleware/createLoggerMiddleware';
import createThunkMiddleware from '../../middleware/createThunkMiddleware';
import {hot} from 'react-hot-loader'

let store;

class Container extends React.Component {

  constructor() {
    super();
    this.state = {
      value: 0,
      fontSize: 18
    };
    store.subscribe(() => {
      const state = store.getState();
      this.setState({
        value: state.counter.value,
        fontSize: state.fontSize.value
      });
    });
  }

  render() {
    return (
      <div>
        <div>
          <span>{this.state.value}</span>
          <div>
            <button onClick={this.onIncreaseValuePressed}>
              <span>点击加一111</span>
            </button>
            <button onClick={this.onDecreaseValuePressed}>
              <span>点击减一</span>
            </button>
          </div>
        </div>

        <div>
          <span>{this.state.fontSize}</span>
          <div>
            <button onClick={this.onIncreaseFontSizePressed}>
              <span>增大字体</span>
            </button>
            <button onClick={this.onDecreaseFontSizePressed}>
              <span>缩小字体</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  onIncreaseValuePressed() {
    store.dispatch(increaseValueAsyn());
  }

  onDecreaseValuePressed() {
    store.dispatch(decreaseValue());
  }

  onIncreaseFontSizePressed() {
    store.dispatch(increaseFontSize());
  }

  onDecreaseFontSizePressed() {
    store.dispatch(decreaseFontSize());
  }

}

var loggerMiddleware = createLoggerMiddleware();
var thunkMiddleware = createThunkMiddleware();
store = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore)(reducers);
//注意, 使用JSON.stringify只能将对象转化为json string ,并不能将方法也转化的
// console.warn(Object.keys(store));

const App = hot(module)(Container)

ReactDOM.render(<App/>, document.getElementById('root'))