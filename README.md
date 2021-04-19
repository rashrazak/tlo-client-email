# React APP Email OTP Generator

This is a [React](reactjs.org) + [EmailJS](https://www.emailjs.com/) + [MaterialUI](material-ui.com) + scss + React Context + Validation.

The purpose of this project to build a frontend that can handle 2 email service provider. If the primary service is down,using REST to connect to secondary service. 

#### Why React?
I can develop with React, fast and scalable
#### Why EmailJS?
EmailJS can support frontend environment without wasting time build backend. Can create template from their dashboard site, can integrate with SMTP, Gmail, you name it..
#### Why MaterialUI?
Save time 
#### Why SCSS?
To avoid global naming conflict, easy to read, easy to update. 
#### How State Management?
Using React Hooks useContext, createContext, and designing in Redux way, easy to scale and micro manage.
#### How Validation?
Using Formik and Yup Library. Easy to regex and manage. 
#### How Generate OTP?
Using random generator and send to email. Once email submit, the generator will store in state mgment. System will check if it is same. Else, restart again

## Installation

In the project directory, you need to  run:

#### `npm install (once)` 
#### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.