import React from 'react';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";
import zxcvbn from 'zxcvbn';

import Splash from "../../views/splash/Splash";
import LinearProgress from "@material-ui/core/LinearProgress";
import {withSnackbar} from "notistack";

const styles = theme => ({
	complete: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.success.main,
	},
	hi: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
	noMargin: {
  	    margin: 0
	}
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
class SignUp extends React.Component {
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
	    username: null,
	    password: null,
        passwordStrength: null
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
            username: this.state.username,
            password: this.state.password
        });
        const response = await api.post('/signup', requestBody);

        if (response.status == 201) {
	        this.props.enqueueSnackbar('User has been created.', {
		        variant: 'success',
	        });
        }

        // Get the returned user and update a new object.
        const user = new User(response.data);

        // Store the token into the local storage.
        let userEmail = user.email;

        // Login successfully worked --> navigate to the route /game in the GameRouter
        this.props.history.push(`/login`, {email: userEmail});
        }

        catch (error) {
    	    if (error.response.status == 409) {
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
        this.setState({[key]: value});

        // Password strength indicator
        if (key === 'password') {
            if (value) {
                this.setState({passwordStrength: zxcvbn(value)});
            } else {
                this.setState({passwordStrength: null});
            }

        }
    }

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
   * Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   * You may call setState() immediately in componentDidMount().
   * It will trigger an extra rendering, but it will happen before the browser updates the screen.
   */
  componentDidMount() { }

  render() {
    const { classes } = this.props;

    return (
        <Splash>
          {!this.state.username || !this.state.password || !this.state.email ?
              <Avatar className={classes.hi}>
                <EmojiPeopleIcon />
              </Avatar>
              :
              <Avatar className={classes.complete}>
                <EmojiPeopleIcon />
              </Avatar>
          }

          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="E-Mail"
                name="email"
                type="email"
                autoComplete="email"
                onChange={e => {
                  this.handleInputChange('email', e.target.value);
                }}
            />
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={e => {
                  this.handleInputChange('username', e.target.value);
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
                onChange={e => {
                  this.handleInputChange('password', e.target.value);
                }}
            />
              {this.state.passwordStrength ?
                  <>
                    <LinearProgress
                        variant="determinate"
                        value={this.state.passwordStrength.score / 4 * 100}
                    />
	                  {this.state.passwordStrength.feedback.warning ?
		                  <Typography variant="caption">
			                  {this.state.passwordStrength.feedback.warning}
			                  {this.state.passwordStrength.feedback.suggestions ?
				                  <ul className={classes.noMargin}>
					                  {this.state.passwordStrength.feedback.suggestions.map((value, index) => {
					                  	return <li key={index}>{value}</li>
					                  })}
				                  </ul>: ''
			                  }
		                  </Typography> : ''
	                  }
                      {/*
                        <PasswordStrength
                      pwdStrength={this.state.passwordStrength.score}
                  >

                          `${this.state.passwordStrength.feedback.warning}. ` :
                          ``
                      }
                      {this.state.passwordStrength.feedback.suggestions ?
                          <PasswordList>
                              {this.state.passwordStrength.feedback.suggestions.map((value, index) => {
                                  return <PasswordItem key={index}>{value}</PasswordItem>
                              })}
                          </PasswordList> :
                          ``
                      }
                      {this.state.passwordStrength.score >= 3 ? `This password is pretty secure.` : ``}
                  </PasswordStrength>
                      */}
                  </>: ''
              }
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!this.state.username || !this.state.password || !this.state.email}
                onClick={() => {
                  this.login();
                }}
            >
              Sign Up
            </Button>
          </form>
          <Grid
              container
          >
            <Grid item>
              <Link
                  onClick={() => {
                    this.props.history.push(`/login`);
                  }}
              >
                Login
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
export default withRouter(withStyles(styles)(withSnackbar(SignUp)));
