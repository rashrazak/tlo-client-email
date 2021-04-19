import React, { useRef, useContext } from 'react'
import classNames from 'classnames';
import { useFormik } from 'formik';
import { StoreContext } from "../../store/context";
import { Button, MenuItem, Select, InputBase } from '@material-ui/core';
import * as yup from 'yup';
import './LandingForm.scss'
import Loader from "../../components/Loader";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import moment from 'moment';
import ReactGA from 'react-ga';


function LandingForm() {

    const { state, actions } = useContext(StoreContext);
    const { setData, setLoading, postLandingForm  } = actions;
    const buttonRef = useRef(null);

    const initialValues = (state.landingForm) ? { ...state.landingForm } : {
        plate: "",
        postcode: "",
        email: "",
        confirmEmail: "",
        identificationType:"nric",
        identification:"",
        termsAcknowledgement: false,
    }
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object().shape({
        plate: yup.string().matches(/^[ -~]*$/, "Please provide vehicle registration number").required('Vehicle Registration Number is a required field'),
        email: yup.string().email("Invalid email format").required("Email is a required field"),
        postcode: yup.string().matches(/^[0-9]{5}$/, "Invalid Postcode Format").required("Postcode is a required field"),
        identificationType: yup.string(),
        identification: yup.string().when('identificationType', (identificationType, schema) => {
            if (identificationType === 'nric'){
              return schema.matches(/^\d{6}-\d{2}-\d{4}$/, 'NRIC formats require 000000-00-0000').test("validate-nric", "Invalid NRIC", value => {
                  if(value) {
                  const nric = value;
                  const dob = nric?.split("-")[0]?.substring(0, 6);
                  const momentDate = moment(dob, "YYMMDD");
                  return momentDate.isValid();
                  } else {
                  return false;
                  }
              
              }).required('NRIC No. is a required field');
            }
        
            if (identificationType === 'passport'){
            return schema.required('Passport No. is a required field');
            }
        
            if (identificationType === 'policeOrArmy'){
            return schema.required('Police/Army No. is a required field');
            }
        
            return schema.required('NRIC/Passport/Police/Army No. is a required field');
        }),
    }),
        onSubmit: values => {
          console.log(values)
          ReactGA.event({category: "Aspirasi CarProtect", action: 'Get Started'});
          const params = {
            vehicleRegistrationNumber: values.plate,
            identificationType : values.identificationType,
            identification: values.identification,
            postCode: values.postcode,
            email: values.email
          }
          setData({ landingForm: params })
          setLoading(true)
          postLandingForm(params)
        }
    });

    const onIdentificationTypeChange = event => {
        formik.setFieldValue("identification", "");
        formik.setFieldValue(event.target.name, event.target.value);
    }

    
    return (
        <div className="landing-form">
            <h3>Let’s Get You Started</h3>
            <form onSubmit={formik.handleSubmit}>
            <div className="c-field-holder">
            <p className="c-field-title">Vehicle Registration Number</p>
            <input
                name="plate"
                className={classNames("c-field", { "validated": formik.values.plate && !formik.errors.plate })}
                placeholder="e.g. MBT999B"
                value={formik.values.plate}
                onChange={formik.handleChange}>
            </input>
            {formik.touched.plate && formik.errors.plate ?
                (<p className="c-error">{formik.errors.plate}</p>) : null}
            </div>
            <div className="c-field-holder">
                    <p className="c-field-title">Identification Number</p>
                    <div className="c-flex-holder-row">
                      <div className="c-col-field-holder-short">
                        <Select
                          onChange={onIdentificationTypeChange}
                          value={formik.values.identificationType}
                          name="identificationType"
                          input={<InputBase className="c-select-input"/>}>
                          <MenuItem value="nric">NRIC</MenuItem>
                          <MenuItem value="passport">Passport No.</MenuItem>
                          <MenuItem value="policeOrArmy">Police/Army No.</MenuItem>
                        </Select>
                        {formik.touched.identificationType && formik.errors.identificationType ? 
                          (<p className="c-error">{formik.errors.identificationType}</p>) : null}
                      </div>
                      <div className="c-col-field-holder">
                        <input 
                          autoComplete="new-password" 
                          className={classNames("c-field", {"validated": formik.values.identification && !formik.errors.identification})}
                          name="identification" 
                          placeholder={formik.values.identificationType === "nric" ? "123456-78-9012" : "e.g. 123456789012"}
                          value={formik.values.identification}
                          onChange={formik.handleChange}>
                        </input>      
                      </div>
                    </div>
                    {formik.touched.identification && formik.errors.identification ? 
                      (<p className="c-error">{formik.errors.identification}</p>) : null}
                  </div>
            <div className="c-field-holder">
                <p className="c-field-title">Postcode (Vehicle Location) <InfoOutlinedIcon fontSize="small" style={{color:"#D80012"}}/></p>
                <input
                    className={classNames("c-field", { "validated": formik.values.postcode && !formik.errors.postcode })}
                    name="postcode"
                    type="number"
                    placeholder="e.g. 90008"
                    value={formik.values.postcode}
                    onChange={formik.handleChange}>
                </input>
                {formik.touched.postcode && formik.errors.postcode ?
                    (<p className="c-error">{formik.errors.postcode}</p>) : null}
            </div>
            <div className="c-field-holder">
                <p className="c-field-title">Email</p>
                <input
                    className={classNames("c-field", { "validated": formik.values.email && !formik.errors.email })}
                    name="email"
                    type="email"
                    placeholder="username@email.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}>
                </input>
                {formik.touched.email && formik.errors.email ?
                    (<p className="c-error">{formik.errors.email}</p>) : null}
            </div>
            <label className="c-terms-label">
            <input type="checkbox" className="c-terms-checkbox" checked={formik.values.termsAcknowledgement} name="termsAcknowledgement" onChange={(e) => {
                formik.setFieldValue("termsAcknowledgement", e.target.checked);
                if(e.target.checked) {
                buttonRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            }}></input>
            <p className="c-terms-text">
                By proceeding, you agree to our{" "}
                <a href="#" target="_blank" rel="noopener noreferrer">Privacy Policy</a>{" "}
                and {" "}
                <a href="#" target="_blank" rel="noopener noreferrer">Terms of Use.</a>
            </p>
            </label>
            <Button variant="contained" ref={buttonRef} color="primary" className="submit-btn" type="submit" disabled={!formik.values.termsAcknowledgement || state.isLoading}>    
            {(state.isLoading) ? (
                <Loader />
            ) : ("GET MY QUOTE NOW")}
            </Button>
      </form>
        </div>
    )
}

export default LandingForm
