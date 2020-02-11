import React, { useState, useEffect } from "react";
import Logo from "../assets/images/teeny_logo.png";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import classnames from "classnames";
import { loginUser } from "../../utils/API";
import { Link, withRouter } from "react-router-dom";
import history from "../../utils/history";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userAuth, setUserauth] = useState({ success: false, token: "" });
  const [isValid, setIsvalid] = useState("");
  const [errors, setErrors] = useState({});

  //function opens modal.
  const handleOpen = () => {
    setOpen(true);
  };

  //function closes modal.
  const handleClose = () => {
    setOpen(false);
  };

  //open modal from sign up component.
  useEffect(() => {
    if (props.openModal) {
      handleOpen();
    }
  }, []);

  //use local storage to store token on successful log in.
  //** The conditional statement prevents this hook from overwriting cached token!
  useEffect(() => {
    if (userAuth.token !== "") {
      localStorage.setItem("tokenKey", userAuth.token);
    }
  }, [userAuth.token]);

  useEffect(() => {
    //use this hook to console log check validation status
  }, [isValid]);

  useEffect(() => {
    //use this hook to console log errors
  }, [errors]);

  const handleOnChange = event => {
    const {
      target: { name, value }
    } = event;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const credentials = { email: email, password: password };
    logUser(credentials);
  };

  //logs in users with correct credentials or displays validation errors.
  const logUser = userInput => {
    loginUser(userInput)
      .then(response => {
        if (response.data.success) {
          //set token on successful log in.
          setUserauth(response.data);
          //clear errors on successfull log in
          setErrors({});
          //On successful login, go to user's account
          if (history.location.pathname === "/myaccount") {
            window.location.reload(false);
          } else {
            history.push("/myaccount");
          }
          //close the login modal
          handleClose();
        } else if (response.data.email === "User not found") {
          //update error and isValid state variables when user wasn't found in the database
          setErrors(response.data);
          setIsvalid(false);
        } else if (response.data.password === "Password is incorrect") {
          //update error and isValid state variables when user entered wrong password.
          setErrors(response.data);
          setIsvalid(false);
        }
      })
      .catch(err => {
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
        setIsvalid(err.response.data.isValid);
      });
  };

  return (
    <div>
      <button className="waves-effect waves-teal btn-flat" onClick={handleOpen}>
        Login
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        //BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <img src={Logo} className="responsive-img" alt="Logo" />
            <h2 id="transition-modal-title">User Login</h2>
            <p id="transition-modal-description">Please log in below.</p>
            <form>
              <div className="input-group mb-3">
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fas fa-user" />
                  </span>
                </div>
                <input
                  type="text"
                  name="email"
                  onChange={handleOnChange}
                  className={classnames("form-control input_user", {
                    validate: errors.password
                  })}
                  id="emailInput"
                  placeholder="Username"
                />
                {errors.email && (
                  <span
                    className="helper-text red-text"
                    data-error={errors.email}
                  >
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="input-group mb-2">
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fas fa-key" />
                  </span>
                </div>
                <input
                  type="password"
                  name="password"
                  onChange={handleOnChange}
                  className={classnames("form-control input_pass", {
                    validate: errors.password
                  })}
                  id="passwordInput"
                  placeholder="Password"
                />
                {errors.password && (
                  <span
                    className="helper-text red-text"
                    data-error={errors.password}
                  >
                    {errors.password}
                  </span>
                )}
              </div>
              <button
                onClick={handleFormSubmit}
                type="button"
                name="button"
                id="loginButton"
                className="btn
                login_btn"
              >
                {" "}
                Login
              </button>
            </form>
            <div className="d-flex justify-content-center links">
              Don't have an account?{" "}
              <Link to="/signup" className="m1-2" onClick={handleClose}>
                Sign Up!
              </Link>
            </div>
            <div className="d-flex justify-content-center links">
              {/* <a href="#">Forgot your password?</a> */}
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default withRouter(TransitionsModal);
