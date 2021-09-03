import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useHistory } from "react-router-dom";
import * as AuthTypes from "../store/actions/auth_action";
import { server_url } from "../utils/setting";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import "../assets/css/home.css";
import Bg2 from "../assets/img/bg-2.png";
import Bg1 from "../assets/img/bg-1.png";
import Ps1 from "../assets/img/home-people.png";
import LearningMan from "../assets/img/learning-man.png";
import VideoConf from "../assets/img/video-conference.jpg";
import TypingPerson from "../assets/img/typing-person.png";

const styles = {
  howtoContainer: {
    backgroundImage: `url(${Bg2})`,
    height: "550",
    width: "100%",
    paddingLeft: "10%",
    paddingRight: "10%",
  },
};
const theme = createMuiTheme();

// theme.typography.h3 = {
//   fontSize: "12px",
//   "@media (min-width:600px)": {
//     fontSize: "14px",
//   },
//   [theme.breakpoints.up("md")]: {
//     fontSize: "20px",
//   },
// };
export default function HomePage() {
  const history = useHistory();
  if (localStorage.authState === AuthTypes.AUTH_LOGIN_NO_EMAIL_CONFIRM)
    history.push("/auth");
  return (
    <div>
      <Header></Header>
      <section className="sec-home-bg-1">
        <img alt="home-bg-1" className="home-bg-1" src={Bg1} width="100%" />
        <div className="home-bg-content">
          <picture>
            <img alt="person-1" className="home-ps-1" src={Ps1} />
          </picture>
          <div className="home-bg-content-text">
            <h1 className="h1-bg-content">
              Learn foreign language from home with the native speaking teachers
              and friends
            </h1>
          </div>
        </div>
      </section>
      <Box mt={10}>
        <Grid
          container
          xs={12}
          justifyContent="center"
          style={styles.howtoContainer}
        >
          <Grid item xs={12}>
            <Box pt={5} pb={3}>
              <h1 align="center">How it works</h1>
            </Box>
          </Grid>
          <Grid item sm={12} xs={12} lg={4}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
            >
              <img alt="video call" src={VideoConf} width="200" />
              <Box mt={3} p={3}>
                <ThemeProvider theme={theme}>
                  <Typography variant="h5" align="center">
                    Study with the teacher via video call
                  </Typography>
                </ThemeProvider>
              </Box>
            </Grid>
          </Grid>
          <Grid item sm={12} xs={12} lg={4}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
            >
              <img alt="practice with friends" src={LearningMan} width="200" />
              <Box mt={3} p={3}>
                <ThemeProvider theme={theme}>
                  <Typography variant="h5" align="center">
                    Practice your language with the friends
                  </Typography>
                </ThemeProvider>
              </Box>
            </Grid>
          </Grid>
          <Grid item sm={12} xs={12} lg={4}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
            >
              <img alt="practice with friends" src={TypingPerson} width="200" />
              <Box mt={3} p={3}>
                <ThemeProvider theme={theme}>
                  <Typography variant="h5" align="center">
                    Write a story and read the stories written by others
                  </Typography>
                </ThemeProvider>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <div>
        <div style={{ height: 1000 }}></div>
      </div>
      <Footer></Footer>
    </div>
  );
}
