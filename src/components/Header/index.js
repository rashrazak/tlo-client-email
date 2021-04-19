//Material Ui
import Grid from '@material-ui/core/Grid';
//Image asset

//Scss
import "./Header.scss"

const Header = () =>{

    
    return (
        <>
            <header className="header">
                <div className="header-container">
                    <div className="container" style={{margin:'0 40px'}}>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                            style={{minHeight: "81px"}}
                        >
                            <Grid item>
                                <span style={{position:'absolute',top:'30px',color:'#124A67'}}>Email TLO [GMAIL]</span>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </header>
        </>
        
    )
}

export default Header;