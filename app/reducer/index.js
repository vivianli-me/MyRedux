/**
 * Created by lipeiwei on 16/10/12.
 */


import counter from './counterReducer';
import fontSize from './fontSizeReducer';
import combineReducers from '../lib/src/combineReducers';

export default combineReducers({
  counter,
  fontSize
});