import React, { useRef } from "react"
import classNames from 'classnames';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import actions from '../../store/redux/actions'
import Loader from "../../components/Loader";
import "./EmailSubmit.scss";

const EmailSubmit = () => {
  const  {setLoading, setData, sendEmail} = actions
  const dispatch = useDispatch()
  const state = useSelector((state) =>state.main)
  const buttonRef = useRef(null);

  const initialValues = (state.mailSent) ? { ...state.mailSent } : {
    recipientEmail: "",
    termsAcknowledgement: false,
  }


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object().shape({
        recipientEmail: yup.string().email("Email must valid").required("Email required"),
    }),
    onSubmit: values => {
        const params = { medium:'ReduxThunk',recipientEmail: values.recipientEmail};
        dispatch(setLoading(true))
        // setStep(state.step+1)
        dispatch(setData(params, 'mailSent'))
        console.log(state)
        dispatch( sendEmail(params, state.step) )
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
        <Button variant="contained" ref={buttonRef} color="primary" className="submit-btn" type="submit" disabled={!formik.values.termsAcknowledgement || state.isLoading}>    
          {(state.isLoading) ? (
            <Loader />
          ) : ("Let's send mail!!")}
        </Button>
      </form>
    </div>
  );
}

export default EmailSubmit;