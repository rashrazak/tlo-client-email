import React, {useContext} from 'react'
import { StoreContext } from "../../store/context"
import EmailSubmit from '../EmailSubmit'
import EmailCheck from '../EmailCheck'


function Landing() {

    const { state, actions } = useContext(StoreContext);

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
        {getStepContent(state.step)}
        </div>
    )
}

export default Landing
