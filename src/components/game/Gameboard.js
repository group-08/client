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

const map = {
    backgroundImage: 'url(' + mapPic + ')',
    border: '1px solid',
    width: 530,
    height: 530,
    position: "absolute",
    top:104,
    left:115
};

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
    float: 'left'
}

const player = {
    border: '1px solid',
    marginLeft: 10,
    width: 510,
    height: 40,
    marginTop: 10,
    borderRadius: 10
};

const playerBlue = {
    width: 26,
    height: 26,
    borderRadius: 13,
    background: 'blue',
    margin: 6
};
const playerGreen = {
    width: 26,
    height: 26,
    borderRadius: 13,
    background: 'green',
    margin: 6
};
const playerRed = {
    width: 26,
    height: 26,
    borderRadius: 13,
    background: 'red',
    margin: 6
};
const playerYellow = {
    width: 26,
    height: 26,
    borderRadius: 13,
    background: 'yellow',
    margin: 6
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
`;

// The fields positons
let fields = [
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

// Add the four start fields
fields[0].ringColor = 'blue';
fields[16].ringColor = 'green';
fields[32].ringColor = 'red';
fields[48].ringColor = 'yellow';

// Goal fields
for (const x of _.range(64, 68)) {
    fields[x].ringColor = 'blue';
}
for (const x of _.range(68, 72)) {
	fields[x].ringColor = 'green';
}
for (const x of _.range(72, 76)) {
	fields[x].ringColor = 'red';
}
for (const x of _.range(76, 80)) {
	fields[x].ringColor = 'yellow';
}

// Home fields
for (const x of _.range(80, 84)) {
	fields[x].ringColor = 'blue';
	fields[x].ball = 'blue';
}
for (const x of _.range(84, 88)) {
	fields[x].ringColor = 'green';
	fields[x].ball = 'green';
}
for (const x of _.range(88, 92)) {
	fields[x].ringColor = 'red';
	fields[x].ball = 'red';
}
for (const x of _.range(92, 96)) {
	fields[x].ringColor = 'yellow';
	fields[x].ball = 'yellow';
}

class Gameboard extends React.Component {
    constructor() {
        super();
        this.state = {
            chosenCard: null,
            fields: fields
        };
    }

    chosenCard(card){
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
/**
    async fetch() {
        try {
            let auth = {
                baseURL: getDomain(),
                headers: {
                    'Content-Type': 'application/json',
                    'X-Token': localStorage.getItem('token')
                }
            };
            const response = await api.get('/game', auth);


            this.setState({ users: response.data });
        } catch (error) {
            if (error.response.status === 403) {
                //error
            }
            else{
                alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
            }
        }
    }
    /**
const Card = (jokerDeck) => {
        <div className="card">
            <div className="card-tl">
                <div className="card-value">
                    {props.value}
                </div>
                <div className="card-suit">
                    {props.suit}
                </div>
            </div>
            <div className="card-br">
                <div className="card-value">
                    {props.value}
                </div>
                <div className="card-suit">
                    {props.suit}
                </div>
            </div>
        </div>
    }
**/
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
                    <div style={cards}>
                    </div>
                    <div style={map}>

                        {this.state.fields.map((field) =>
                            <Field
                                top={field.top}
                                left={field.left}
                                ringColor={field.ringColor}
                                bgColor={field.ball}
                            />
                        )}
                </div>
                </div>
                <div style={sideboard}>
                    <div style={players}>
                        <div style={player}>
                            <div style={playerBlue}></div>
                        </div>
                        <div style={player}>
                            <div style={playerGreen}></div>
                        </div>
                        <div style={player}>
                            <div style={playerRed}></div>
                        </div>
                        <div style={player}>
                            <div style={playerYellow}></div>
                        </div>
                    </div>
                    <div style={joker}>
                            <div style={cardLayout}> Please choose a Joker </div>
                            {this.getJokerDeck().map(card => {
                                return (
                                    <div key={card}
                                           onClick={() => { this.chosenCard(card) }}>
                                        <div style={cardLayout}>
                                            {card.val} <br />{card.suit}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(Gameboard);
