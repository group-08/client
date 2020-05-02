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

const style64 = {top: 466, left: 82};
const style63 = {top: 444, left: 60};
const style62 = {top: 422, left: 38};
const style61 = {top: 400, left: 16};
const style60 = {top: 378, left: 38};
const style59 = {top: 356, left: 60};
const style58 = {top: 334, left: 82};
const style57 = {top: 312, left: 104};
const style56 = {top: 282, left: 100};
const style55 = {top: 252, left: 96};
const style54 = {top: 222, left: 100};
const style53 = {top: 192, left: 104};
const style52 = {top: 170, left: 82};
const style51 = {top: 148, left: 60};
const style50 = {top: 126, left: 38};
const style49 = {top: 104, left: 16};
const style48 = {top: 82, left: 38};
const style47 = {top: 60, left: 60};
const style46 = {top: 38, left: 82};
const style45 = {top: 16, left: 104};
const style44 = {top: 38, left: 126};
const style43 = {top: 60, left: 148};
const style42 = {top: 82, left: 170};
const style41 = {top: 104, left: 192};
const style40 = {top: 100, left: 222};
const style39 = {top: 96, left: 252};
const style38 = {top: 100, left: 282};
const style37 = {top: 104, left: 312};
const style36 = {top: 82, left: 334};
const style35 = {top: 60, left: 356};
const style34 = {top: 38, left: 378};
const style33 = {top: 16, left: 400};
const style32 = {top: 38, left: 422};
const style31 = {top: 60, left: 444};
const style30 = {top: 82, left: 466};
const style29 = {top: 104, left: 488};
const style28 = {top: 126, left: 466};
const style27 = {top: 148, left: 444};
const style26 = {top: 170, left: 422};
const style25 = {top: 192, left: 400};
const style24 = {top: 222, left: 404};
const style23 = {top: 252, left: 408};
const style22 = {top: 282, left: 404};
const style21 = {top: 312, left: 400};
const style20 = {top: 334, left: 422};
const style19 = {top: 356, left: 444};
const style18 = {top: 378, left: 466};
const style17 = {top: 400, left: 488};
const style16 = {top: 422, left: 466};
const style15 = {top: 444, left: 444};
const style14 = {top: 466, left: 422};
const style13 = {top: 488, left: 400};
const style12 = {top: 466, left: 378};
const style11 = {top: 444, left: 356};
const style10 = {top: 422, left: 334};
const style9 = {top: 400, left: 312};
const style8 = {top: 404, left: 282};
const style7 = {top: 408, left: 252};
const style6 = {top: 404, left: 222};
const style5 = {top: 400, left: 192};
const style4 = {top: 422, left: 170};
const style3 = {top: 444, left: 148};
const style2 = {top: 466, left: 126};
const style1 = {top: 488, left: 104};
const style65 = {top: 436, left: 102};
const style66 = {top: 404, left: 100};
const style67 = {top: 381, left: 123};
const style68 = {top: 358, left: 146};
const style69 = {top: 402, left: 436};
const style70 = {top: 404, left: 404};
const style71 = {top: 381, left: 381};
const style72 = {top: 358, left: 358};
const style73 = {top: 68, left: 402};
const style74 = {top: 100, left: 404};
const style75 = {top: 123, left: 381};
const style76 = {top: 146, left: 358};
const style77 = {top: 102, left: 68};
const style78 = {top: 100, left: 100};
const style79 = {top: 123, left: 123};
const style80 = {top: 146, left: 146};
const style81 = {top: 488, left: 169};
const style82 = {top: 488, left: 202};
const style83 = {top: 488, left: 235};
const style84 = {top: 488, left: 268};
const style85 = {top: 335, left: 488};
const style86 = {top: 302, left: 488};
const style87 = {top: 269, left: 488};
const style88 = {top: 237, left: 488};
const style89 = {top: 16, left: 335};
const style90 = {top: 16, left: 302};
const style91 = {top: 16, left: 269};
const style92 = {top: 16, left: 237};
const style93 = {top: 169, left: 16};
const style94 = {top: 202, left: 16};
const style95 = {top: 235, left: 16};
const style96 = {top: 268, left: 16};





class Gameboard extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
            cards: null,
            pieces: null,
            chosenCard: null
        };
    }

    changeColor(){
        this.const.style1 = {
            backgroundColor: 'blue'
        }
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
                    <div
                        style={{...pieceButton, ...style1, ...blue}}
                        onClick={() => {
                            this.changeColor();
                        }}>
                    </div>
                    <div id= '2' style={{...pieceButton, ...style2}}>
                    </div>
                    <div style={{...pieceButton, ...style3}}>
                    </div>
                    <div style={{...pieceButton, ...style4}}>
                    </div>
                    <div style={{...pieceButton, ...style5}}>
                    </div>
                    <div style={{...pieceButton, ...style6}}>
                    </div>
                    <div style={{...pieceButton, ...style7}}>
                    </div>
                    <div style={{...pieceButton, ...style8}}>
                    </div>
                    <div style={{...pieceButton, ...style9}}>
                    </div>
                    <div style={{...pieceButton, ...style10}}>
                    </div>
                    <div style={{...pieceButton, ...style11}}>
                    </div>
                    <div style={{...pieceButton, ...style12}}>
                    </div>
                    <div style={{...pieceButton, ...style13}}>
                    </div>
                    <div style={{...pieceButton, ...style14}}>
                    </div>
                    <div style={{...pieceButton, ...style15}}>
                    </div>
                    <div style={{...pieceButton, ...style16}}>
                    </div>
                    <div style={{...pieceButton, ...style17, ...green}}>
                    </div>
                    <div style={{...pieceButton, ...style18}}>
                    </div>
                    <div style={{...pieceButton, ...style19}}>
                    </div>
                    <div style={{...pieceButton, ...style20}}>
                    </div>
                    <div style={{...pieceButton, ...style21}}>
                    </div>
                    <div style={{...pieceButton, ...style22}}>
                    </div>
                    <div style={{...pieceButton, ...style23}}>
                    </div>
                    <div style={{...pieceButton, ...style24}}>
                    </div>
                    <div style={{...pieceButton, ...style25}}>
                    </div>
                    <div style={{...pieceButton, ...style26}}>
                    </div>
                    <div style={{...pieceButton, ...style27}}>
                    </div>
                    <div style={{...pieceButton, ...style28}}>
                    </div>
                    <div style={{...pieceButton, ...style29}}>
                    </div>
                    <div style={{...pieceButton, ...style30}}>
                    </div>
                    <div style={{...pieceButton, ...style31}}>
                    </div>
                    <div style={{...pieceButton, ...style32}}>
                    </div>
                    <div style={{...pieceButton, ...style33, ...red}}>
                    </div>
                    <div style={{...pieceButton, ...style34}}>
                    </div>
                    <div style={{...pieceButton, ...style35}}>
                    </div>
                    <div style={{...pieceButton, ...style36}}>
                    </div>
                    <div style={{...pieceButton, ...style37}}>
                    </div>
                    <div style={{...pieceButton, ...style38}}>
                    </div>
                    <div style={{...pieceButton, ...style39}}>
                    </div>
                    <div style={{...pieceButton, ...style40}}>
                    </div>
                    <div style={{...pieceButton, ...style41}}>
                    </div>
                    <div style={{...pieceButton, ...style42}}>
                    </div>
                    <div style={{...pieceButton, ...style43}}>
                    </div>
                    <div style={{...pieceButton, ...style44}}>
                    </div>
                    <div style={{...pieceButton, ...style45}}>
                    </div>
                    <div style={{...pieceButton, ...style46}}>
                    </div>
                    <div style={{...pieceButton, ...style47}}>
                    </div>
                    <div style={{...pieceButton, ...style48}}>
                    </div>
                    <div style={{...pieceButton, ...style49, ...yellow}}>
                    </div>
                    <div style={{...pieceButton, ...style50}}>
                    </div>
                    <div style={{...pieceButton, ...style51}}>
                    </div>
                    <div style={{...pieceButton, ...style52}}>
                    </div>
                    <div style={{...pieceButton, ...style53}}>
                    </div>
                    <div style={{...pieceButton, ...style54}}>
                    </div>
                    <div style={{...pieceButton, ...style55}}>
                    </div>
                    <div style={{...pieceButton, ...style56}}>
                    </div>
                    <div style={{...pieceButton, ...style57}}>
                    </div>
                    <div style={{...pieceButton, ...style58}}>
                    </div>
                    <div style={{...pieceButton, ...style59}}>
                    </div>
                    <div style={{...pieceButton, ...style60}}>
                    </div>
                    <div style={{...pieceButton, ...style61}}>
                    </div>
                    <div style={{...pieceButton, ...style62}}>
                    </div>
                    <div style={{...pieceButton, ...style63}}>
                    </div>
                    <div style={{...pieceButton, ...style64}}>
                    </div>
                    <div style={{...pieceButton, ...style65, ...blue}}>
                    </div>
                    <div style={{...pieceButton, ...style66, ...blue}}>
                    </div>
                    <div style={{...pieceButton, ...style67, ...blue}}>
                    </div>
                    <div style={{...pieceButton, ...style68, ...blue}}>
                    </div>
                    <div style={{...pieceButton, ...style69, ...green}}>
                    </div>
                    <div style={{...pieceButton, ...style70, ...green}}>
                    </div>
                    <div style={{...pieceButton, ...style71, ...green}}>
                    </div>
                    <div style={{...pieceButton, ...style72, ...green}}>
                    </div>
                    <div style={{...pieceButton, ...style73, ...red}}>
                    </div>
                    <div style={{...pieceButton, ...style74, ...red}}>
                    </div>
                    <div style={{...pieceButton, ...style75, ...red}}>
                    </div>
                    <div style={{...pieceButton, ...style76, ...red}}>
                    </div>
                    <div style={{...pieceButton, ...style77, ...yellow}}>
                    </div>
                    <div style={{...pieceButton, ...style78, ...yellow}}>
                    </div>
                    <div style={{...pieceButton, ...style79, ...yellow}}>
                    </div>
                    <div style={{...pieceButton, ...style80, ...yellow}}>
                    </div>
                    <div style={{...pieceButton, ...style81, ...blue}}>
                    </div>
                    <div style={{...pieceButton, ...style82, ...blue}}>
                    </div>
                    <div style={{...pieceButton, ...style83, ...blue}}>
                    </div>
                    <div style={{...pieceButton, ...style84, ...blue}}>
                    </div>
                    <div style={{...pieceButton, ...style85, ...green}}>
                    </div>
                    <div style={{...pieceButton, ...style86, ...green}}>
                    </div>
                    <div style={{...pieceButton, ...style87, ...green}}>
                    </div>
                    <div style={{...pieceButton, ...style88, ...green}}>
                    </div>
                    <div style={{...pieceButton, ...style89, ...red}}>
                    </div>
                    <div style={{...pieceButton, ...style90, ...red}}>
                    </div>
                    <div style={{...pieceButton, ...style91, ...red}}>
                    </div>
                    <div style={{...pieceButton, ...style92, ...red}}>
                    </div>
                    <div style={{...pieceButton, ...style93, ...yellow}}>
                    </div>
                    <div style={{...pieceButton, ...style94, ...yellow}}>
                    </div>
                    <div style={{...pieceButton, ...style95, ...yellow}}>
                    </div>
                    <div style={{...pieceButton, ...style96, ...yellow}}>
                    </div>

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
                        <div>
                            <div style={cardLayout}> Please choose Joker </div>
                            {this.getJokerDeck().map(card => {
                                return (
                                    <div key={card}
                                           onClick={() => { this.chosenCard(card) }}>
                                        <div style={cardLayout}>
                                            {card.suit} <br />
                                            {card.val}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(/**withStyles(styles)





 */(Gameboard));



