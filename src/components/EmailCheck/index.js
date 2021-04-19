import React, { useRef, useContext } from "react"
import classNames from 'classnames';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { StoreContext } from "../../store/context";
import { Button } from '@material-ui/core';
import Loader from "../Loader";
import "./EmailCheck.scss";

const EmailCheck = () => {
  const { state, actions } = useContext(StoreContext);
  const { setData, sendEmail,  setLoading, resetData} = actions;
  const buttonRef = useRef(null);

  const initialValues = (state.mailSent) ? { ...state.mailSent } : {
    recipientCode: "",
  }


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object().shape({
        recipientCode: yup.string().matches(/^[0-9]{6}$/, "Please submit 6 generate code").required("Code Required"),
    }),
    onSubmit: values => {
        const code = values.recipientCode;
        if(code !== state.mailCheck.genCode){
            alert('Wrong Code, restart')
            resetData()
            return false;
        }
        alert('Success')
        resetData()
       
    }
  });

  return (
    <div className="page page-basic-details">
      <form onSubmit={formik.handleSubmit}>
        <div className="c-field-holder">
          <p className="c-field-title">Your Code</p>
          <input
            className={classNames("c-field", { "validated": formik.values.recipientCode && !formik.errors.recipientCode })}
            name="recipientCode"
            type="text"
            placeholder="XXXXXX"
            value={formik.values.recipientCode}
            onChange={formik.handleChange}>
          </input>
          {formik.touched.recipientCode && formik.errors.recipientCode ?
            (<p className="c-error">{formik.errors.recipientCode}</p>) : null}
        </div>
        <br/><br/>
        <Button variant="contained" ref={buttonRef} color="primary" className="submit-btn" type="submit" disabled={state.isLoading}>    
          {(state.isLoading) ? (
            <Loader />
          ) : ("CHECK")}
        </Button>
      </form>
    </div>
  );
}

export default EmailCheck;