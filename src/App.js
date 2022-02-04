import React, { useContext, useEffect } from 'react'
// import Landing from './Landing'
import Header from './components/Header'
import { createMuiTheme } from '@material-ui/core';
import Footer from './components/Footer2';
import "./App.scss"

import { ThemeProvider } from '@material-ui/core/styles';
import {Routes, BrowserRouter as Router, Route, Link} from "react-router-dom"
import ContextMain from './components/ContextMain';
import ReduxMain from './store/redux/ReduxMain'
import RecoilMain from './store/recoil/RecoilMain'

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#D80012",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#f7a81e",
    }
  },
  overrides: {
    MuiPickersDay: {
      daySelected: {
        backgroundColor: "#f7a81e",
        '&:hover': {
          backgroundColor: "#f7a81e",
        },
      },
    }
  }
});





const App = () => {
	return (
      <ThemeProvider theme={defaultMaterialTheme}>
        <Header />
          <Router>
            <Routes>
              <Route path="/" exact  element={
                <>
                  <ul>
                    <li><Link to="/context">useContext</Link></li>
                    <li><Link to="/redux">REDUX-THUNK</Link></li>
                    <li><Link to="/recoil">RECOIL</Link></li>
                  </ul>
                </>
              }/>
              <Route path="/context"  element={<ContextMain/>}/>
              <Route path="/redux"  element={<ReduxMain/>}/>
              <Route path="/recoil"  element={<RecoilMain/>}/>
            </Routes>
          </Router>
        <Footer/>
      </ThemeProvider>
	)
}

export default App;