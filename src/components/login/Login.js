import React from 'react';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";

import Splash from "../../views/splash/Splash";
import {withSnackbar} from "notistack";

const styles = theme => ({
  closed: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  open: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class Login extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      locked: true
    };
  }
  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end
   * and its token is stored in the localStorage.
   */
  async login() {
    try {
      const requestBody = JSON.stringify({
        email: this.state.email,
        password: this.state.password
      });
      const response = await api.post('/login', requestBody);

      if (response.status === 200) {
        this.props.enqueueSnackbar("Login successful", {
          variant: 'success',
        });
      }

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem('token', user.token);
      localStorage.setItem('userID', user.id);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      this.props.history.push(`/app`);
    } catch (error) {
      if (error.response.status === 401) {
        this.props.enqueueSnackbar(error.response.data.message, {
          variant: 'error',
        });
      }
      else {
        alert(`Something went wrong during the login: \n${handleError(error)}`);
      }
    }
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
   * Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   * You may call setState() immediately in componentDidMount().
   * It will trigger an extra rendering, but it will happen before the browser updates the screen.
   */
  componentDidMount() {
    // Automatically fill email if user just signed up
    if (this.props.location.state && this.props.location.state.email ) {
      this.setState({email: this.props.location.state.email});

    }
  }

  render() {
    const { classes } = this.props;

    return (
        <Splash>
          {this.state.locked?
              <Avatar className={classes.closed}>
                <LockOutlinedIcon />
              </Avatar>
              :
              <Avatar className={classes.open}>
                <LockOpenOutlinedIcon />
              </Avatar>
          }

          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="E-Mail"
                name="E-Mail"
                autoComplete="email"
                value={this.state.email}
                onChange={e => {
                  this.handleInputChange('email', e.target.value);
                }}
            />
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => {
                  this.handleInputChange('password', e.target.value);
                }}
            />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!this.state.email || !this.state.password}
                onClick={() => {
                  this.login();
                }}
            >
              Login
            </Button>
          </form>
          <Grid
              container
              justify="flex-end"
          >
            <Grid item>
              <Link
                  onClick={() => {
                    this.props.history.push(`/signup`);
                  }}
              >
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </Splash>
    )
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(withStyles(styles)(withSnackbar(Login)));
