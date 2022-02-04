import React, {useEffect} from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducers';
import Landing from '../../componentsRedux/Landing';

const store = createStore(rootReducer, compose(applyMiddleware(thunk.withExtraArgument())));


function ReduxMain() {

    return  (
    <Provider store={store}>
        <Landing />
    </Provider>
    )
}

export default ReduxMain;
