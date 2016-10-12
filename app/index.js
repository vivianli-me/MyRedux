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
import {increase, decrease} from './action/counterAction';
import createStore from './lib/src/createStore';
import {reducer} from './reducer/counterReducer';

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
      value: 0
    };
    store.subscribe(() =>
      this.setState({
        value: store.getState()
      })
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.value}</Text>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.touchableOpacity} onPress={this.onIncrementPressed}>
            <Text style={styles.text}>点击加一</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.touchableOpacity, {marginLeft: 10}]} onPress={this.onDecreasePressed}>
            <Text style={styles.text}>点击减一</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onIncrementPressed() {
    store.dispatch(increase());
  }

  onDecreasePressed() {
    store.dispatch(decrease());
  }
  
}

export default function globalInit() {
  store = createStore(reducer);
  //注意, 使用JSON.stringify只能将对象转化为json string ,并不能将方法也转化的
  // console.warn(Object.keys(store));
  return App;
}


