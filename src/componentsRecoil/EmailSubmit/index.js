import React, { useRef, useEffect } from "react"
import classNames from 'classnames';
import { useFormik } from 'formik';
import * as yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import actions from '../../store/recoil/actions'
import Loader from "../../components/Loader";
import "./EmailSubmit.scss";
import state from '../../store/recoil/atom'
import {useRecoilState} from 'recoil'
import * as randomNum from 'random-number'


const EmailSubmit = () => {
  
  
  const  {sendEmail} = actions
  // const dispatch = useDispatch()
  // const state = useSelector((state) =>state.main)
  const [data, setData] = useRecoilState(state);
  const buttonRef = useRef(null);

  useEffect(() => {
    console.log(data)
  }, [data]);

  const initialValues = (data.mailSent) ? { ...data.mailSent } : {
    recipientEmail: "",
    termsAcknowledgement: false,
  }


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object().shape({
        recipientEmail: yup.string().email("Email must valid").required("Email required"),
    }),
    onSubmit: values => {
        let genCode = randomNum({
            min:100000,
            max:999999,
            integer:true
        })
        let params = { recipientEmail: values.recipientEmail, genCode};

        setData(old=>{return {...old, setLoading:true, mailSent:params}})

        sendEmail(params).then((response) => {

            console.log('SUCCESS!', response.status, response.text);
            setData(old=>{return {...old, mailCheck:{recipientEmail:values.recipientEmail, genCode}, step:old.step + 1}})

            // dispatch({ type:SET_DATA, data:{recipientEmail, genCode},name:'mailCheck'})
            // dispatch({ type: IS_LOADING, data: false });
            // dispatch({ type: SET_STEP, data:step+1 });

        }).catch(err => {
          console.log('FAILED...', err);
        }).finally(() =>setData(old=>{return {...old, setLoading:false}}))
    }
  });

  return (
    <div className="page page-basic-details">
      <form onSubmit={formik.handleSubmit}>
        <div className="c-field-holder">
          <p className="c-field-title">Your Email</p>
          <input
            className={classNames("c-field", { "validated": formik.values.recipientEmail && !formik.errors.recipientEmail })}
            name="recipientEmail"
            type="email"
            placeholder="user@gmail.com"
            value={formik.values.recipientEmail}
            onChange={formik.handleChange}>
          </input>
          {formik.touched.recipientEmail && formik.errors.recipientEmail ?
            (<p className="c-error">{formik.errors.recipientEmail}</p>) : null}
        </div>
        <label className="c-terms-label">
          <input type="checkbox" className="c-terms-checkbox" checked={formik.values.termsAcknowledgement} name="termsAcknowledgement" onChange={(e) => {
            formik.setFieldValue("termsAcknowledgement", e.target.checked);
            if(e.target.checked) {
              buttonRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }}></input>
          <p className="c-terms-text">
            I am a web developer {" "}
          </p>
        </label>
        <Button variant="contained" ref={buttonRef} color="primary" className="submit-btn" type="submit" disabled={!formik.values.termsAcknowledgement || data.isLoading}>    
          {(data.isLoading) ? (
            <Loader />
          ) : ("Let's send mail!!")}
        </Button>
      </form>
    </div>
  );
}

export default EmailSubmit;