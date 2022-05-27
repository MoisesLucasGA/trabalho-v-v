import {
    AppBar, Typography,
} from "@material-ui/core";
import { useStyles } from "./BarApp.styles";

const BarApp = () => {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Typography variant="h5" style={{ marginTop: '10px', color:"#fff" , fontWeight: 700}} align="center">Clinica ACME</Typography>
        </AppBar>
    )

}

export default BarApp

