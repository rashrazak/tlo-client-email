import React, { useRef } from "react"
import classNames from 'classnames';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button } from '@material-ui/core';
import Loader from "../../components/Loader";
import "./EmailCheck.scss";
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../store/redux/actions'


const EmailCheck = () => {
  const {resetData} = actions
  const dispatch = useDispatch()
  const state = useSelector((state) =>state.main)
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
        let code = values.recipientCode;
        if(code != state?.mailCheck.genCode){
            alert('Wrong Code, restart')
            dispatch(resetData() )
            return false;
        }
        alert('Success, check backend')
        //send data to api //nanti
        dispatch(resetData() )
       
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