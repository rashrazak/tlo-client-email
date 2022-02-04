import React, {useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import EmailSubmit from '../EmailSubmit'
import EmailCheck from '../EmailCheck'


function Landing() {
	const step = useSelector(state=>state.main.step)

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
