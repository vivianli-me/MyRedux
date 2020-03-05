注：原文请见[lipeiwei-szu/blog](https://github.com/lipeiwei-szu/blog/issues/1)

### redux概念
以往的开发模式中，绝大多数都是**命令式编程**，类似于jQuery，根据后端数据渲染html、事件监听处理、用户交互后的频繁dom操作。而react/vue这一类框架则不同，它只需要进行逻辑渲染、维护数据即可，dom操作统一交给底层去处理，这种一般叫做**声明式编程**。react就是这种**数据驱动**的模式`state => view`，当数据变更时，所对应的view也会及时地更新

react中有`state`跟`props`两个关键概念，当需求不复杂时，一般将状态数据维护在组件的`state`中，并且随着组件的卸载，state也会自动清空，十分方便。而`props`是父组件传过来的数据，也能够直接影响到视图层

随着单页面应用的日渐复杂，我们的代码需要管理越来越多的状态，公用性的状态就不适合维护在特定的组件中了，这个时候我们将其维护在全局，但仔细思考又存在一些问题，比如公用状态该由谁来触发修改，是否有所记录，是否方便回溯定位问题，如果这些问题无法解决，将会产生更多的问题。

最早出现的数据管理思想是[**flux**](https://github.com/facebook/flux)，它的核心观点是应用的状态必须放到store中统一管理，视图层不允许直接修改应用状态，只能通过触发action去修改应用状态，这样子修改都能有记录，方便回溯问题。

而redux是flux思想的一个具体实现，redux有[**三大原则**](https://redux.js.org/introduction/three-principles)
+ **单一数据源**（The state of your whole application is stored in an object tree within a single store）（备注：与flux不同，redux只有单一store）
+ **state只读**（The only way to change the state is to emit an action, an object describing what happened）
+ **reducers必须是纯函数**

redux要求必须通过`store.dispatch`方法去发出一个action，且action对象必须包含type字段（该字段一般为string类型，代表该action的类型）。

### redux createStore
redux的核心方法createStore大致实现如下
```javascript
// 备注：以下为createStore函数的伪代码，为了篇幅考虑，有些细微逻辑没写完整，但不影响整体阅读
function createStore(reducer, preloadedState) {
    // 单一store的state
    let currentState = preloadedState
    // reducer处理函数
    let currentReducer = reducer
    // 监听器列表
    let currentListeners = []
    getState() {
        return currentState
    }
    dispatch(action) {
        // action空判断、纯对象判断
        // action.type字段判断
        // 调用reducer函数，传入state跟action，并返回新的state
        currentState = currentReducer(currentState, action)
        // 遍历通知各个订阅方
        currentListeners.forEach(listener => {
             listener()
        })
    }
    // 订阅监听函数
    subscribe(listener) {
        currentListeners.push(listener)
        // 返回unsubscribe函数
        return function() {
            const index = currentListeners.indexOf(listener)
            currentListeners.splice(index, 1)
        }
    }
    // 替换reducer函数
    replaceReducer(nextReducer) {
        currentReducer = nextReducer
    }

    // 该操作十分巧妙，发出一个action，使得各个reducer函数返回其init state
    dispatch({ type: ActionTypes.INIT })
    // 返回store
    return {
        getState,
        dispatch,
        subscribe,
        replaceReducer
    }
}
```
这就是redux创建全局store的函数，只需要传入预定义的初始化state跟reducer函数，即可获得store对象，从`subscribe`方法就能看出，redux是订阅式的操作，当state更新完毕后，会逐一调用各个listener函数。

### createStore中需要注意的点
1. **action为什么需要是plain object**
2. **reducer为什么需要是pure function**（定义：相同输入永远有着相同的输出；不修改函数的输入值；不依赖外部环境状态；无任何副作用）

### redux的其它几个函数
除了**createStore**，redux的几个核心函数中，还有**combineReducers/bindActionCreators/applyMiddleware**

#### combineReducers
原本，reducer只是一个函数，其定义如下：`(state, action) => newState`，传入state跟action，处理后返回新的state。combineReducers的出现，是为了让我们更方便地对reducer进行更加细致化粒度的拆分，比如应用中有三个节点，分别是login/register/home
```javascript
const loginReducer = (state, action) => newState
const registerReducer = (state, action) => newState
const homeReducer = (state, action) => newState
const rootReducers = combineReducers({
    login: loginReducer,
    register: registerReducer
    home: homeReducer
})
```
每发出一个action，会依次进入每个reducer函数，并返回拼接成新的state。比如，当执行loginReducer函数时，传入的分别是state.login跟action（**注意，这里传的不是根部state，而是state.login**）

![image](https://user-images.githubusercontent.com/6500078/67157234-018bf100-f35c-11e9-956f-c0a9962bd435.png)
reducer为单一函数时
![image](https://user-images.githubusercontent.com/6500078/67157237-0781d200-f35c-11e9-9004-0947ceec1d62.png)
reducers经过细致化粒度拆分后（**但一般来说，我们的应用reducers两层就够了，combineReducers也只能处理两层，图仅为示意**。注：图引用自[知乎回答：怎样理顺react，flux，redux这些概念的关系，开发中有必要使用它们吗?](https://www.zhihu.com/question/47686258/answer/107209140)）


#### bindActionCreators
bindActionCreators是为了更方便地发出一个action，减少业务中的冗余代码
```javascript
//———————————业务代码———————————
// action type
const LOGIN_TYPE = 'LOGIN'
// action creator
const loginActionCreator = function(name, password) {
    return {
        type: LOGIN_TYPE,
        name,
        password
    }
}
// before
store.dispatch(loginActionCreator('lipeiwei', '123456'))

// after
const login = bindActionCreator(loginActionCreator, store.dispatch)
login('lipeiwei', '123456')

//———————————redux源码———————————
function bindActionCreator(actionCreator, dispatch) {
    return (...arg) => dispatch(actionCreator(...arg))
}
function bindActionCreators(actionCreators, dispatch) {
    // 省略
}
```

### react-redux
前面已经说过了，redux是订阅式的，当state更新完毕后，会逐一通知listener。也就是说，各个订阅方需要去获取state，自行去判断自己所用到的节点数据是否更新了。假设没有react-redux这个库，那我们在业务侧需要做些什么工作呢，我们可以举个简单的例子
```javascript
// 假设store结构如下
store.state = {
    login: {
        name: '',
        password: ''
    }
}

// 业务代码
class Login extends React.Component {
    constructor() {
        this.state = {
            name: '',
            password: ''
        }
    }
    componentDidMount() {
        store.subscribe(function() {
            const loginData = store.getState().login
            // 浅比较loginData跟this.state从而决定更不更新
        })
    }
    render() {
        ...
    }
    componentWillUnmount() {
        ...
    }
}
```
其中还有一些逻辑我没写完整，比如Component卸载时的store unsubscribe逻辑。总结下来，业务侧需要做的事务有：引入store、store的监听注册与反注册、筛选所需要的数据并及时更新等等。

react-redux就是专门解决开发流程上这种重复性的问题，否则每个需要用到store state的组件，都需要按照上面的流程去做一遍。它主要提供了两个东西：**Provider组件**、**connect函数**。使用Provider包住根部组件，使得各个子组件都能快速地引用到store（可以看[react context机制](https://reactjs.org/docs/context.html)）。使用connect函数，帮助你监听store的修改并筛选你所想要的数据。**具体请听下回分解......**

### 参考链接
+ [redux文档](https://redux.js.org/introduction/getting-started)
+ [redux源码](https://github.com/reduxjs/redux)
+ [react-redux文档](https://react-redux.js.org)
+ [知乎回答：怎样理顺react，flux，redux这些概念的关系，开发中有必要使用它们吗?](https://www.zhihu.com/question/47686258/answer/107209140)
