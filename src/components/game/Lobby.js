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
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from "@material-ui/core/TableHead";

import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


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
    width: '100%',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
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

class Lobby extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null,
      games: null,
    };
  }

  logout() {
    localStorage.removeItem('token');
    this.props.history.push('/login');
  }

  joinGame(gameID) {
    alert("Will join game " + gameID);
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

      // Mock the games
      await new Promise(resolve => setTimeout(resolve, 1000));
      let games = JSON.parse('[{"id":1,"name":"Wau","players":3},{"id":2,"name":"Wuff","players":2},{"id":3,"name":"Grrrr","players":4},{"id":4,"name":"Wauwau","players":1}]');
      this.setState({games: games});

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
              <Grid
                  justify="space-between"
                  container
              >
                <Grid item>
                  <Typography variant="h6" color="inherit" noWrap>
                    Game
                  </Typography>
                </Grid>
                <Grid item>
                  <Tooltip title="Logout" placement="left">
                    <Button
                        color="inherit"
                        onClick={() => {
                          this.logout();
                        }}
                    >
                      <ExitToAppIcon />
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <main className={classes.layout}>
            <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="flex-start"
                spacing={4}
            >
              <Grid item xs>
                <Paper className={classes.paper}>
                  <Typography component="h1" variant="h4" align="center">
                    Games
                  </Typography>
                  {this.state.games ? (
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                Name
                              </TableCell>
                              <TableCell>
                                Players
                              </TableCell>
                              <TableCell>
                                Join
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {this.state.games.map(game => {
                              return (
                                  <TableRow key={game.id}>
                                    <TableCell>
                                      {game.name}
                                    </TableCell>
                                    <TableCell>
                                      {game.players}
                                    </TableCell>
                                    <TableCell>
                                      {game.players < 4?(
                                          <Button
                                              onClick={() => {
                                                this.joinGame(game.id);
                                              }}
                                          >
                                            <PersonAddIcon />
                                          </Button>
                                      ):(
                                          <Tooltip title="Game is full" placement="right">
                                            <span>
                                            <Button disabled>
                                              <PersonAddIcon />
                                            </Button>
                                            </span>
                                          </Tooltip>
                                      )}
                                    </TableCell>
                                  </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                  ):(
                      <div>
                        <p>Loading games</p>
                        <LinearProgress />
                      </div>

                  ) }
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Typography component="h1" variant="h4" align="center">
                    Users
                  </Typography>
                  {this.state.users ? (
                      <TableContainer>
                        <Table>
                          <TableBody>
                            {this.state.users.map(user => {
                              return (
                                  <TableRow key={user.id}>
                                    <TableCell>
                                      {user.username}
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
                </Paper>
              </Grid>
            </Grid>
          </main>
        </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(Lobby));
