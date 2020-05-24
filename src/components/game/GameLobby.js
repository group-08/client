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
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CloseIcon from '@material-ui/icons/Close';
import {getDomain} from "../../helpers/getDomain";
import {withSnackbar} from "notistack";

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

class GameLobby extends React.Component {
	constructor() {
		super();
		this.state = {
			game: null
		};
	}

	async logout() {
		// Remove the player from the game as well
		await this.removePlayer(localStorage.getItem('userID'));

		localStorage.removeItem('token');
		this.props.history.push('/login');
	}

	async fetchgame() {
		const auth = {
			baseURL: getDomain(),
			headers: {
				'Content-Type': 'application/json',
				'X-Token': localStorage.getItem('token')
			}
		};
		try {
			let gameID = localStorage.getItem('gameID');

			const response = await api.get('/lobby/' + gameID, auth);

			let game = response.data;

			let userId = localStorage.getItem('userID');
			let myPlayer = game.players.find(player => player.user && player.user.id == userId);
			if (!myPlayer) {
				this.props.history.push('../lobby');
				clearInterval(this.fetchGameInterval);
			}
			this.setState({game: game});
		} catch (error) {
			if (error.response.status === 404) {
				this.props.history.push('../lobby');
				clearInterval(this.fetchGameInterval);
			} else {
				alert(`Something went wrong while fetching the game: \n${handleError(error)}`);
			}
		}
	}

	async componentDidMount() {
		this.fetchgame();
		this.fetchGameInterval = setInterval(() => this.fetchgame(), 1000); // Grab the game every second
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		// Game State changes from pending to running
		if (this.state.game !== prevState.game &&
			prevState.game &&
			this.state.game.gameState !== prevState.game.gameState &&
			this.state.game.gameState == "RUNNING") {

			this.props.enqueueSnackbar('Your Game has started.', {
				variant: 'info',
			});
			this.props.history.push('../game');
		}
	}

	componentWillUnmount() {
		clearInterval(this.fetchGameInterval);
	}

	async removePlayer (id) {
		let gameID = localStorage.getItem('gameID');
		const auth = {
			baseURL: getDomain(),
			headers: {
				'Content-Type': 'application/json',
				'X-Token': localStorage.getItem('token')
			}
		};
		try {
			await api.delete('/lobby/' + gameID + '/user/' + id, auth);
		} catch (error) {
			alert(`Something went wrong while removing player: \n${handleError(error)}`);
		}
	}

	async startGame() {
		let gameID = localStorage.getItem('gameID');
		const auth = {
			baseURL: getDomain(),
			headers: {
				'Content-Type': 'application/json',
				'X-Token': localStorage.getItem('token')
			}
		};
		try {
			const response = await api.post('/lobby/' + gameID + '/start', {}, auth);
			console.log(response.data);
			this.setState({games: response.data});
		} catch (error) {
			alert(`Something went wrong while starting the game: \n${handleError(error)}`);
		}
	}

	async deleteLobby() {
		let gameID = localStorage.getItem('gameID');
		const auth = {
			baseURL: getDomain(),
			headers: {
				'Content-Type': 'application/json',
				'X-Token': localStorage.getItem('token')
			}
		};
		try {
			const response = await api.delete('/lobby/' + gameID,  auth);
			console.log(response.data);

		} catch (error) {
			alert(`Something went wrong while removing the lobby: \n${handleError(error)}`)
		}
	}

	render() {
		const { classes } = this.props;
		const userID = localStorage.getItem('userID');

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
									{this.state.game?this.state.game.name:`Game`}
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
									{this.state.game?(
										<>
											Your game
										</>
									):`Loading your game`}
								</Typography>
								{this.state.game ? (
									<TableContainer>
										<Table size="small">
											<TableHead>
												<TableRow>
													<TableCell>
														Name
													</TableCell>
													<TableCell>
														{this.state.game.host.id == userID ? `Remove`:`Leave`}
													</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{this.state.game.players.map(player => {
													return (player.user?(
															<TableRow key={player.id}>
																<TableCell>
																	{player.user.username}
																</TableCell>
																<TableCell>
																	{player.user.id == userID && this.state.game.host.id != userID ||
																	this.state.game.host.id == userID && player.user.id != userID?
																		(
																			<Button
																				onClick={() => {
																					this.removePlayer(player.user.id);
																				}}
																			>
																				<CloseIcon />
																			</Button>
																		):(
																			this.state.game.host.id == userID?
																				<Button
																					onClick={() => {
																						this.deleteLobby();
																					}}
																				>
																					<ExitToAppIcon />
																				</Button>:
																			<Button disabled>
																				<CloseIcon />
																			</Button>
																		)
																	}
																</TableCell>
															</TableRow>
														):''
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
									{this.state.game?this.state.game.name:`Loading your game`}
								</Typography>
								{this.state.game ? (
									<>
										<strong>Organsier:</strong> {this.state.game.host.username} <br />
										<strong>Number of Players:</strong> {this.state.game.players.length}
										{this.state.game.host.id == userID ?
											(
												<>
													<Divider />
													<Button
														onClick={() => {
															this.startGame();
														}}
													>
														Start Game
													</Button>
												</>
											):``
										}

									</>
								):(
									<div>
										<p>Loading game</p>
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

export default withRouter(withStyles(styles)(withSnackbar(GameLobby)));
