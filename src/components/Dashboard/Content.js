import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Environment from "../Environment";

const styles = theme => ({
  name: {
    fontSize: "2rem",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)"
  }
});

const Content = classes => (
  <Grid
    item
    container
    direction={"column"}
    alignItems={"center"}
    justify={"center"}
  >
    <Grid
      item
      container
      xs={5}
      justify={"center"}
      className={classes.name}
      style={{
        fontSize: "2rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "6px",
        color: "#fff",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
      }}
    >
      Sahara
    </Grid>
    <Environment />
  </Grid>
);

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Content);
