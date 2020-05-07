import React from 'react';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';

import { getDomain } from "../../helpers/getDomain";

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

const pieceButton = {
    border: '1px solid',
    position: "absolute",
    width: 26,
    height: 26,
    borderRadius: 13,
};

const blue = {border: '3px solid', borderColor: 'blue'};
const blueOccupant = {backgroundColor: 'blue'};
const green = {border: '3px solid', borderColor: 'green'};
const red = {border: '3px solid', borderColor: 'red'};
const yellow = {border: '3px solid', borderColor: 'yellow'};

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
}


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
    ${props => props.bgColor?"&:hover {box-shadow: 0px 0px 3px 3px white;}":""}
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

// Special color fields
const ranges = [
	_.concat(0, _.range(64, 68), _.range(80, 84)),
	_.concat(16, _.range(68, 72), _.range(84, 88)),
	_.concat(32, _.range(72, 76), _.range(88, 92)),
	_.concat(48, _.range(76, 80), _.range(92, 96))
]

class Gameboard extends React.Component {
    constructor() {
        super();
        this.state = {
        	game: null,
	        cards: null,
	        sortedPlayers: null,
            chosenCard: null,
            fields: fields,
	        displayJoker: false,
	        boardRotation: 0
        };

        this.userID = localStorage.getItem('userID');
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

		    // const response = await api.get('/game/' + gameID, auth);
		    let game = JSON.parse('{"id":3,"name":"TestGame","gameState":"RUNNING","host":{"id":1,"email":"test1","username":"test1","status":"ONLINE"},"players":[{"id":123,"user":{"id":122,"email":"test4","username":"test4","status":"ONLINE"},"colour":"BLUE","hand":[{"suit":"CLUBS","value":"NINE"},{"suit":"DIAMONDS","value":"FIVE"},{"value":null},{"suit":"CLUBS","value":"KING"},{"suit":"HEARTS","value":"TWO"},{"suit":"HEARTS","value":"THREE"}]},{"id":121,"user":{"id":120,"email":"test3","username":"test3","status":"ONLINE"},"colour":"GREEN","hand":[{"suit":"DIAMONDS","value":"NINE"},{"suit":"DIAMONDS","value":"TWO"},{"suit":"DIAMONDS","value":"THREE"},{"suit":"HEARTS","value":"TEN"},{"value":null},{"suit":"CLUBS","value":"QUEEN"}]},{"id":118,"user":{"id":1,"email":"test1","username":"test1","status":"ONLINE"},"colour":"YELLOW","hand":[{"suit":"HEARTS","value":"QUEEN"},{"suit":"DIAMONDS","value":"FOUR"},{"suit":"SPADES","value":"JACK"},{"suit":"SPADES","value":"EIGHT"},{"suit":"HEARTS","value":"FIVE"},{"suit":"DIAMONDS","value":"QUEEN"}]},{"id":119,"user":{"id":2,"email":"test2","username":"test2","status":"ONLINE"},"colour":"RED","hand":[{"suit":"CLUBS","value":"TEN"},{"value":null},{"suit":"SPADES","value":"QUEEN"},{"suit":"DIAMONDS","value":"TEN"},{"suit":"CLUBS","value":"EIGHT"},{"suit":"SPADES","value":"FIVE"}]}],"board":{"id":4,"fields":[{"id":5,"occupant":null},{"id":6,"occupant":null},{"id":7,"occupant":null},{"id":8,"occupant":null},{"id":9,"occupant":null},{"id":10,"occupant":null},{"id":11,"occupant":null},{"id":12,"occupant":null},{"id":13,"occupant":null},{"id":14,"occupant":null},{"id":15,"occupant":null},{"id":16,"occupant":null},{"id":17,"occupant":null},{"id":18,"occupant":null},{"id":19,"occupant":null},{"id":20,"occupant":null},{"id":21,"occupant":null},{"id":22,"occupant":null},{"id":23,"occupant":null},{"id":24,"occupant":null},{"id":25,"occupant":null},{"id":26,"occupant":null},{"id":27,"occupant":null},{"id":28,"occupant":null},{"id":29,"occupant":null},{"id":30,"occupant":null},{"id":31,"occupant":null},{"id":32,"occupant":null},{"id":33,"occupant":null},{"id":34,"occupant":null},{"id":35,"occupant":null},{"id":36,"occupant":null},{"id":37,"occupant":null},{"id":38,"occupant":null},{"id":39,"occupant":null},{"id":40,"occupant":null},{"id":41,"occupant":null},{"id":42,"occupant":null},{"id":43,"occupant":null},{"id":44,"occupant":null},{"id":45,"occupant":null},{"id":46,"occupant":null},{"id":47,"occupant":null},{"id":48,"occupant":null},{"id":49,"occupant":null},{"id":50,"occupant":null},{"id":51,"occupant":null},{"id":52,"occupant":null},{"id":53,"occupant":null},{"id":54,"occupant":null},{"id":55,"occupant":null},{"id":56,"occupant":null},{"id":57,"occupant":null},{"id":58,"occupant":null},{"id":59,"occupant":null},{"id":60,"occupant":null},{"id":61,"occupant":null},{"id":62,"occupant":null},{"id":63,"occupant":null},{"id":64,"occupant":null},{"id":65,"occupant":null},{"id":66,"occupant":null},{"id":67,"occupant":null},{"id":68,"occupant":null},{"id":81,"occupant":null},{"id":82,"occupant":null},{"id":83,"occupant":null},{"id":84,"occupant":null},{"id":77,"occupant":null},{"id":78,"occupant":null},{"id":79,"occupant":null},{"id":80,"occupant":null},{"id":73,"occupant":null},{"id":74,"occupant":null},{"id":75,"occupant":null},{"id":76,"occupant":null},{"id":69,"occupant":null},{"id":70,"occupant":null},{"id":71,"occupant":null},{"id":72,"occupant":null},{"id":85,"occupant":{"id":86,"player":{"id":123,"user":{"id":122,"email":"test4","username":"test4","status":"ONLINE"},"colour":"BLUE","hand":[{"suit":"CLUBS","value":"NINE"},{"suit":"DIAMONDS","value":"FIVE"},{"value":null},{"suit":"CLUBS","value":"KING"},{"suit":"HEARTS","value":"TWO"},{"suit":"HEARTS","value":"THREE"}]}}},{"id":87,"occupant":{"id":88,"player":{"id":123,"user":{"id":122,"email":"test4","username":"test4","status":"ONLINE"},"colour":"BLUE","hand":[{"suit":"CLUBS","value":"NINE"},{"suit":"DIAMONDS","value":"FIVE"},{"value":null},{"suit":"CLUBS","value":"KING"},{"suit":"HEARTS","value":"TWO"},{"suit":"HEARTS","value":"THREE"}]}}},{"id":89,"occupant":{"id":90,"player":{"id":123,"user":{"id":122,"email":"test4","username":"test4","status":"ONLINE"},"colour":"BLUE","hand":[{"suit":"CLUBS","value":"NINE"},{"suit":"DIAMONDS","value":"FIVE"},{"value":null},{"suit":"CLUBS","value":"KING"},{"suit":"HEARTS","value":"TWO"},{"suit":"HEARTS","value":"THREE"}]}}},{"id":91,"occupant":{"id":92,"player":{"id":123,"user":{"id":122,"email":"test4","username":"test4","status":"ONLINE"},"colour":"BLUE","hand":[{"suit":"CLUBS","value":"NINE"},{"suit":"DIAMONDS","value":"FIVE"},{"value":null},{"suit":"CLUBS","value":"KING"},{"suit":"HEARTS","value":"TWO"},{"suit":"HEARTS","value":"THREE"}]}}},{"id":93,"occupant":{"id":94,"player":{"id":121,"user":{"id":120,"email":"test3","username":"test3","status":"ONLINE"},"colour":"GREEN","hand":[{"suit":"DIAMONDS","value":"NINE"},{"suit":"DIAMONDS","value":"TWO"},{"suit":"DIAMONDS","value":"THREE"},{"suit":"HEARTS","value":"TEN"},{"value":null},{"suit":"CLUBS","value":"QUEEN"}]}}},{"id":95,"occupant":{"id":96,"player":{"id":121,"user":{"id":120,"email":"test3","username":"test3","status":"ONLINE"},"colour":"GREEN","hand":[{"suit":"DIAMONDS","value":"NINE"},{"suit":"DIAMONDS","value":"TWO"},{"suit":"DIAMONDS","value":"THREE"},{"suit":"HEARTS","value":"TEN"},{"value":null},{"suit":"CLUBS","value":"QUEEN"}]}}},{"id":97,"occupant":{"id":98,"player":{"id":121,"user":{"id":120,"email":"test3","username":"test3","status":"ONLINE"},"colour":"GREEN","hand":[{"suit":"DIAMONDS","value":"NINE"},{"suit":"DIAMONDS","value":"TWO"},{"suit":"DIAMONDS","value":"THREE"},{"suit":"HEARTS","value":"TEN"},{"value":null},{"suit":"CLUBS","value":"QUEEN"}]}}},{"id":99,"occupant":{"id":100,"player":{"id":121,"user":{"id":120,"email":"test3","username":"test3","status":"ONLINE"},"colour":"GREEN","hand":[{"suit":"DIAMONDS","value":"NINE"},{"suit":"DIAMONDS","value":"TWO"},{"suit":"DIAMONDS","value":"THREE"},{"suit":"HEARTS","value":"TEN"},{"value":null},{"suit":"CLUBS","value":"QUEEN"}]}}},{"id":101,"occupant":{"id":102,"player":{"id":118,"user":{"id":1,"email":"test1","username":"test1","status":"ONLINE"},"colour":"YELLOW","hand":[{"suit":"HEARTS","value":"QUEEN"},{"suit":"DIAMONDS","value":"FOUR"},{"suit":"SPADES","value":"JACK"},{"suit":"SPADES","value":"EIGHT"},{"suit":"HEARTS","value":"FIVE"},{"suit":"DIAMONDS","value":"QUEEN"}]}}},{"id":103,"occupant":{"id":104,"player":{"id":118,"user":{"id":1,"email":"test1","username":"test1","status":"ONLINE"},"colour":"YELLOW","hand":[{"suit":"HEARTS","value":"QUEEN"},{"suit":"DIAMONDS","value":"FOUR"},{"suit":"SPADES","value":"JACK"},{"suit":"SPADES","value":"EIGHT"},{"suit":"HEARTS","value":"FIVE"},{"suit":"DIAMONDS","value":"QUEEN"}]}}},{"id":105,"occupant":{"id":106,"player":{"id":118,"user":{"id":1,"email":"test1","username":"test1","status":"ONLINE"},"colour":"YELLOW","hand":[{"suit":"HEARTS","value":"QUEEN"},{"suit":"DIAMONDS","value":"FOUR"},{"suit":"SPADES","value":"JACK"},{"suit":"SPADES","value":"EIGHT"},{"suit":"HEARTS","value":"FIVE"},{"suit":"DIAMONDS","value":"QUEEN"}]}}},{"id":107,"occupant":{"id":108,"player":{"id":118,"user":{"id":1,"email":"test1","username":"test1","status":"ONLINE"},"colour":"YELLOW","hand":[{"suit":"HEARTS","value":"QUEEN"},{"suit":"DIAMONDS","value":"FOUR"},{"suit":"SPADES","value":"JACK"},{"suit":"SPADES","value":"EIGHT"},{"suit":"HEARTS","value":"FIVE"},{"suit":"DIAMONDS","value":"QUEEN"}]}}},{"id":109,"occupant":{"id":110,"player":{"id":119,"user":{"id":2,"email":"test2","username":"test2","status":"ONLINE"},"colour":"RED","hand":[{"suit":"CLUBS","value":"TEN"},{"value":null},{"suit":"SPADES","value":"QUEEN"},{"suit":"DIAMONDS","value":"TEN"},{"suit":"CLUBS","value":"EIGHT"},{"suit":"SPADES","value":"FIVE"}]}}},{"id":111,"occupant":{"id":112,"player":{"id":119,"user":{"id":2,"email":"test2","username":"test2","status":"ONLINE"},"colour":"RED","hand":[{"suit":"CLUBS","value":"TEN"},{"value":null},{"suit":"SPADES","value":"QUEEN"},{"suit":"DIAMONDS","value":"TEN"},{"suit":"CLUBS","value":"EIGHT"},{"suit":"SPADES","value":"FIVE"}]}}},{"id":113,"occupant":{"id":114,"player":{"id":119,"user":{"id":2,"email":"test2","username":"test2","status":"ONLINE"},"colour":"RED","hand":[{"suit":"CLUBS","value":"TEN"},{"value":null},{"suit":"SPADES","value":"QUEEN"},{"suit":"DIAMONDS","value":"TEN"},{"suit":"CLUBS","value":"EIGHT"},{"suit":"SPADES","value":"FIVE"}]}}},{"id":115,"occupant":{"id":116,"player":{"id":119,"user":{"id":2,"email":"test2","username":"test2","status":"ONLINE"},"colour":"RED","hand":[{"suit":"CLUBS","value":"TEN"},{"value":null},{"suit":"SPADES","value":"QUEEN"},{"suit":"DIAMONDS","value":"TEN"},{"suit":"CLUBS","value":"EIGHT"},{"suit":"SPADES","value":"FIVE"}]}}}]}}')

		    this.setState({game: game});
	    } catch (error) {
		    alert(`Something went wrong while fetching the game: \n${handleError(error)}`);
	    }
    }

    componentDidMount() {
    	this.fetch();
    }

	componentDidUpdate(prevProps, prevState, snapshot) {
		let newfields = fields;
    	if(this.state.game !== prevState.game){
		    // Board


		    // Balls
		    let boardFields = this.state.game.board.fields;
		    for (let [index, value] of boardFields.entries()){
			    if (value.occupant){
				    newfields[index].ball = value.occupant.player.colour;
			    }
		    }

		    // Update the board
		    this.setState({board: newfields});

		    // Sorted players (you are always first)
		    if (this.state.game.players) {
		    	let sortPlayers = this.state.game.players.slice();
		    	let sortRotation = this.state.boardRotation;
		    	while (sortPlayers[0].user.id != this.userID) {
		    		let popPlayer = sortPlayers.shift();
		    		sortPlayers.push(popPlayer);
		    		sortRotation += 90;
			    }
			    this.setState({sortedPlayers: sortPlayers});
			    this.setState({boardRotation: sortRotation});
		    }
	    }

		if (this.state.sortedPlayers !== prevState.sortedPlayers){
			// Cards
			let cards = this.state.sortedPlayers[0].hand;
			this.setState({cards: cards});

			// Home and goal fields
			let players = this.state.game.players;
			for (let [index, value] of players.entries()) {
				let range = ranges[index];
				for (let i = 0; i < range.length; i++) {
					newfields[range[i]].ringColor = value.colour;
				}
			}
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
				                <>
					                {card.suit && card.value?
						                <Card suit={card.suit} value={card.value} />:
						                <Card type="JOKER" />
					                }
				                </>
			                )}
		                </div>:''
	                }
					<Map rotation={this.state.boardRotation}>
                        {this.state.fields.map((field) =>
                            <Field
                                top={field.top}
                                left={field.left}
                                ringColor={field.ringColor}
                                bgColor={field.ball}
                            />
                        )}
					</Map>
                </div>
                <div style={sideboard}>
                    <div style={players}>
	                    {this.state.game?
		                    this.state.game.players.map((player) =>
				                    <PlayerDetail color={player.colour}>
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
					                <div key={card}
					                     onClick={() => { this.chosenJokerCard(card) }}>
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
