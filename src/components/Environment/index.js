import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-refetch";
import { withStyles, withTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { faThermometerHalf } from "@fortawesome/free-solid-svg-icons";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { faCompressArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import { ENVIRONMENT_URL, SAHARA_SENSORS } from "../../config";
import Measurement from "./Measurement";

const styles = theme => ({
  rightAlign: {
    textAlign: "right"
  },
  loading: {
    color: theme.palette.secondary.dark,
    padding: "10px"
  }
});

export class Environment extends Component {
  state = {
    isLoading: true,
    lastDatetime: null,
    sensors: null,
    environment: null
  };

  componentDidUpdate(prevProps) {
    const { apiFetch } = this.props;
    const { isLoading, lastDatetime, sensors } = this.state;

    if (!isLoading && apiFetch.pending) {
      this.setState({ isLoading: true });
    } else if (isLoading && apiFetch.rejected) {
      throw apiFetch.reason.message;
    } else if (apiFetch.fulfilled) {
      const response = apiFetch.value;

      // Only use the sensors in Sahara
      const officeSensors = Object.keys(response.sensors)
        .filter(key => SAHARA_SENSORS.includes(key))
        .reduce((obj, key) => {
          obj[key] = response.sensors[key];
          return obj;
        }, {});

      // Sum all the values
      const environment = Object.values(officeSensors).reduce(
        (prev, cur) => ({
          TVOC: prev.TVOC + cur.TVOC,
          eCO2: prev.eCO2 + cur.eCO2,
          humidity: prev.humidity + cur.humidity,
          pressure: prev.pressure + cur.pressure,
          temperature: prev.temperature + cur.temperature
        }),
        {
          TVOC: 0,
          eCO2: 0,
          humidity: 0,
          pressure: 0,
          temperature: 0
        }
      );

      // Get the average value of each measurement
      Object.keys(environment).forEach(key => {
        environment[key] =
          Math.round(
            (environment[key] / Object.keys(officeSensors).length) * 100
          ) / 100;
      });

      if (
        JSON.stringify(sensors) !== JSON.stringify(response.sensors) ||
        lastDatetime !== response.last_datetime
      ) {
        const newState = {
          isLoading: false,
          lastDatetime: response.last_datetime,
          sensors: response.sensors,
          environment
        };
        this.setState(newState);
      }
    }
  }
  render() {
    const { classes } = this.props;
    const { isLoading, environment } = this.state;

    return (
      <Grid item container justify={"center"}>
        {isLoading ? (
          <CircularProgress className={classes.loading} size={"4rem"} />
        ) : (
          <Grid item container direction={"column"}>
            <Measurement
              icon={faThermometerHalf}
              value={`${environment.temperature} °C`}
              alt="Temperatur"
            />
            <Measurement
              icon={faCloud}
              value={`${environment.humidity} %`}
              alt="Luftfuktighet"
            />
            <Measurement
              icon={faCompressArrowsAlt}
              value={`${Math.round(environment.pressure) / 100} hPa`}
              alt="Lufttrykk"
            />
          </Grid>
        )}
      </Grid>
    );
  }
}

Environment.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  apiFetch: PropTypes.object.isRequired
};

export default withTheme()(
  withStyles(styles)(
    connect(props => ({
      apiFetch: {
        method: "GET",
        mode: "cors",
        url: ENVIRONMENT_URL,
        refreshInterval: 5000
      }
    }))(Environment)
  )
);
