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
import TableHead from "@material-ui/core/TableHead";

import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import {getDomain} from "../../helpers/getDomain";

import { withSnackbar } from 'notistack';

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
			newGameName: null
		};
		this.userToken = localStorage.getItem('token')
	}

	logout() {
		localStorage.removeItem('token');
		this.props.history.push('/login');
	}

	joinGame(gameID) {
		localStorage.setItem('gameID', gameID);
		alert("Will join game " + gameID);
		// TODO: Use the API to join the game
		this.props.history.push('game/lobby');
	}

	async fetchUsers() {
		try {
			const response = await api.get('/users');

			// Get the returned users and update the state.
			this.setState({users: response.data});
		}
		catch (error) {
			alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
		}
	}

	async fetchGames() {
		const auth = {
			baseURL: getDomain(),
			headers: {
				'Content-Type': 'application/json',
				'X-Token': this.userToken
			}
		}
		try {
			const response = await api.get('/lobbies', auth);
			console.log(response.data);
			this.setState({games: response.data});
		} catch (error) {
			alert(`Something went wrong while fetching the games: \n${handleError(error)}`);
		}
	}

	async createGame() {
		const auth = {
			baseURL: getDomain(),
			headers: {
				'Content-Type': 'application/json',
				'X-Token': this.userToken
			}
		}
		const requestBody = JSON.stringify({
			name: this.state.newGameName
		});
		const response = await api.post('/lobbies', requestBody, auth);
		localStorage.setItem('gameID', response.data.id);
		this.props.history.push('game/lobby');
	}

	async componentDidMount() {
		await this.fetchUsers();
		await this.fetchGames()
		this.userInterval = setInterval(() => this.fetchUsers(), 2500); // Reload the users every 3 seconds
		this.gamesInterval = setInterval(() => this.fetchGames(), 1000); // Reload the games every 3 seconds
	}

	componentWillUnmount() {
		clearInterval(this.userInterval);
		clearInterval(this.gamesInterval);
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
									<>
										{this.state.games.length > 0 ? (
											<TableContainer>
												<Table size="small">
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
																		{game.players.length}
																	</TableCell>
																	<TableCell>
																		{game.players.length < 4?(
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
											<>
											<Typography variant="body1" component="p" gutterBottom>
												There are no games, but you can create one.
											</Typography>
											<Divider />
											</>
										)}
										<form>
											<FormControl fullWidth gutterTop>
												<InputLabel htmlFor="GameName">Name of your Game</InputLabel>
												<Input
													id="GameName"
													label="Name of your game"
													onChange={e => {
														this.setState({newGameName: e.target.value})
													}}
													endAdornment={
														<InputAdornment position="end">
															<IconButton
																aria-label="Create Room"
																onClick={() => {
																	this.createGame();
																}}
															>
																<AddCircleIcon />
															</IconButton>
														</InputAdornment>
													}
												/>
											</FormControl>
										</form>
									</>
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
										<Table size="small">
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
