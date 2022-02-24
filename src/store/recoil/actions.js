import axios from 'axios'

import emailjs from 'emailjs-com'

const actions =  {
    //setLoading and setData will be running in mounting components
    sendEmail: ({recipientEmail, genCode}) => {
        
        return emailjs.send('process.env.REACT_APP_MYEMAILJSSERVICE', process.env.REACT_APP_MYEMAILJSTEMPLATE, {recipientEmail, genCode}, process.env.REACT_APP_MYEMAILJSCREDENTIALKEY)
            
    },
   
}

export default actions