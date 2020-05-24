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
import Tooltip from "@material-ui/core/Tooltip";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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

class Leaderboard extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
            games: null,
            newGameName: null
        };
        this.userToken = localStorage.getItem('token')
    }

    logout() {
        localStorage.removeItem('token');
        this.props.history.push('/login');
    }

    lobby() {
        this.props.history.push('/app/lobby');
    }

    async fetchUsers() {
        try {
            const response = await api.get('/users');

            // Get the returned users and update the state, then sorts them.
            let users = response.data;
            users = users.sort((a,b) =>  b.leaderBoardScore - a.leaderBoardScore)
            this.setState({users: users});
        }
        catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    async componentDidMount() {
        await this.fetchUsers();
        this.userInterval = setInterval(() => this.fetchUsers(), 2500); // Reload the users every 3 seconds
    }

    componentWillUnmount() {
        clearInterval(this.userInterval);
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
                                <Tooltip title="Lobby" placement="bottom">
                                    <Button
                                        color="inherit"
                                        onClick={() => {
                                            this.lobby();
                                        }}
                                    >
                                        Back to Lobby
                                    </Button>
                                </Tooltip>
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
                        <Grid item xs={4}>
                            <Paper className={classes.paper}>
                                <Typography component="h1" variant="h4" align="center">
                                    Leaderboard
                                </Typography>
                                {this.state.users ? (
                                    <TableContainer>
                                        <Table size="small">
                                            <TableBody>
                                                {this.state.users.map(user => {
                                                    return (
                                                        <TableRow key={user.id}>
                                                            <TableCell>
                                                                {user.leaderBoardScore}
                                                            </TableCell>
                                                            <TableCell>
                                                                {user.username}
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

export default withRouter(withStyles(styles)(Leaderboard));
