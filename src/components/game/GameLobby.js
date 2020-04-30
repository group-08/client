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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import Slide from '@material-ui/core/Slide';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

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

	logout() {
		localStorage.removeItem('token');
		this.props.history.push('/login');
	}

	async fetchgame() {
		try {
			/*
			const response = await api.get('/users');
			// delays continuous execution of an async operation for 1 second.
			// This is just a fake async call, so that the spinner can be displayed
			// feel free to remove it :)
			await new Promise(resolve => setTimeout(resolve, 1000));

			// Get the returned users and update the state.
			this.setState({ users: response.data });
			 */
			// Mock the games
			let gameID = localStorage.getItem('gameID');
			await new Promise(resolve => setTimeout(resolve, 1000));
			let game = JSON.parse('{"id":1,"name":"Wau-Game","gameMaster":{"id":2,"name":"Player 2"},"players":[{"id":1,"name":"Player 1"},{"id":2,"name":"Player 2"},{"id":3,"name":"Player 3"},{"id":4,"name":"Player 4"}]}');
			this.setState({game: game});
		} catch (error) {
			alert(`Something went wrong while fetching the game: \n${handleError(error)}`);
		}
	}

	async componentDidMount() {
		this.fetchgame();
		this.fetchGameInterval = setInterval(() => this.fetchgame(), 1000); // Grab the game every second
	}

	componentWillUnmount() {
		clearInterval(this.fetchGameInterval);
	}

	async removePlayer (id) {
		alert("Will remove player " + id);
		// and go back to lobby if you removed yourself
		if (localStorage.getItem('userID') == id) {
			this.props.history.push('../lobby');
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
														#
													</TableCell>
													<TableCell>
														Name
													</TableCell>
													<TableCell>
														{this.state.game.gameMaster.id == userID ? `Remove`:`Leave`}
													</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{this.state.game.players.map(player => {
													return (
														<TableRow key={player.id}>
															<TableCell>
																{player.id}
															</TableCell>
															<TableCell>
																{player.name}
															</TableCell>
															<TableCell>
																{player.id == userID || this.state.game.gameMaster.id == userID?
																	(
																		<Button
																			onClick={() => {
																				this.removePlayer(player.id);
																			}}
																		>
																			<CloseIcon />
																		</Button>
																	):(
																		<Button disabled>
																			<CloseIcon />
																		</Button>
																	)
																}
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
									{this.state.game?this.state.game.name:`Loading your game`}
								</Typography>
								{this.state.game ? (
									<>
										<strong>Organsier:</strong> {this.state.game.gameMaster.name} <br />
										<strong>Currenty Players:</strong> {this.state.game.players.length}
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

export default withRouter(withStyles(styles)(GameLobby));
