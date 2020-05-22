import styled from 'styled-components';
import React from "react";


import back from "./illustrations/hiddenCard.svg";



class HiddenCard extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HiddenCardContent
                bg={back}
                rotation={270}
            />
        )
    }
}

export default HiddenCard;