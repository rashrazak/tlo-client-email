import {
  IS_LOADING,
  SET_DATA,
  RESET_DATA,
  SET_STEP,
  REMOVE_DATA,
  SET_DIALOG,
} from "../../types";
import axios from 'axios'

import * as randomNum from 'random-number'
import emailjs from 'emailjs-com'

export const useActions = (state, dispatch) => {
  const actions =  {
    setLoading:  (data) => {
      dispatch({ type: IS_LOADING, data });
    },
    setStep: (data) => {
      dispatch({ type: SET_STEP, data });
    },
    setData: (data, name) => {
      dispatch({ type: SET_DATA, data, name });
    },
    removeData: (name) => {
      dispatch({ type: REMOVE_DATA, name });
    },
    resetData: () => {
      dispatch({ type: RESET_DATA });
    },
    setDialog: (data) => {
      dispatch({ type: SET_DIALOG, data});
    },
    successEmail:({recipientEmail, genCode}) =>{
      actions.setData({recipientEmail, genCode},'mailCheck')
      dispatch({ type: IS_LOADING, data: false });
      dispatch({ type: SET_STEP, data:state.step+1 });
    },
    sendEmail: ({recipientEmail}) => {
      dispatch({ type: IS_LOADING, data: true });
      let genCode = randomNum({
        min:100000,
        max:999999,
        integer:true
      })
      emailjs.send(process.env.REACT_APP_MYEMAILJSSERVICE, process.env.REACT_APP_MYEMAILJSTEMPLATE, {recipientEmail, genCode}, process.env.REACT_APP_MYEMAILJSCREDENTIALKEY)
      .then(function(response) {
         console.log('SUCCESS!', response.status, response.text);
         actions.successEmail({recipientEmail, genCode})
       }, function(error) {
         console.log('FAILED...', error);
       });
    
    }
  }
  return actions
};
