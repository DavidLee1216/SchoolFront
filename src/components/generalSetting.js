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

const CURRENCY_BASE_URL =
  "http://api.exchangeratesapi.io/v1/latest?access_key=b551e67c701023275ba289e5d8b78d8b";

export default function GeneralSetting(props) {
  const { setLoading } = props;

  const classes = useStyles();
  const [timezone, setTimezone] = useState(
    localStorage.timezone !== undefined
      ? localStorage.timezone
      : Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [currency, setCurrency] = useState(
    localStorage.currency !== "" &&
      localStorage.currency !== null &&
      localStorage.currency !== undefined
      ? localStorage.currency
      : "EUR"
  );
  const [currencyOptions, setCurrencyOptions] = useState([]);

  useEffect(() => {
    fetch(CURRENCY_BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
      });

    // calling for specific rate  http://api.exchangeratesapi.io/v1/latest? access_key = YOUR_ACCESS_KEY & base = GBP & symbols = USD
  }, []);
  useEffect(() => {
    localStorage.timezone = timezone; //
    // alert(timezone.offset);
  }, [timezone]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("timezone", timezone);
    form_data.append("currency", currency);
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
          <Grid item xs={12} sm={4}>
            <div className={classes.title}>Timezone*</div>
          </Grid>
          <Grid item xs={0} sm={2}></Grid>
          <Grid item xs={12} sm={6}>
            <TimezoneSelect value={timezone} onChange={setTimezone} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={classes.title}>Currency*</div>
          </Grid>
          <Grid item xs={0} sm={2}></Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              id="combo-box-currency"
              options={currencyOptions}
              value={currency}
              size="small"
              renderInput={(params) => (
                <TextField {...params} label="" variant="outlined" />
              )}
              onChange={(event, value) => setCurrency(value)}
            />
          </Grid>
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
