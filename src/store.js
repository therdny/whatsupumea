import counter from './reducer';
import {createStore} from 'redux';
const store = createStore(counter);

export default store;