import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TimezoneSelect from "react-timezone-select";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Notifications, { notify } from "react-notify-toast";
import { server_url } from "../utils/setting";
import LoadingIndicator from "../utils/loading";

import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function PasswordSetting(props) {
  const { setLoading } = props;
  const [values, setValues] = React.useState({
    oldpassword: "",
    password: "",
    repassword: "",
  });
  const handleChangeForm = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const classes = useStyles();

  useEffect(() => {
    // calling for specific rate  http://api.exchangeratesapi.io/v1/latest? access_key = YOUR_ACCESS_KEY & base = GBP & symbols = USD
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("oldpassword", values.oldpassword);
    form_data.append("password", values.password);
    setLoading(true);
    axios
      .post("/school/setting/set/", form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        notify.show("Your profile saved successfully!", "success", 2000);

        localStorage.timezone = response.data.timezone;
        // localStorage.currency = currency;
        setLoading(false);
      })
      .catch((response) => {
        notify.show("Sorry. Unexpected error occured!", "error", 2000);
        setLoading(false);
      });
  };

  return (
    <Box px={3} mt={5}>
      <form className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={0} sm={3}></Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="oldpassword"
              label="Old Password"
              type="password"
              id="oldpassword"
              autoComplete="current-password"
              onChange={handleChangeForm("oldpassword")}
            />
          </Grid>
          <Grid item xs={0} sm={3}></Grid>
          <Grid item xs={0} sm={3}></Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChangeForm("password")}
            />
          </Grid>
          <Grid item xs={0} sm={3}></Grid>
          <Grid item xs={0} sm={3}></Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="repassword"
              label="Confirm Password"
              type="password"
              id="repassword"
              autoComplete="current-password"
              onChange={handleChangeForm("repassword")}
            />
          </Grid>
          <Grid item xs={0} sm={3}></Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            style={{ marginTop: 48, marginBottom: 32 }}
          >
            Save
          </Button>
        </Grid>
      </form>
    </Box>
  );
}
