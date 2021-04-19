import React from 'react';
import classNames from 'classnames';
import './Footer.scss';

const Footer = (props) => {
  return (
    <footer className={classNames({"grey": !(props.step === "landing")})}>
      <div className="container">
        <div className="flex-holder">
          <p className="track-mark">© Rashdanrazak 2021</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;