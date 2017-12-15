import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import './style/index.css';
import App from './App';
import updateLikes from './reducer';
import registerServiceWorker from './registerServiceWorker';
const store = createStore(updateLikes);

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
        document.getElementById('root'),
        registerServiceWorker()
    );
