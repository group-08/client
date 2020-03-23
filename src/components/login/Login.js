import React from 'react';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(/images/splash.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'left center',
  },
  paper: {
    padding: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)'
  },
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
        name: this.state.name
      });
      const response = await api.post('/users', requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem('token', user.token);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      this.props.history.push(`/game`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
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
  componentDidMount() { }

  render() {
    const { classes } = this.props;

    return (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={10} square>
            <div className={classes.paper}>
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
            </div>
          </Grid>
        </Grid>
    )
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(withStyles(styles)(Login));
