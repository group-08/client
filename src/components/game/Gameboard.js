import React from 'react';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';

import {getDomain} from "../../helpers/getDomain";

import Card from "./cards/Card";

import styled from 'styled-components';
import _ from 'lodash';

import mapPic from './mapPic.jpeg'

const board = {
    border: '1px solid',
    width: 768,
    height: 768,
    position: "absolute",
    marginLeft: 50
};

const opponent3 = {
    border: '1px solid',
    width: 95,
    height: 420,
    marginLeft: 5,
    marginTop: 160
};

const opponent2 = {
    border: '1px solid',
    width: 420,
    height: 95,
    position: "absolute",
    marginLeft: 173,
    marginTop: 5
};

const opponent1 = {
    border: '1px solid',
    width: 95,
    height: 420,
    position: "absolute",
    left: 663,
    top: 160
};

const cards = {
    border: '1px solid',
    width: 453,
    height: 115,
    position: "absolute",
    top: 640,
    left: 154
};

const Map = styled.div`
	background-image: url(${mapPic});
    border: 1px solid;
    width: 530px;
    height: 530px;
    position: absolute;
    top: 104px;
    left: 115px;
    transform: rotate(${props => props.rotation}deg);
`;

const sideboard = {
    //backgroundImage: 'url(' + mapPic + ')',
    border: '1px solid',
    width: 548,
    height: 768,
    position: "absolute",
    left:818
};

const players = {
    border: '1px solid',
    width: 530,
    height: 210,
    position: "absolute",
    marginTop: 200,
    marginLeft: 9,
    borderRadius: 10
};

const joker = {
    border: '1px solid',
    width: 530,
    height: 210,
    position: "absolute",
    marginTop: 420,
    marginLeft: 9,
    borderRadius: 10
};

const cardLayout = {
    border: '1px solid',
    height: 90,
    width: 65,
    marginLeft: 9,
    marginTop: 9,
    padding: 5,
    borderRadius: 5,
    float: 'left',
	fontSize: '0.5em'
};

const Field = styled.div`   
    border: ${props => props.ringColor?"3px solid ": "1px solid"} black;
    border-color: ${props => props.ringColor};
    position: absolute;
    width: 26px;
    height: 26px;
    border-radius: 13px;
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

const PlayerDetail = styled.div`
    margin-left: 10px;
    width: 510px;
    height: 40px;
    margin-top: 10px;
    border-radius: 10px;
    padding: 10px;
    font-weight: bold;
    color: ${props => props.color == "YELLOW"?'black':'white'};
    background-color: ${props => props.color};
`;

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
	        cards: null,
	        sortedPlayers: null,
            fields: fields,
	        boardRotation: 0,
	        selectedCard: null,
	        selectedFigure: null,
	        selectedField: null,
	        possibleFields: null,
			remainingSeven: null
        };

        this.userID = parseInt(localStorage.getItem('userID'));
    }

    isMyMove(){
    	return (this.state.game.players[0].user.id == this.userID);
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
		    console.log('The following are the possible fields:', response.data);
		    this.setState({possibleFields: response.data});

	    } catch (error) {
		    alert(`Couldn't get possible fields: \n${handleError(error)}`);
	    }

    }

	possibleFieldsSeven() {
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
			const response = api.post('/game/' + gameId + '/possible', requestBody, auth);

			this.setState.possibleFields = response.data;

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

	moveSeven() {
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
			const response = api.post('/game/' + gameId + '/move', requestBody, auth);
			this.setState({remainingSeven: parseInt(response.data)});

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

	getPossibleFields() {
		if ( this.state.selectedCard.value === 'SEVEN' ) {
			this.possibleFieldsSeven();
		} else {
			this.possibleFields();
		}
	}

    selectPlayingCard(card) {
	    if (this.isMyMove()) {
		    if (!this.state.selectedCard) {
			    console.log('Player selected the following card:', card);
			    this.setState({selectedCard: card});
		    }
		    else if (this.state.selectedCard.id == card.id) {
			    console.log('Player disselected card');
			    this.setState({
				    selectedCard: null,
				    selectedFigure: null,
				    selectedField: null,
				    possibleFields: null,
			    });
		    }
	    }
    }

    selectFigureOrFieldFromBoardField(boardIndex){
		if ( this.isMyMove() && this.state.selectedCard ) {
			let field = this.state.game.board.fields[boardIndex];
			if (!this.state.selectedFigure) {
				if (field.occupant.player.user.id == this.userID) {
					this.setState(
						{selectedFigure: field.occupant},
						() => {this.getPossibleFields()}
						);
					console.log('Player selected the following figure', field.occupant);
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

    chosenJokerCard(card){
        this.state.chosenCard = card
    }

    getJokerDeck(){
        const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        let jokerDeck = [];
        let card = [];

        for (let x = 0; x < values.length; x++) {
            card = {suit: 'Joker', val: values[x]};
            jokerDeck.push(card);
        }
        return jokerDeck
    }

    async fetch() {
	    const auth = {
		    baseURL: getDomain(),
		    headers: {
			    'Content-Type': 'application/json',
			    'X-Token': localStorage.getItem('token')
		    }
	    }
	    try {
		    let gameID = localStorage.getItem('gameID');

		    const response = await api.get('/game/' + gameID, auth);
		    let game = response.data;
		    this.setState({game: game});
	    } catch (error) {
		    alert(`Something went wrong while fetching the game: \n${handleError(error)}`);
	    }
    }

    componentDidMount() {
    	this.fetch();
	    this.fetchInterval = setInterval(() => this.fetch(), 1000);
    }

	componentDidUpdate(prevProps, prevState, snapshot) {
    	if(this.state.game !== prevState.game){

		    let sortPlayers = this.state.game.players.slice();

		    // Sorted players
		    if (this.state.game.players) {
		    	while (sortPlayers[0].user.id !== this.userID) {
		    		let popPlayer = sortPlayers.shift();
		    		sortPlayers.push(popPlayer);
			    }
		    }
		    this.setState({sortedPlayers: sortPlayers});
	    }

		let newfields = null;
    	newfields = fields

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

		if (this.state.sortedPlayers !== prevState.sortedPlayers){
			// Cards
			let cards = this.state.sortedPlayers[0].hand;
			this.setState({cards: cards});
		}

		if (this.state.game !== prevState.game ||
			this.state.sortedPlayers !== prevState.sortedPlayers ||
			this.state.selectedFigure !== prevState.selectedFigure ) {
			this.setState({fields: newfields});
		}
    }

	render() {
        return (
            <div>
                <div style={board}>
                    <div style={opponent1}>
                    </div>
                    <div style={opponent2}>
                    </div>
                    <div style={opponent3}>
                    </div>
	                {this.state.cards?
		                <div style={cards}>
			                {this.state.cards.map((card) =>
				                <Card
					                key={card.id}
					                card={card}
					                pleaseSelect={this.isMyMove() && !this.state.selectedCard}
					                selected={this.state.selectedCard && card.id == this.state.selectedCard.id}
					                action={() => this.selectPlayingCard(card)}
				                />
			                )}
		                </div>:''
	                }
					<Map rotation={this.state.boardRotation}>
                        {this.state.fields.map((field) =>
                            <Field
	                            key={field.boardIndex}
                                top={field.top}
                                left={field.left}
                                ringColor={field.ringColor}
                                bgColor={field.ball}
	                            highlightColor={this.state.selectedCard && !this.state.selectedFigure?this.state.sortedPlayers[0].colour:''}
	                            highlighted={field.highlighted}
	                            selectable={field.selectable}
	                            onClick={() => {
		                            this.selectFigureOrFieldFromBoardField(field.boardIndex);
	                            }}
                            />
                        )}
					</Map>
                </div>
                <div style={sideboard}>
                    <div style={players}>
	                    {this.state.game?
		                    this.state.game.players.map((player) =>
				                    <PlayerDetail
					                    key={player.id}
					                    color={player.colour}
				                    >
					                    {player.user.username}
				                    </PlayerDetail>
			                    ):''
	                    }

                    </div>
	                {this.state.displayJoker?
		                (<div style={joker}>
			                <div style={cardLayout}> Please choose a Joker </div>
			                {this.getJokerDeck().map(card => {
				                return (
					                <div
						                key={card}
						                onClick={() => { this.chosenJokerCard(card) }}
					                >
						                <div style={cardLayout}>
							                {card.val} <br />{card.suit}
						                </div>
					                </div>
				                );
			                })}
		                </div>):""
	                }
                </div>
            </div>

        )
    }
}

export default withRouter(Gameboard);