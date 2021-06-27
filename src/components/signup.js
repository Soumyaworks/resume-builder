import React, { Component } from "react";
// import { Link } from "react-router-dom";
import firebaseApp from "../firebase";
import { Link, Redirect } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
// import * as ROUTES from "../../constants/routes";
const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
};
const SignUpPage = (props) => {
  const token = localStorage.getItem("token");
  return token ? (
    <Redirect to="/home" />
  ) : (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Sign Up</h1>
      <SignUpForm {...props} />
      <Link to="/login" style={{ textAlign: "center", marginTop: 30 }}>
        Already a User? <br /> Login
      </Link>
    </div>
  );
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();
    firebaseApp.default
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.passwordOne)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("user", user);
        this.setState({ ...INITIAL_STATE });
        this.props.history.push("/login");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({ error: errorMessage });
        console.log("err", error);
      });
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";
    return (
      <form
        onSubmit={this.onSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {" "}
        <TextField
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          variant="outlined"
          placeholder="Full Name"
          style={{ marginBottom: 10, width: "300px" }}
        />
        <TextField
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          variant="outlined"
          placeholder="Email Address"
          style={{ marginBottom: 10, width: "300px" }}
        />
        <TextField
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          variant="outlined"
          placeholder="Password"
          style={{ marginBottom: 10, width: "300px" }}
        />
        <TextField
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          variant="outlined"
          placeholder="Confirm Password"
          style={{ marginBottom: 10, width: "300px" }}
        />
        <Button
          disabled={isInvalid}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default SignUpPage;

export { SignUpForm };
