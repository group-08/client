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

function Card(props){
	return (
		<CardContent
			select={props.pleaseSelect}
			selected={props.selected}
		>
			{props.card.type === "Normal"?
					<>
						{props.card.suit} <br />
						{props.card.value}
					</>
					:
					'JOKER'
			}
		</CardContent>
	)
}

export default Card;