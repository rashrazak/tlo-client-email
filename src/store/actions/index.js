import {
  IS_LOADING,
  SET_DATA,
  RESET_DATA,
  SET_STEP,
  REMOVE_DATA,
  SET_DIALOG,
} from "../types";
import * as ls from 'local-storage'
import axios from 'axios'

import * as randomNum from 'random-number'
import emailjs from 'emailjs-com'

import api from '../../utils/api';
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
    sendMailBackup:async ({recipientEmail, genCode})=>{
        let res =  axios.get(`http://localhost:5000/plankawen-19918/us-central1/sendEmail?recipientEmail=${recipientEmail}&genCode=${genCode}`)
        if (res.status == 400) {
          alert('Error Again')
          return false
        }
        //mailgun not allow email recipient if test user, using rashdanrazak91@gmail.com
        actions.successEmail({recipientEmail, genCode})
      },
    sendEmail: ({recipientEmail}) => {
      dispatch({ type: IS_LOADING, data: true });
      let genCode = randomNum({
        min:100000,
        max:999999,
        integer:true
      })
      emailjs.send('service_5nidkzd', 'template_6ttyfvk', {recipientEmail, genCode}, 'user_vzG3jk3Dt7ojma67IRZO9')
      .then(function(response) {
         console.log('SUCCESS!', response.status, response.text);
         actions.successEmail({recipientEmail, genCode})
       }, function(error) {
         console.log('FAILED...', error);
        actions.sendMailBackup({recipientEmail, genCode})
       });
    
    }
  }
  return actions
};
