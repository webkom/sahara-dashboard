import React from "react";
import PropTypes from "prop-types";
import { withStyles, withTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
// import lightLogo from 'app/static/abakus_logo_black_webkom.png';
import darkLogo from "../../static/abakus_logo_white_webkom.png";

const styles = theme => ({
  toolbar: {
    flex: "1 1 auto",
    textAlign: "center",
    padding: 20,
    fontSize: "2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem"
    }
  },
  logo: {
    height: "50px"
  }
});

const Header = ({ classes, theme }) => (
  <div>
    <AppBar position="static">
      <Grid container spacing={0} className={classes.toolbar}>
        <Grid item xs={12}>
          <img
            alt="Abakus Linjeforening"
            className={classes.logo}
            src={darkLogo}
          />
        </Grid>
      </Grid>
    </AppBar>
  </div>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withTheme()(withStyles(styles)(Header));
