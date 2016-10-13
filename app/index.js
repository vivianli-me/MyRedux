/**
 * Created by lipeiwei on 16/10/12.
 */


import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {increaseValue, decreaseValue, increaseValueAsyn} from './action/counterAction';
import {increaseFontSize, decreaseFontSize} from './action/fontSizeAction';
import createStore from './lib/src/createStore';
import reducers from './reducer';
import applyMiddleware from './lib/src/applyMiddleware';
import createLoggerMiddleware from './lib/middleware/createLoggerMiddleware';
import createThunkMiddleware from './lib/middleware/createThunkMiddleware';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  text: {
    margin: 5,
    fontSize: 18
  },
  touchableOpacity: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5
  }
});

let store;

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      value: 0,
      fontSize: 18
    };
    store.subscribe(() => {
      var state = store.getState();
      this.setState({
        value: state.counter.value,
        fontSize: state.fontSize.value
      });
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.text}>{this.state.value}</Text>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.touchableOpacity} onPress={this.onIncreaseValuePressed}>
              <Text style={styles.text}>点击加一</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.touchableOpacity, {marginLeft: 10}]} onPress={this.onDecreaseValuePressed}>
              <Text style={styles.text}>点击减一</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{height: 2, backgroundColor: 'gray'}}/>

        <View style={styles.container}>
          <Text style={[styles.text, {fontSize: this.state.fontSize}]}>{this.state.fontSize}</Text>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.touchableOpacity} onPress={this.onIncreaseFontSizePressed}>
              <Text style={styles.text}>增大字体</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.touchableOpacity, {marginLeft: 10}]} onPress={this.onDecreaseFontSizePressed}>
              <Text style={styles.text}>缩小字体</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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

export default function globalInit() {
  var loggerMiddleware = createLoggerMiddleware();
  var thunkMiddleware = createThunkMiddleware();
  store = applyMiddleware(thunkMiddleware,loggerMiddleware)(createStore)(reducers);
  //注意, 使用JSON.stringify只能将对象转化为json string ,并不能将方法也转化的
  // console.warn(Object.keys(store));
  return App;
}


