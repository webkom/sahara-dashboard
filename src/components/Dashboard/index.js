import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBeer } from "@fortawesome/free-solid-svg-icons";
import ErrorBoundary from "../ErrorBoundary";
import Header from "./Header";
import Content from "./Content";
import Snackbar, { notify } from "./Snackbar";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: "center",
    background: theme.palette.primary.light,
    color: theme.palette.text.secondary
  },
  beerIcon: {
    color: theme.palette.secondary.dark
  },
  madeByLove: {
    textAlign: "center",
    color: theme.palette.primary.light,
    fontWeight: "bold",
    letterSpacing: 3,
    marginBottom: 0
  }
});

export class DashboardGrid extends Component {
  handleError(errorMessage) {
    notify(errorMessage, "error");
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <ErrorBoundary onError={this.handleError.bind(this)}>
              <Header />
              <Paper className={classes.paper} square>
                <Content />
                <Snackbar />
              </Paper>
              <p className={classes.madeByLove}>
                laget med{" "}
                <FontAwesomeIcon className={classes.beerIcon} icon={faBeer} />{" "}
                av{" "}
                <a href="https://github.com/webkom/sahara-dashboard">webkom</a>
              </p>
            </ErrorBoundary>
          </Grid>
        </Grid>
      </div>
    );
  }
}

DashboardGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DashboardGrid);
