import React, { useRef } from "react"
import classNames from 'classnames';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button } from '@material-ui/core';
import Loader from "../../components/Loader";
import "./EmailCheck.scss";
// import { useDispatch, useSelector } from 'react-redux';
// import actions from '../../store/recoil/actions'
import state from '../../store/recoil/atom'
import {useRecoilValue, useResetRecoilState} from 'recoil'


const EmailCheck = () => {
  // const {resetData} = actions
  const resetData = useResetRecoilState(state)
  const data = useRecoilValue(state);
  const buttonRef = useRef(null);

  const initialValues = (data.mailSent) ? { ...data.mailSent } : {
    recipientCode: "",
  }


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object().shape({
        recipientCode: yup.string().matches(/^[0-9]{6}$/, "Please submit 6 generate code").required("Code Required"),
    }),
    onSubmit: values => {
        let code = values.recipientCode;
        if(code != data?.mailCheck.genCode){
            alert('Wrong Code, restart')
            resetData() 
            return false;
        }
        alert('Success, check backend')
        //send data to api //nanti
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
        <Button variant="contained" ref={buttonRef} color="primary" className="submit-btn" type="submit" disabled={data.isLoading}>    
          {(data.isLoading) ? (
            <Loader />
          ) : ("CHECK")}
        </Button>
      </form>
    </div>
  );
}

export default EmailCheck;