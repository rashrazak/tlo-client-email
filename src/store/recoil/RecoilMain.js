import React, {useEffect} from 'react';
import { RecoilRoot } from 'recoil';
import Landing from '../../componentsRecoil/Landing';



function ReduxMain() {

    return  (
    <RecoilRoot>
        <Landing />
    </RecoilRoot>
    )
}

export default ReduxMain;
