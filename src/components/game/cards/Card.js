import styled from 'styled-components';
import React from "react";

const CardContent = styled.div`
	border: 1px solid black;
	width: 65px;
	height: 90px;
	margin-left: 9px;
	margin-top: 9px;
	padding: 5px;
	border-radius: 3px;
	display: inline-block;
	vertical-align: top;
	font-size: 0.7em;
	${props => props.select?`
	box-shadow: 0px 0px 3px 3px grey;
	&:hover {
		box-shadow: 0px 0px 6px 6px grey;
	`:``}
	${props => props.selected?`
	box-shadow: 0px 0px 6px 6px grey;
	`:``}
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
			>
				{this.props.card.type === "Normal"?
					<>
						{this.props.card.suit} <br />
						{this.props.card.value}
					</>
					:
					'JOKER'
				}
			</CardContent>
		)
	}
}

export default Card;