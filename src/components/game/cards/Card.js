import styled from 'styled-components';
import React from "react";


import joker from "./illustrations/Joker.svg";

import hearts2 from "./illustrations/2H.svg";
import hearts3 from "./illustrations/3H.svg";
import hearts4 from "./illustrations/4H.svg";
import hearts5 from "./illustrations/5H.svg";
import hearts6 from "./illustrations/6H.svg";
import hearts7 from "./illustrations/7H.svg";
import hearts8 from "./illustrations/8H.svg";
import hearts9 from "./illustrations/9H.svg";
import hearts10 from "./illustrations/TH.svg";
import heartsjack from "./illustrations/JH.svg";
import heartsqueen from "./illustrations/QH.svg";
import heartsking from "./illustrations/KH.svg";
import heartsace from "./illustrations/AH.svg";

import spades2 from "./illustrations/2S.svg";
import spades3 from "./illustrations/3S.svg";
import spades4 from "./illustrations/4S.svg";
import spades5 from "./illustrations/5S.svg";
import spades6 from "./illustrations/6S.svg";
import spades7 from "./illustrations/7S.svg";
import spades8 from "./illustrations/8S.svg";
import spades9 from "./illustrations/9S.svg";
import spades10 from "./illustrations/TS.svg";
import spadesjack from "./illustrations/JS.svg";
import spadesqueen from "./illustrations/QS.svg";
import spadesking from "./illustrations/KS.svg";
import spadesace from "./illustrations/AS.svg";

import clubs2 from "./illustrations/2C.svg";
import clubs3 from "./illustrations/3C.svg";
import clubs4 from "./illustrations/4C.svg";
import clubs5 from "./illustrations/5C.svg";
import clubs6 from "./illustrations/6C.svg";
import clubs7 from "./illustrations/7C.svg";
import clubs8 from "./illustrations/8C.svg";
import clubs9 from "./illustrations/9C.svg";
import clubs10 from "./illustrations/TC.svg";
import clubsjack from "./illustrations/JC.svg";
import clubsqueen from "./illustrations/QC.svg";
import clubsking from "./illustrations/KC.svg";
import clubsace from "./illustrations/AC.svg";

import diamonds2 from "./illustrations/2D.svg";
import diamonds3 from "./illustrations/3D.svg";
import diamonds4 from "./illustrations/4D.svg";
import diamonds5 from "./illustrations/5D.svg";
import diamonds6 from "./illustrations/6D.svg";
import diamonds7 from "./illustrations/7D.svg";
import diamonds8 from "./illustrations/8D.svg";
import diamonds9 from "./illustrations/9D.svg";
import diamonds10 from "./illustrations/TD.svg";
import diamondsjack from "./illustrations/JD.svg";
import diamondsqueen from "./illustrations/QD.svg";
import diamondsking from "./illustrations/KD.svg";
import diamondsace from "./illustrations/AD.svg";

let cards = {
	"JOKER": joker,
	"HEARTS": {
		"TWO": hearts2,
		"THREE": hearts3,
		"FOUR": hearts4,
		"FIVE": hearts5,
		"SIX": hearts6,
		"SEVEN": hearts7,
		"EIGHT": hearts8,
		"NINE": hearts9,
		"TEN": hearts10,
		"JACK": heartsjack,
		"QUEEN": heartsqueen,
		"KING": heartsking,
		"ACE": heartsace,
	},
	"CLUBS": {
		"TWO": clubs2,
		"THREE": clubs3,
		"FOUR": clubs4,
		"FIVE": clubs5,
		"SIX": clubs6,
		"SEVEN": clubs7,
		"EIGHT": clubs8,
		"NINE": clubs9,
		"TEN": clubs10,
		"JACK": clubsjack,
		"QUEEN": clubsqueen,
		"KING": clubsking,
		"ACE": clubsace,
	},
	"SPADES": {
		"TWO": spades2,
		"THREE": spades3,
		"FOUR": spades4,
		"FIVE": spades5,
		"SIX": spades6,
		"SEVEN": spades7,
		"EIGHT": spades8,
		"NINE": spades9,
		"TEN": spades10,
		"JACK": spadesjack,
		"QUEEN": spadesqueen,
		"KING": spadesking,
		"ACE": spadesace,
	},
	"DIAMONDS": {
		"TWO": diamonds2,
		"THREE": diamonds3,
		"FOUR": diamonds4,
		"FIVE": diamonds5,
		"SIX": diamonds6,
		"SEVEN": diamonds7,
		"EIGHT": diamonds8,
		"NINE": diamonds9,
		"TEN": diamonds10,
		"JACK": diamondsjack,
		"QUEEN": diamondsqueen,
		"KING": diamondsking,
		"ACE": diamondsace,
	},
};

const CardContent = styled.div`
	border: 1px solid black;
	width: 51px;
	height: 72px;
	border-radius: 3px;
	display: inline-block;
	vertical-align: top;
	font-size: 0.7em;
	${props => props.select?`
	box-shadow: 0px 0px 3px 3px grey;
	&:hover {
		box-shadow: 0px 0px 6px 6px grey;
	}
	`:``}
	${props => props.selected?`
	box-shadow: 0px 0px 6px 6px grey;
	`:``}
	background-image:    url(${props => props.bg});
    background-size:     cover;
    background-repeat:   no-repeat;
    background-position: center center;         
`;

class Card extends React.Component{
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<CardContent
				select={this.props.pleaseSelect}
				selected={this.props.selected}
				onClick={this.props.action}
				bg={this.props.card.value === "JOKER"?
					cards[this.props.card.value]:
					cards[this.props.card.suit][this.props.card.value]}
			/>
		)
	}
}

export default Card;