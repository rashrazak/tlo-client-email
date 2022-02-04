import React, {useContext} from 'react'
import { useRecoilValue } from 'recoil';
import EmailSubmit from '../EmailSubmit'
import EmailCheck from '../EmailCheck'

import state from '../../store/recoil/atom'

function Landing() {
	// const step = useSelector(state=>state.main.step)
	const {step} = useRecoilValue(state);
    const getStepContent = (step) => {
		switch (step) {
			case 0:
				return <EmailSubmit />
			case 1:
				return <EmailCheck />;
			default:
				return <EmailSubmit />;
		}
	}
    return (
        <div>
        {getStepContent(step)}
        </div>
    )
}

export default Landing
