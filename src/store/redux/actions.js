import {
IS_LOADING,
SET_DATA,
RESET_DATA,
SET_STEP,
REMOVE_DATA,
SET_DIALOG,
} from "../types";
import axios from 'axios'

import * as randomNum from 'random-number'
import emailjs from 'emailjs-com'

const actions =  {
    setLoading:  (data) => {
        return dispatch => dispatch({ type: IS_LOADING, data });
    },
    setStep: (data) => {
        return dispatch => dispatch({ type: SET_STEP, data });
    },
    setData: (data, name) => {
        return dispatch => dispatch({ type: SET_DATA, data, name });
    },
    removeData: (name) => {
        return dispatch => dispatch({ type: REMOVE_DATA, name });
    },
    resetData: () => {
        return dispatch => dispatch({ type: RESET_DATA });
    },
    setDialog: (data) => {
        return dispatch => dispatch({ type: SET_DIALOG, data});
    },
    //on useContext, it is difference
    sendEmail: ({recipientEmail}, step) => {
        return dispatch => {
            dispatch({ type: IS_LOADING, data: true });
            let genCode = randomNum({
                min:100000,
                max:999999,
                integer:true
            })
            emailjs.send('process.env.REACT_APP_MYEMAILJSSERVICE', process.env.REACT_APP_MYEMAILJSTEMPLATE, {recipientEmail, genCode}, process.env.REACT_APP_MYEMAILJSCREDENTIALKEY)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                dispatch({ type:SET_DATA, data:{recipientEmail, genCode},name:'mailCheck'})
                dispatch({ type: IS_LOADING, data: false });
                dispatch({ type: SET_STEP, data:step+1 });
            }, function(error) {
                console.log('FAILED...', error);
            });
        }
    }
}

export default actions