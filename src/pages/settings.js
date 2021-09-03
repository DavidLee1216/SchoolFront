import React, { useState, useEffect, useRef } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useHistory } from "react-router-dom";
import * as AuthTypes from "../store/actions/auth_action";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TimezoneSelect from "react-timezone-select";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import { connect } from "react-redux";
import { languages } from "../utils/languages";
import { languageProficiency } from "../utils/langLevel";
import Notifications, { notify } from "react-notify-toast";
import { server_url } from "../utils/setting";
import LoadingIndicator from "../utils/loading";
import { StylesProvider } from "@material-ui/core/styles";
import "../assets/css/settings.css";
import GeneralSetting from "../components/generalSetting";
import PasswordSetting from "../components/passwordSetting";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  Dropdown: {
    backgroundColor: "white",
    marginBottom: theme.spacing(1),
    fontSize: "1rem",
  },
}));

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function SettingPage(props) {
  const [loading, setLoading] = useState(false);
  //   const [timezone, setTimezone] = useState(
  //     localStorage.timezone !== ""
  //       ? localStorage.timezone
  //       : Intl.DateTimeFormat().resolvedOptions().timeZone
  //   );
  const classes = useStyles();
  const bodyElem = useRef();

  const theme = createMuiTheme({
    typography: {
      fontFamily: "Oswald", //["Chilanka", "cursive"].join(","),
    },
  });

  const [settingItem, setSettingItem] = useState(0);

  const onChangeSettingItem = (item) => (e) => {
    setSettingItem(item);
  };

  return (
    <div ref={bodyElem}>
      <Header></Header>
      <Notifications />
      {loading && <LoadingIndicator />}
      <Box style={{ backgroundColor: "#f2f2f2" }}>
        <Box py={8}>
          <Container component="main" maxWidth="md">
            <StylesProvider injectFirst>
              <CssBaseline />
              <Paper elevation={2}>
                <div
                  className={classes.paper}
                  style={{ backgroundColor: "white" }}
                >
                  <ThemeProvider theme={theme}>
                    <Typography
                      variant="h3"
                      style={{ textAlign: "left", marginLeft: 30 }}
                      gutterBottom
                    >
                      Settings
                    </Typography>
                  </ThemeProvider>
                  <ul class="nav">
                    <li class="nav-item" onClick={onChangeSettingItem(0)}>
                      General
                    </li>
                    <li class="nav-item" onClick={onChangeSettingItem(1)}>
                      Password
                    </li>
                    <li class="nav-item" onClick={onChangeSettingItem(2)}>
                      Payment
                    </li>
                    <li class="nav-item" onClick={onChangeSettingItem(3)}>
                      Notification
                    </li>
                  </ul>
                  {settingItem === 0 ? (
                    <GeneralSetting setLoading={setLoading}></GeneralSetting>
                  ) : settingItem === 1 ? (
                    <PasswordSetting setLoading={setLoading}></PasswordSetting>
                  ) : (
                    <div></div>
                  )}
                </div>
              </Paper>
            </StylesProvider>
          </Container>
        </Box>
      </Box>
      <div>
        <div style={{ height: 500, backgroundColor: "#f2f2f2" }}></div>
      </div>
      <Footer></Footer>
    </div>
  );
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(SettingPage);
