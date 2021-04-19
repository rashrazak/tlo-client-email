import React, { useContext, useEffect } from 'react'
import StoreProvider, { StoreContext } from "./store/context"
// import Landing from './Landing'
import Header from './components/Header'
import { createMuiTheme } from '@material-ui/core';
import Footer from './components/Footer2';
import "./App.scss"

import { ThemeProvider } from '@material-ui/core/styles';
import Landing from './components/Landing';


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
	const { state, actions } = useContext(StoreContext);

	return (
		<StoreProvider>
			<StoreContext.Consumer>
				{({ state }) => (
					<ThemeProvider theme={defaultMaterialTheme}>
							<Header />
								<Landing />
							<Footer/>
					</ThemeProvider>
				)}
			</StoreContext.Consumer>
		</StoreProvider>
	)
}

export default App;