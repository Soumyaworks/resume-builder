import React, { useContext } from "react";
import Basic from "../components/Left/Basic";
import Right from "../components/Right/Right";
import "./styles.css";
import ResumeContextProvider from "../contexts/ResumeContext";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import myClasses from "./../components/Left/Left.module.css";
import logo from "../../src/assets/Default.PNG";
import thumbn1 from "../../src/assets/templateA.png";
import thumbn2 from "../../src/assets/templateB.PNG";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Footer from "../components/Footer";
import SignUpPage from "../components/signup";
import LoginPage from "../components/login";
import { ResumeContext } from "../contexts/ResumeContext";

function Templates() {
  const useStyles = makeStyles({
    headerLink: {
      color: "#FF8E53 ",
      minWidth: 100,
      marginLeft: 30,
    },
  });

  const classes = useStyles();
  const { updateTemplateType } = useContext(ResumeContext);
  return (
    <div className="left" style={{ position: "relative" }}>
      <div className={myClasses.headerLeft}>
        <Link to="/" style={{ textAlign: "left" }}>
          <img src={logo} alt="logo" className={myClasses.img2} />
        </Link>
      </div>
      <hr className={myClasses.hr2} />
      <h2 className={myClasses.templatesH2}>Templates</h2>
      <div className={myClasses.cards}>
        <div className={myClasses.templateCard}>
          <img src={thumbn1} alt="thumbnail" className={myClasses.imgThumb} />
          <Button
            className={classes.headerLink}
            component={Link}
            onClick={() => updateTemplateType("basic")}
            to="/home/basic/header"
          >
            The Basic
          </Button>
        </div>
        <div className={myClasses.templateCard}>
          <img src={thumbn2} alt="thumbnail" className={myClasses.imgThumb} />
          <Button
            className={classes.headerLink}
            component={Link}
            onClick={() => updateTemplateType("mordern")}
            to="/home/basic/header"
          >
            The Mordern
          </Button>
        </div>
        {/* Placeholder for a second template */}
        {/* <div className={myClasses.templateCard}>
          <img src={thumbn} alt="thumbnail" className={myClasses.imgThumb} />
          <Button
            className={classes.headerLink}
            component={Link}
            to="/basic/header"
          >
            The Stylish
          </Button>
        </div> */}
      </div>
    </div>
  );
}

function PrivateRoute({ element, redirect, ...rest }) {
  const token = localStorage.getItem("token");
  console.log(token);
  return token ? (
    <Route {...rest} component={element} />
  ) : (
    <Redirect to={redirect} />
  );
}

const HomePage = () => {
  return (
    <ResumeContextProvider>
      <div style={{ display: "flex", marginBottom: 60 }}>
        <Switch>
          <Route path="/home" component={Templates} exact />
          <Route path="/home/basic" component={Basic} />
        </Switch>

        <Right />
      </div>
    </ResumeContextProvider>
  );
};

function App() {
  const token = localStorage.getItem("token");
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return token ? <Redirect to="/home" /> : <Redirect to="/login" />;
            }}
          />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <PrivateRoute path="/home" element={HomePage} redirect="/login" />
        </Switch>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
