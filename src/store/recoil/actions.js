import axios from 'axios'

import emailjs from 'emailjs-com'

const actions =  {
    //setLoading and setData will be running in mounting components
    sendEmail: ({recipientEmail, genCode}) => {
        
        return emailjs.send('process.env.REACT_APP_MYEMAILJSSERVICE', process.env.REACT_APP_MYEMAILJSTEMPLATE, {recipientEmail, genCode}, process.env.REACT_APP_MYEMAILJSCREDENTIALKEY)
            
    },
    // sendEmail2: ({recipientEmail}, step) => {
    //     {
    //         dispatch({ type: IS_LOADING, data: true });
    //         let genCode = randomNum({
    //             min:100000,
    //             max:999999,
    //             integer:true
    //         })
    //         emailjs.send('process.env.REACT_APP_MYEMAILJSSERVICE', process.env.REACT_APP_MYEMAILJSTEMPLATE, {recipientEmail, genCode}, process.env.REACT_APP_MYEMAILJSCREDENTIALKEY)
    //         .then(function(response) {
    //             console.log('SUCCESS!', response.status, response.text);
    //             dispatch({ type:SET_DATA, data:{recipientEmail, genCode},name:'mailCheck'})
    //             dispatch({ type: IS_LOADING, data: false });
    //             dispatch({ type: SET_STEP, data:step+1 });
    //         }, function(error) {
    //             console.log('FAILED...', error);
    //         });
    //     }
    // }
}

export default actions