import React from 'react'
import "./Landing.scss"
import carBG from '../../../../images/carProtect.png'
import LandingForm from './LandingForm'

const Landing = () => {
	return (
		<div>
			<div className="grey-area"></div>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319" ><path fill="#f4f4f4"
				d="M0 256l80-32c80-32 240-96 400-117.3 160-21.7 320 .3 480 32 160 32.3 320 74.3 400 96l80 21.3V0H0z" /></svg>
			<div className="container" style={{ padding: 0 }}>
				<img className="car-protect-img" src={carBG} alt="" />
				<div className="row">
					<div className="col-md-5 col-lg-6">
						<div className="info-div">
							<h4>Be on-the-go with confidence <br />while on the road with  <br /><span>Aspirasi CarProtect</span> by Great Eastern</h4>
							<p>Comprehensive protection plan for yourself and your car, against unforeseen damages due to accidents, thefts, and liabilities of third party.</p>
						</div>
					</div>
				</div>
				<div className="landing-loc">
					<LandingForm />
				</div>
			</div>
		</div>
	)
}

export default Landing;
