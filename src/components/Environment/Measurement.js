import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const styles = theme => ({
  leftAlign: {
    textAlign: "left"
  },
  container: {
    whiteSpace: "nowrap",
    fontSize: "1.5rem",
    padding: "5px"
  },
  nameContainer: {
    paddingRight: "5px",
    flexFlow: "nowrap"
  },
  icon: {
    color: theme.palette.secondary.dark,
    paddingRight: "5px"
  },
  value: {
    fontFamily: "monospace",
    fontWeight: "bold",
    marginTop: "5px",
    paddingLeft: "5px"
  }
});

const Measurement = props => {
  const { classes, icon, value, alt } = props;
  return (
    <Grid
      item
      container
      className={classes.container}
      justify={"center"}
      alignItems={"center"}
    >
      <Grid
        item
        container
        xs={6}
        alignItems={"center"}
        justify={"flex-end"}
        className={classes.nameContainer}
      >
        <FontAwesomeIcon className={classes.icon} icon={icon} />
        <span>{alt}:</span>
      </Grid>
      <Grid
        item
        container
        xs={6}
        alignItems={"center"}
        className={classNames(classes.leftAlign, classes.value)}
      >
        <span>{value}</span>
      </Grid>
    </Grid>
  );
};

Measurement.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

export default withStyles(styles)(Measurement);
