import styled from 'styled-components';
import React from "react";

import dhaka from "./Cities/Dhaka.jpg";
import dubai from "./Cities/Dubai.jpg";
import hanoi from "./Cities/Hanoi.jpg";
import jakarta from "./Cities/Jakarta.jpg";
import lima from "./Cities/Lima.jpg";
import lisbon from "./Cities/Lisbon.jpg";
import nairobi from "./Cities/Nairobi.jpg";
import newyork from "./Cities/NewYork.jpg";
import perth from "./Cities/Perth.jpg";
import sanfrancisco from "./Cities/SanFrancisco.jpg";
import tokyo from "./Cities/Tokyo.jpg";
import zurich from "./Cities/Zurich.jpg";
import casablanca from "./Cities/Casablanca.jpg";

let cities = {
    "DHAKA": dhaka,
    "DUBAI": dubai,
    "HANOI": hanoi,
    "JAKARTA": jakarta,
    "LIMA": lima,
    "LISBON": lisbon,
    "NAIROBI": nairobi,
    "NEWYORK": newyork,
    "PERTH": perth,
    "SANFRANCISCO": sanfrancisco,
    "TOKYO": tokyo,
    "ZURICH": zurich,
    "CASABLANCA" : casablanca,
};

const CityContent = styled.div`
      position: absolute;
      top: calc(520px / 2 - 100px);
      left: calc(520px / 2 - 100px);
      width: 200px;
      height: 200px;
      padding: 0;
      margin: 0;
      border-radius: 100px;
      background: url(${props => props.bg});
      background-repeat: no-repeat;
      background-size: cover;
      transform: rotate(-${props => props.rotation}deg);
`;

class City extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CityContent
                bg={cities[this.props.city]}
                rotation={this.props.rotation}
            />
        )
    }
}

export default City;