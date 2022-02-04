import React, {useContext} from 'react';
import StoreProvider, { StoreContext } from "../store/reactContext/context"

import Landing from './Landing';


function ContextMain() {
    const { state, actions } = useContext(StoreContext);
    return  (
    <StoreProvider>
        <StoreContext.Consumer>
            {({ state }) => (
                <Landing />
            )}
        </StoreContext.Consumer>
    </StoreProvider>
    )
}

export default ContextMain;
