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
	
	&:hover {
		box-shadow: 0px 0px 3px 3px grey;
	}
`;

function Card(props){
	return (
		<CardContent>
			{props.card.type == "Normal"?
					<>
						{props.card.suit}
						{props.card.value}
					</>
					:
					'JOKER'
			}
		</CardContent>
	)
}

export default Card;