import React from 'react';
import {api, handleError} from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';

import {getDomain} from "../../helpers/getDomain";

import Card from "./cards/Card";

import styled from 'styled-components';
import _ from 'lodash';

import mapPic from './boardBackground.jpeg'

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";

import Avatars from '@dicebear/avatars';
import avataars from '@dicebear/avatars-avataaars-sprites';
import bottts from '@dicebear/avatars-bottts-sprites';

import ReactAnimatedWeather from 'react-animated-weather';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import City from "./Cities/Cities";

import puddle from "./illustrations/puddle.png";
import wind from "./illustrations/wind.png";

import back from "./cards/illustrations/Back.svg";
import backRotated from "./cards/illustrations/BackRotated.svg";


const Map = styled.div`
	background-image: url(${mapPic});
    width: 100%;
    height: 100%;
    transform: rotate(${props => props.rotation}deg);
    border-radius: 4px;
`;

const PartnerCard = styled.div`
	border: 1px solid black;
	width: 51px;
	height: 72px;
	border-radius: 3px;
	display: inline-block;
	vertical-align: center;
	background-image:    url(${back});
    background-size:     cover;
    background-repeat:   no-repeat;
    background-position: center center;
`;

const OpponentCard = styled.div`
	border: 1px solid black;
	width: 72px;
	height: 51px;
	border-radius: 3px;
	display: inline-block;
	line-height: 1;
	background-image:    url(${backRotated});
    background-size:     cover;
    background-repeat:   no-repeat;
    background-position: center center;
`;

const ExchangeCards = styled.div`
	background-color: rgba(1,1,1,0.6);
	font-weight: 1000;
	font-size: 30px;
	font-family: Impact, sans-serif;
    width: 100%;
    height: 100%;
    color: white;
    padding-top: calc(520px/2 - 1em/2);
    text-align: center;
    transform: rotate(-${props => props.rotation}deg);
`;

const Field = styled.div`   
    border: ${props => props.ringColor?"3px solid ": "1px solid"} black;
    border-color: ${props => props.ringColor};
    position: absolute;
    width: ${props => props.ringColor?'28':'24'}px;
    height: ${props => props.ringColor?'28':'24'}px;
    border-radius: ${props => props.ringColor?'14':'12'}px;
    top: ${props => props.top}px;
    left: ${props => props.left}px;
    ${props => props.bgColor?"background: radial-gradient(circle at 8px 8px," + props.bgColor + ", #000);":""}
    ${props => (props.highlightColor == props.bgColor)?`
    box-shadow: 0px 0px 3px 3px white;
    &:hover {
        box-shadow: 0px 0px 6px 6px white;
    }
    `:""}
    ${props => props.highlighted?`
    box-shadow: 0px 0px 6px 6px white;
    `:``}
    ${props => props.selectable?`
    box-shadow: 0px 0px 3px 3px white;
    &:hover {
        box-shadow: 0px 0px 6px 6px white;
    }
    `:""}
`;

const Puddle = styled.div`
	position: absolute;
	width: 32px;
	height: 32px;
	top: ${props => props.top}px;
    left: ${props => props.left}px;
    background-image:url(${puddle});
    background-repeat:no-repeat;
    background-size:contain;
    transform: rotate(-${props => props.rotation}deg);
`;

const WindIcon = styled.div`
	position: absolute;
	width: 32px;
	height: 32px;
	top: ${props => props.top}px;
    left: ${props => props.left}px;
    background-image:url(${wind});
    background-repeat:no-repeat;
    background-size:contain;
    transform: rotate(${props => props.rotation}deg);
`;

const styles = theme => ({
	root: {
		height: '100vh',
		padding: theme.spacing(4)
	},
	table: {
		width: 768,
		height: 768,
	},
	partner: {
		width: 420,
		height: 92,
		padding: 10
	},
	opponent: {
		height: 420,
		width: 92,
		padding: 10,
	},
	board: {
		height: 530,
		width: 530
	},
	centerAlign: {
		textAlign: "center"
	},
	sideItem: {
		width: '100%'
	},
	weatherBox: {
		padding: 10,
		textAlign: 'center'
	},
	compact: {
		lineHeight: 1
	},
	gameLog: {
		fontSize: '0.75em'
	}
});

const weathers = {
	"SUNNY": 'CLEAR_DAY',
	"WINDY": 'WIND',
	"RAINY": 'RAIN',
	"UNKNOWN": 'CLEAR_NIGHT'
};

const cities = {
	"NEWYORK": 'New York',
	"ZURICH": 'Zürich',
	"LISBON": 'Lisbon',
	"SANFRANCISCO": 'San Francisco',
	"CARACAS": 'Caracas',
	"LIMA": 'Lima',
	"NAIROBI": 'Nairobi',
	"CASABLANCA": 'Casablanca',
	"HANOI": 'Hanoi',
	"DHAKA": 'Dhaka',
	"TOKYO": 'Tokyo',
	"JAKARTA": 'Jakarta',
	"BRISBANE": 'Brisbane',
	"PERTH": 'Perth',
	"CHRISTCHURCH": 'Christchurch',
	"DUBAI": 'Dubai',
};

// The fields positions
const fields = [
    {top: 488, left: 104},
    {top: 466, left: 126},
    {top: 444, left: 148},
    {top: 422, left: 170},
    {top: 400, left: 192},
    {top: 404, left: 222},
    {top: 408, left: 252},
    {top: 404, left: 282},
    {top: 400, left: 312},
    {top: 422, left: 334},
    {top: 444, left: 356},
    {top: 466, left: 378},
    {top: 488, left: 400},
    {top: 466, left: 422},
    {top: 444, left: 444},
    {top: 422, left: 466},
    {top: 400, left: 488},
    {top: 378, left: 466},
    {top: 356, left: 444},
    {top: 334, left: 422},
    {top: 312, left: 400},
    {top: 282, left: 404},
    {top: 252, left: 408},
    {top: 222, left: 404},
	{top: 192, left: 400},
	{top: 170, left: 422},
	{top: 148, left: 444},
	{top: 126, left: 466},
	{top: 104, left: 488},
	{top: 82, left: 466},
	{top: 60, left: 444},
	{top: 38, left: 422},
	{top: 16, left: 400},
	{top: 38, left: 378},
	{top: 60, left: 356},
	{top: 82, left: 334},
	{top: 104, left: 312},
	{top: 100, left: 282},
	{top: 96, left: 252},
	{top: 100, left: 222},
	{top: 104, left: 192},
	{top: 82, left: 170},
	{top: 60, left: 148},
	{top: 38, left: 126},
	{top: 16, left: 104},
	{top: 38, left: 82},
	{top: 60, left: 60},
	{top: 82, left: 38},
	{top: 104, left: 16},
	{top: 126, left: 38},
	{top: 148, left: 60},
	{top: 170, left: 82},
	{top: 192, left: 104},
	{top: 222, left: 100},
	{top: 252, left: 96},
	{top: 282, left: 100},
	{top: 312, left: 104},
	{top: 334, left: 82},
	{top: 356, left: 60},
	{top: 378, left: 38},
	{top: 400, left: 16},
	{top: 422, left: 38},
	{top: 444, left: 60},
	{top: 466, left: 82},
    {top: 436, left: 102},
    {top: 404, left: 100},
	{top: 381, left: 123},
	{top: 358, left: 146},
	{top: 402, left: 436},
	{top: 404, left: 404},
	{top: 381, left: 381},
	{top: 358, left: 358},
	{top: 68, left: 402},
	{top: 100, left: 404},
	{top: 123, left: 381},
	{top: 146, left: 358},
	{top: 102, left: 68},
	{top: 100, left: 100},
	{top: 123, left: 123},
	{top: 146, left: 146},
	{top: 488, left: 169},
	{top: 488, left: 202},
	{top: 488, left: 235},
	{top: 488, left: 268},
	{top: 335, left: 488},
	{top: 302, left: 488},
	{top: 269, left: 488},
	{top: 237, left: 488},
	{top: 16, left: 335},
	{top: 16, left: 302},
	{top: 16, left: 269},
	{top: 16, left: 237},
	{top: 169, left: 16},
	{top: 202, left: 16},
	{top: 235, left: 16},
	{top: 268, left: 16},
];

for (let i = 0; i < fields.length; i++) {
	fields[i].boardIndex = i;
}

// Special color fields
const ranges = [
	_.concat(0, _.range(64, 68), _.range(80, 84)),
	_.concat(16, _.range(68, 72), _.range(84, 88)),
	_.concat(32, _.range(72, 76), _.range(88, 92)),
	_.concat(48, _.range(76, 80), _.range(92, 96)),
];

class Gameboard extends React.Component {
    constructor() {
        super();
        this.state = {
        	game: null,
	        sortedPlayers: null,
            fields: fields,
	        boardRotation: 0,
	        selectedCard: null,
	        selectedFigure: null,
	        selectedField: null,
	        possibleFields: null,
			remainingSeven: null,
			exchangeCards: false,
	        gameLog: null
        };

        this.userID = parseInt(localStorage.getItem('userID'));
    }

    isMyMove(){
    	return (this.state.game.players[0].user && this.state.game.players[0].user.id == this.userID);
    }

    botName(color) {
    	const botNames={
    		"BLUE": "Barkificial Intelligence",
		    "RED": "CorgAI",
		    "YELLOW": "Doggy McDogface",
		    "GREEN": "Robodog",
	    };
	    return botNames[color];
    }

    playerFromPlayerId(playerId) {
	    if ( this.state.game && this.state.game.players ) {
		    let player = this.state.game.players.find(player => player.id === playerId);
		    return player;
	    }
	    return null;
    }

    getName(playerId) {
	    if (this.state.game && this.state.game.players ) {
		    let player = this.playerFromPlayerId(playerId);
		    console.log(playerId, player);
		    // For humans
		    if ( player.user ) {
		    	return player.user.username;
		    }
		    // For bots
		    else {
		    	return this.botName(player.colour);
		    }
	    }
    	return null;
    }

    avatar(type, color, identifier) {
	    let options = {
	    	base64: true,
		    background: color,
		    skin: ["light"],
		    margin: 8
	    };
	    let avatars = new Avatars(avataars, options);
	    if (type == "Bot") {
	    	avatars = new Avatars(bottts, options);
	    }
	    return avatars.create(identifier);
    }

    async possibleFields() {
	    const auth = {
		    baseURL: getDomain(),
		    headers: {
			    'Content-Type': 'application/json',
			    'X-Token': localStorage.getItem('token')
		    }
	    };
	    try {
		    let gameId = localStorage.getItem('gameID');
		    const requestBody = JSON.stringify({
			    cardId: this.state.selectedCard.id,
			    figureId: this.state.selectedFigure.id
		    });
		    const response = await api.post('/game/' + gameId + '/possible', requestBody, auth);
		    let possibleFields = response.data;
		    console.log('The following are the possible fields:', possibleFields);
		    if (possibleFields.length > 0){
			    this.setState({possibleFields: possibleFields});
		    }
		    else {
		    	this.props.enqueueSnackbar(
		    		"You can't move this figure, please choose another one.",
				    {variant: 'warning'}
		        );
		    	this.setState({selectedFigure: null});
		    }
	    } catch (error) {
		    alert(`Couldn't get possible fields: \n${handleError(error)}`);
	    }

    }

	async possibleFieldsSeven() {
		const auth = {
			baseURL: getDomain(),
			headers: {
				'Content-Type': 'application/json',
				'X-Token': localStorage.getItem('token')
			}
		};
		try {
			let gameId = localStorage.getItem('gameID');
			const requestBody = JSON.stringify({
				cardId: this.state.selectedCard.id,
				figureId: this.state.selectedFigure.id,
				remainingSeven: this.state.remainingSeven
			});
			const response = await api.post('/game/' + gameId + '/possible', requestBody, auth);
			let possibleFields = response.data;
			console.log('The following are the possible fields:', possibleFields);
			if (possibleFields.length > 0){
				this.setState({possibleFields: possibleFields});
			}
			else {
				alert("You can't move this figure, please choose another one.");
				this.setState({selectedFigure: null});
			}

		} catch (error) {
			alert(`Couldn't get possible fields: \n${handleError(error)}`);
		}
	}

	move() {
		const auth = {
			baseURL: getDomain(),
			headers: {
				'Content-Type': 'application/json',
				'X-Token': localStorage.getItem('token')
			}
		};
		try {
			let gameId = localStorage.getItem('gameID');
			const requestBody = JSON.stringify({
				cardId: this.state.selectedCard.id,
				figureId: this.state.selectedFigure.id,
				targetFieldId: this.state.selectedField.id
			});

			api.post('/game/' + gameId + '/move', requestBody, auth);
			this.setState({
				selectedCard: null,
				selectedFigure: null,
				selectedField: null,
				possibleFields: null
			})
		} catch (error) {
			alert(`There was an error in making the move: \n${handleError(error)}`);
		}
	}

	async moveSeven() {
		const auth = {
			baseURL: getDomain(),
			headers: {
				'Content-Type': 'application/json',
				'X-Token': localStorage.getItem('token')
			}
		};
		try {
			let gameId = localStorage.getItem('gameID');
			const requestBody = JSON.stringify({
				cardId: this.state.selectedCard.id,
				figureId: this.state.selectedFigure.id,
				targetFieldId: this.state.selectedField.id,
				remainingSeven: this.state.remainingSeven
			});
			const response = await api.post('/game/' + gameId + '/move/seven', requestBody, auth);
			let remainingSeven = parseInt(response.data);
			console.log("Remaining moves: ", remainingSeven);
			if (remainingSeven > 0) {
				this.setState({
					selectedFigure:null,
					selectedField:null,
					possibleFields:null
				});
				this.setState({remainingSeven: remainingSeven});
			} else {
				this.setState({
					selectedFigure:null,
					selectedField:null,
					selectedCard:null,
					remainingSeven:null,
					possibleFields: null
				});
			}
		} catch (error) {
			alert(`There was an error in making the move with card seven: \n${handleError(error)}`);
		}
	}

	makeMove() {
    	if ( this.state.selectedCard.value === 'SEVEN' ) {
    		this.moveSeven();
		} else {
    		this.move();
		}
	}

	numberofCards(gameCardNum) {
    	return (gameCardNum -1)%5 + 2; // Formula by very smart trial and error
	}

	isFinished() {
    	return this.state.sortedPlayers[0].finished;
	}

	isPartnerFinished() {
    	return this.state.sortedPlayers[2].finished;
	}

	getPossibleFields() {
		if ( this.state.selectedCard.value === 'SEVEN' ) {
			this.possibleFieldsSeven();
		} else {
			this.possibleFields();
		}
	}

	async exchangeCards(card) {
		let gameID = localStorage.getItem('gameID');
		const auth = {
			baseURL: getDomain(),
			headers: {
				'Content-Type': 'application/json',
				'X-Token': localStorage.getItem('token')
			}
		};
		const requestBody = JSON.stringify({
			cardId: card.id
		});
		const response = await api.post("/game/" + gameID +"/exchange", requestBody, auth);
		if (response.status === 201) {
			this.setState({exchangeCards: false});
		}
	}

    async selectPlayingCard(card) {
    	if (this.state.exchangeCards) {
			this.exchangeCards(card);
		}
	    else if (this.isMyMove()) {
		    if (!this.state.selectedCard) {
		    	if (card.value === 'SEVEN') {
		    		this.setState({remainingSeven: 7});
				}
			    console.log('Player selected the following card:', card);
			    this.setState({selectedCard: card});}
		    else if (this.state.selectedCard.id == card.id &&
			    (!this.state.remainingSeven || this.state.remainingSeven == 7)) {
			    console.log('Player disselected card');
			    this.setState({
				    selectedCard: null,
				    selectedFigure: null,
				    selectedField: null,
				    possibleFields: null,
					remainingSeven: null
			    });
		    }
	    }
    }

    selectFigureOrFieldFromBoardField(boardIndex){
		if ( this.isMyMove() && this.state.selectedCard ) {
			let field = this.state.game.board.fields[boardIndex];
			if (!this.state.selectedFigure) {
				if (this.isFinished()) {
					const partnerId = this.state.sortedPlayers[2].id;
					if (field.occupant.player && field.occupant.player.id == partnerId) {
						this.setState(
							{selectedFigure: field.occupant},
							() => {this.getPossibleFields()}
						);
						console.log('Player selected the following figure', field.occupant);
					}
				} else {
					if (field.occupant.player.user && field.occupant.player.user.id == this.userID) {
						this.setState(
							{selectedFigure: field.occupant},
							() => {this.getPossibleFields()}
						);
						console.log('Player selected the following figure', field.occupant);
					}
				}
			}
			else if (this.state.selectedCard && this.state.selectedFigure) {
				for (let index = 0; index < this.state.possibleFields.length; index++) {
					if (this.state.possibleFields[index].id === field.id) {
						this.setState(
							{selectedField: field},
							() => {this.makeMove()}
						);
						break;
					}
				}
			}
		}

    }

    async fetch() {
    	if (!this.state.exchangeCards) {
			const auth = {
				baseURL: getDomain(),
				headers: {
					'Content-Type': 'application/json',
					'X-Token': localStorage.getItem('token')
				}
			};
			try {
				let gameID = localStorage.getItem('gameID');

				const response = await api.get('/game/' + gameID, auth);
				let game = response.data;
				this.setState({game: game});
			} catch (error) {
				alert(`Something went wrong while fetching the game: \n${handleError(error)}`);
			}
		}
    }

    componentDidMount() {
    	this.fetch();
	    this.fetchInterval = setInterval(() => this.fetch(), 1000);
    }

    componentWillUnmount() {
    	clearInterval(this.fetchInterval);
    }

	componentDidUpdate(prevProps, prevState, snapshot) {
    	if(this.state.game !== prevState.game){

		    let sortPlayers = this.state.game.players.slice();

		    // Sorted players
		    if (this.state.game.players) {
		    	while (!sortPlayers[0].user || sortPlayers[0].user.id !== this.userID) {
		    		let popPlayer = sortPlayers.shift();
		    		sortPlayers.push(popPlayer);
			    }
		    }
		    this.setState({sortedPlayers: sortPlayers});

		    // GameLog
		    if (this.state.game.logItems) {
			    let logItems = this.state.game.logItems.reverse();
			    logItems = logItems.slice(0,5); //Limits the logItems to 5
			    this.setState({gameLog: logItems});
		    }
	    }

		let newfields = null;
    	newfields = fields;

    	if (this.state.sortedPlayers && this.state.sortedPlayers !== prevState.sortedPlayers) {
    		this.setState({exchangeCards: this.state.sortedPlayers[0].exchangeCards})
		}

		if (this.state.game !== prevState.game ||
			this.state.sortedPlayers !== prevState.sortedPlayers ||
			this.state.selectedFigure !== prevState.selectedFigure ||
			this.state.possibleFields !== prevState.possibleFields) {
			// Balls and Ring colors
			let boardFields = this.state.game.board.fields;
			for (let [index, value] of boardFields.entries()) {
				if (value.occupant) {
					newfields[index].ball = value.occupant.player.colour;
				}
				else {
					newfields[index].ball = null;
				}

				if (value.colour) {
					newfields[index].ringColor = value.colour;
				}
				else {
					newfields[index].ringColor = null;
				}
			}

			// Board rotation
			let boardRotation = 0;
			let fieldIndex = 0;
			if (this.state.sortedPlayers && this.state.game.board) {
				while (this.state.sortedPlayers[0].colour != this.state.game.board.fields[fieldIndex].colour) {
					boardRotation += 90;
					fieldIndex += 16;
				}
			}
			this.setState({boardRotation: boardRotation});


			// Selected figure
			for (let index = 0; index < newfields.length; index++){
				if (this.state.selectedFigure &&
					this.state.game.board.fields[index].occupant &&
					this.state.game.board.fields[index].occupant.id == this.state.selectedFigure.id ){
					newfields[index].highlighted = true;
				}
				else {
					newfields[index].highlighted = false;
				}
			}

			// Possible fields
			if (this.state.possibleFields) {
				for (let index = 0; index < newfields.length; index++){
					newfields[index].selectable = false;
					for (let y = 0; y < this.state.possibleFields.length; y++){
						if (this.state.game.board.fields[index].id == this.state.possibleFields[y].id){
							newfields[index].selectable = true;
						}
					}
				}
			}
			else {
				for (let index = 0; index < newfields.length; index++){
					newfields[index].selectable = false;
				}
			}

		}

		if (this.state.game !== prevState.game ||
			this.state.sortedPlayers !== prevState.sortedPlayers ||
			this.state.selectedFigure !== prevState.selectedFigure ) {
			this.setState({fields: newfields});
		}
    }

	render() {
		const { classes } = this.props;

        return (
	        <Grid
		        container
		        component="main"
		        className={classes.root}
		        alignItems="center"
		        spacing={2}
	        >
		        <CssBaseline />
		        <Grid
			        item
			        className={classes.table}
		        >
			        <Grid
				        container
				        direction="column"
				        justify="center"
				        alignItems="center"
				        spacing={2}
			        >
				        <Grid item>
					        <Grid
						        container
						        spacing={2}
					        >
						        <Grid item xs />
						        <Grid item>
									<Paper className={classes.partner}>
										{this.state.sortedPlayers && this.state.sortedPlayers[2].hand?
											<Grid
												container
												direction="row"
												justify="flex-start"
												alignItems="center"
												spacing={2}
											>
												{this.state.sortedPlayers[2].hand.map((card) =>
													<Grid item xs className={classes.centerAlign}>
														<PartnerCard />
													</Grid>
												)}
											</Grid>:''
										}
									</Paper>
						        </Grid>
						        <Grid item xs />
					        </Grid>
				        </Grid>
				        <Grid item>
					        <Grid
						        container
						        alignItems="center"
						        spacing={2}
					        >
						        <Grid item xs>
									<Paper className={classes.opponent}>
										{this.state.sortedPlayers && this.state.sortedPlayers[3].hand?
											<Grid
												container
												direction="column"
												justify="flex-start"
												alignItems="center"
												spacing={2}
												className={classes.fullHeight}
											>
												{this.state.sortedPlayers[3].hand.map((card) =>
													<Grid item xs className={classes.compact}>
														<OpponentCard />
													</Grid>
												)}
											</Grid>:''
										}
									</Paper>
						        </Grid>
						        <Grid item>
							        <Paper elevation={4} className={classes.board}>
								        <Map rotation={this.state.boardRotation}>
									        {this.state.game && this.state.game.weatherState == "RAINY" ?
										        <>
											        <Puddle top={308} left={100} rotation={this.state.boardRotation} />
											        <Puddle top={100} left={188} rotation={this.state.boardRotation+90} />
											        <Puddle top={396} left={308} rotation={this.state.boardRotation+180} />
											        <Puddle top={188} left={398} rotation={this.state.boardRotation+270} />
										        </>
										        :''
									        }
									        {this.state.game && this.state.game.weatherState == "WINDY" ?
										        <>
											        <WindIcon top={294} left={82} rotation={250} />
											        <WindIcon top={82} left={204} rotation={340} />
											        <WindIcon top={412} left={288} rotation={160} />
											        <WindIcon top={204} left={414} rotation={70} />
										        </>
										        :''
									        }
									        {this.state.fields.map((field) =>
										        <Field
											        key={field.boardIndex}
											        top={field.top}
											        left={field.left}
											        ringColor={field.ringColor}
											        bgColor={field.ball}
											        highlightColor={this.state.selectedCard && !this.state.selectedFigure?
												        (this.isFinished()?
													        this.state.sortedPlayers[2].colour:
													        this.state.sortedPlayers[0].colour):
												        ''}
											        highlighted={field.highlighted}
											        selectable={field.selectable}
											        onClick={() => {
												        this.selectFigureOrFieldFromBoardField(field.boardIndex);
											        }}
										        />
									        )}
									        {this.state.game && this.state.game.city?
										        <City
											        city={this.state.game.city}
											        rotation={this.state.boardRotation}
										        />
										        :''}
									        {this.state.exchangeCards?
										        <ExchangeCards rotation={this.state.boardRotation}>
											        Please select which card to exchange!
										        </ExchangeCards>
									        :''}
								        </Map>
							        </Paper>
						        </Grid>
						        <Grid item xs>
									<Paper className={classes.opponent}>
										{this.state.sortedPlayers && this.state.sortedPlayers[1].hand?
											<Grid
												container
												direction="column"
												justify="flex-start"
												alignItems="center"
												spacing={2}
												className={classes.fullHeight}
											>
												{this.state.sortedPlayers[1].hand.map((card) =>
													<Grid item xs className={classes.compact}>
														<OpponentCard />
													</Grid>
												)}
											</Grid>:''
										}
									</Paper>
						        </Grid>
					        </Grid>
				        </Grid>
				        <Grid item>
					        <Grid
						        container
						        spacing={2}
					        >
						        <Grid item xs />
						        <Grid item>
							        <Paper className={classes.partner}>
								        {this.state.sortedPlayers && this.state.sortedPlayers[0].hand?
									        <Grid
										        container
										        direction="row"
										        justify="flex-start"
										        alignItems="center"
										        spacing={2}
									        >
										        {this.state.sortedPlayers[0].hand.map((card) =>
											        <Grid item xs className={classes.centerAlign}>
												        <Card
													        key={card.id}
													        card={card}
													        pleaseSelect={(this.isMyMove() && !this.state.selectedCard) || this.state.exchangeCards}
													        selected={this.state.selectedCard && card.id == this.state.selectedCard.id}
													        action={() => this.selectPlayingCard(card)}
												        />
											        </Grid>
										        )}
									        </Grid>:''
								        }
							        </Paper>
						        </Grid>
						        <Grid item xs />
					        </Grid>
				        </Grid>
			        </Grid>
		        </Grid>
		        <Grid
			        item
			        xs
		        >
			        <Grid
				        container
				        direction="column"
				        justify="space-evenly"
				        alignItems="center"
				        spacing={2}
			        >
				        <Grid item xs className={classes.sideItem}>
					        {this.state.game && this.state.game.weatherState && this.state.game.city?
						        (
							        <Paper className={classes.weatherBox}>
								        <Grid
									        container
									        justify="space-evenly"
									        alignItems="center"
								        >
									        <Grid item xs>
										        <ReactAnimatedWeather
											        icon={weathers[this.state.game.weatherState]}
										        />
									        </Grid>
									        {this.state.game.cardNum?
										        <Grid item xs>
											        {this.numberofCards(this.state.game.cardNum)}
										        </Grid>
									        :''}

								        </Grid>

								        <Divider />
								        <Grid
									        container
									        justify="space-evenly"
									        alignItems="center"
								        >
									        <Grid item xs>
										        <Typography variant="body1">
											        You now travelled to <strong>{cities[this.state.game.city]}</strong> where the weather is currently {this.state.game.weatherState.toLowerCase()}.
										        </Typography>
									        </Grid>
									        {this.state.game.cardNum?
										        <Grid item xs>
											        <Typography variant="body1">
												        Everyone received {this.numberofCards(this.state.game.cardNum)} cards.
											        </Typography>
										        </Grid>
									        :''}
								        </Grid>

							        </Paper>
						        ):''}
				        </Grid>
				        <Grid item xs className={classes.sideItem}>
					        {this.state.game?(
					        	<Paper>
							        <List dense>
								        {this.state.game.players.map((player) =>
									        <ListItem key={player.id} button>
										        <ListItemAvatar>
											        <Avatar
												        alt={`Avatar for player ${this.getName(player.id)}`}
												        src={this.avatar((player.user?'Human':'Bot'),player.colour, player.id)}
											        />
										        </ListItemAvatar>
										        <ListItemText
											        primary={this.getName(player.id)}
										        />
									        </ListItem>
								        )}
							        </List>
						        </Paper>
						        ):''
					        }
				        </Grid>
				        <Grid item xs className={classes.sideItem}>
					        {this.state.gameLog && this.state.gameLog.length !== 0?(
						        <Paper className={classes.gameLog}>
							        <List
								        dense
								        disablePadding
							        >
								        {this.state.gameLog.map((logItem) =>
									        <ListItem
										        key={logItem.id}
										        divider
									        >
										        <ListItemText
											        className={classes.gameLog}
											        primary={
												        logItem.value === "JOKER"?
													        `${this.getName(logItem.playerId)} played a ${logItem.value.toLowerCase()}.`:
													        `${this.getName(logItem.playerId)} played a ${logItem.value.toLowerCase()} of ${logItem.suit.toLowerCase()}.`
											        }
										        />
									        </ListItem>
								        )}
							        </List>
						        </Paper>
					        ):''
					        }
				        </Grid>
			        </Grid>
		        </Grid>
            </Grid>
        )
    }
}

export default withRouter(withStyles(styles)(withSnackbar(Gameboard)));