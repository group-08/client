import React from 'react';
import { api, handleError } from '../../helpers/api';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    height: '100vh',
  },
  appBar: {
    position: 'relative',
    height: 'min-content',
    backgroundColor: theme.palette.primary.main,
    color: 'white'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  logoutButton: {
    width: "100%",
    marginTop: theme.spacing(2)
  },
});

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null
    };
  }

  logout() {
    localStorage.removeItem('token');
    this.props.history.push('/login');
  }

  async componentDidMount() {
    try {
      const response = await api.get('/users');
      // delays continuous execution of an async operation for 1 second.
      // This is just a fake async call, so that the spinner can be displayed
      // feel free to remove it :)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get the returned users and update the state.
      this.setState({ users: response.data });

      // This is just some data for you to see what is available.
      // Feel free to remove it.
      console.log('request to:', response.request.responseURL);
      console.log('status code:', response.status);
      console.log('status text:', response.statusText);
      console.log('requested data:', response.data);

      // See here to get more data.
      console.log(response);
    } catch (error) {
      alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
  }

  render() {
    const { classes } = this.props;

    return (
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
          <AppBar position="absolute" color="default" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                Game
              </Typography>
            </Toolbar>
          </AppBar>
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="center">
                Welcome
              </Typography>
              {this.state.users ? (
                  <TableContainer>
                    <Table>
                      <TableBody>
                        {this.state.users.map(user => {
                          return (
                              <TableRow key={user.id}>
                                <TableCell>
                                  {user.id}
                                </TableCell>
                                <TableCell>
                                  {user.username}
                                </TableCell>
                                <TableCell>
                                  {user.email}
                                </TableCell>
                                <TableCell>
                                  {user.status}
                                </TableCell>
                              </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
              ):(
                  <div>
                    <p>Loading users</p>
                    <LinearProgress />
                  </div>

              ) }
              <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  className={classes.logoutButton}
                  onClick={() => {
                    this.logout();
                  }}
              >
                Logout
              </Button>
            </Paper>
          </main>
        </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(Game));
