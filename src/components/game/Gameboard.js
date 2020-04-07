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

/**
const styles = theme => ({
    root: {
        height: '100vh',
    },
    paper: {
        padding: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)'
    },
    closed: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    open: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.success.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});
*/


const board = {
    border: '1px solid',
    width: 768,
    height: 768,
    position: "fixed",
    marginLeft: 50
}

const opponent1 = {
    border: '1px solid',
    width: 100,
    height: 420,
    marginLeft: 5,
    marginTop: 200
}

const opponent2 = {
    border: '1px solid',
    width: 420,
    height: 100,
    position: "fixed",
    marginLeft: 173,
    top: 0
}

const opponent3 = {
    border: '1px solid',
    width: 100,
    height: 420,
    position: "fixed",
    left: 713,
    top: 200
}

const cards = {
    border: '1px solid',
    width: 504,
    height: 120,
    position: "fixed",
    top: 640,
    left: 180
}

const map = {
    border: '1px solid',
    width: 530,
    height: 530,
    position: "fixed",
    top:104,
    left:169
}

const pieceButton = {
    border: '1px solid',
    position: "absolute",
    maxWidth: 26,
    height: 26,
    borderRadius: 13,
    padding: 0,
    //background: 'blue'
}

const style1 = {top: 488, left: 104,}
const style64 = {top: 466, left: 82,}
const style63 = {top: 444, left: 60,}
const style62 = {top: 422, left: 38,}
const style61 = {top: 400, left: 16,}
const style60 = {top: 378, left: 38,}
const style59 = {top: 356, left: 60,}
const style58 = {top: 334, left: 82,}
const style57 = {top: 312, left: 104,}
const style56 = {top: 282, left: 100,}
const style55 = {top: 252, left: 96,}
const style54 = {top: 222, left: 100,}
const style53 = {top: 192, left: 104,}
const style52 = {top: 170, left: 82,}
const style51 = {top: 148, left: 60,}
const style50 = {top: 126, left: 38,}
const style49 = {top: 104, left: 16,}
const style48 = {top: 82, left: 38,}
const style47 = {top: 60, left: 60,}
const style46 = {top: 38, left: 82,}
const style45 = {top: 16, left: 104,}
const style44 = {top: 38, left: 126,}
const style43 = {top: 60, left: 148,}
const style42 = {top: 82, left: 170,}
const style41 = {top: 104, left: 192,}
const style40 = {top: 100, left: 222,}
const style39 = {top: 96, left: 252,}
const style38 = {top: 100, left: 282,}
const style37 = {top: 104, left: 312,}
const style36 = {top: 82, left: 334,}
const style35 = {top: 60, left: 356,}
const style34 = {top: 38, left: 378,}
const style33 = {top: 16, left: 400,}
const style32 = {top: 38, left: 422,}
const style31 = {top: 60, left: 444,}
const style30 = {top: 82, left: 466,}
const style29 = {top: 104, left: 488,}
const style28 = {top: 126, left: 466,}
const style27 = {top: 148, left: 444,}
const style26 = {top: 170, left: 422,}
const style25 = {top: 192, left: 400,}
const style24 = {top: 222, left: 404,}
const style23 = {top: 252, left: 408,}
const style22 = {top: 282, left: 404,}
const style21 = {top: 312, left: 400,}
const style20 = {top: 334, left: 422,}
const style19 = {top: 356, left: 444,}
const style18 = {top: 378, left: 466,}
const style17 = {top: 400, left: 488,}
const style16 = {top: 422, left: 466,}
const style15 = {top: 444, left: 444,}
const style14 = {top: 466, left: 422,}
const style13 = {top: 488, left: 400,}
const style12 = {top: 466, left: 378,}
const style11 = {top: 444, left: 356,}
const style10 = {top: 422, left: 334,}
const style9 = {top: 400, left: 312,}
const style8 = {top: 404, left: 282,}
const style7 = {top: 408, left: 252,}
const style6 = {top: 404, left: 222,}
const style5 = {top: 400, left: 192,}
const style4 = {top: 422, left: 170,}
const style3 = {top: 444, left: 148,}
const style2 = {top: 466, left: 126,}
const style65 = {top: 10, left: 0,}
const style66 = {top: 0, left: 0,}
const style67 = {top: 10, left: 0,}
const style68 = {top: 0, left: 0,}
const style69 = {top: 10, left: 0,}
const style70 = {top: 0, left: 0,}
const style71 = {top: 10, left: 0,}
const style72 = {top: 0, left: 0,}
const style73 = {top: 10, left: 0,}
const style74 = {top: 0, left: 0,}
const style75 = {top: 10, left: 0,}
const style76 = {top: 0, left: 0,}
const style77 = {top: 10, left: 0,}
const style78 = {top: 0, left: 0,}
const style79 = {top: 10, left: 0,}
const style80 = {top: 0, left: 0,}
const style81 = {top: 10, left: 0,}
const style82 = {top: 0, left: 0,}
const style83 = {top: 10, left: 0,}
const style84 = {top: 0, left: 0,}
const style85 = {top: 10, left: 0,}
const style86 = {top: 0, left: 0,}
const style87 = {top: 10, left: 0,}
const style88 = {top: 0, left: 0,}
const style89 = {top: 10, left: 0,}
const style90 = {top: 0, left: 0,}
const style91 = {top: 10, left: 0,}
const style92 = {top: 0, left: 0,}
const style93 = {top: 10, left: 0,}
const style94 = {top: 0, left: 0,}
const style95 = {top: 10, left: 0,}
const style96 = {top: 0, left: 0,}


class Gameboard extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
            cards: null,
            pieces: null
        };
    }

    changeColor(){
        this.const.style1 = {
            backgroundColor: 'blue'
        }
    }

    render() {
        return (
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
                    <Button
                        style={{...pieceButton, ...style1}}
                        onClick={() => {
                            this.changeColor();
                        }}>1
                    </Button>
                    <Button style={{...pieceButton, ...style2}}>2
                    </Button>
                    <Button style={{...pieceButton, ...style3}}>3
                    </Button>
                    <Button style={{...pieceButton, ...style4}}>
                    </Button>
                    <Button style={{...pieceButton, ...style5}}>
                    </Button>
                    <Button style={{...pieceButton, ...style6}}>
                    </Button>
                    <Button style={{...pieceButton, ...style7}}>
                    </Button>
                    <Button style={{...pieceButton, ...style8}}>
                    </Button>
                    <Button style={{...pieceButton, ...style9}}>
                    </Button>
                    <Button style={{...pieceButton, ...style10}}>10
                    </Button>
                    <Button style={{...pieceButton, ...style11}}>
                    </Button>
                    <Button style={{...pieceButton, ...style12}}>
                    </Button>
                    <Button style={{...pieceButton, ...style13}}>
                    </Button>
                    <Button style={{...pieceButton, ...style14}}>
                    </Button>
                    <Button style={{...pieceButton, ...style15}}>
                    </Button>
                    <Button style={{...pieceButton, ...style16}}>16
                    </Button>
                    <Button style={{...pieceButton, ...style17}}>17
                    </Button>
                    <Button style={{...pieceButton, ...style18}}>
                    </Button>
                    <Button style={{...pieceButton, ...style19}}>
                    </Button>
                    <Button style={{...pieceButton, ...style20}}>20
                    </Button>
                    <Button style={{...pieceButton, ...style21}}>
                    </Button>
                    <Button style={{...pieceButton, ...style22}}>
                    </Button>
                    <Button style={{...pieceButton, ...style23}}>
                    </Button>
                    <Button style={{...pieceButton, ...style24}}>
                    </Button>
                    <Button style={{...pieceButton, ...style25}}>
                    </Button>
                    <Button style={{...pieceButton, ...style26}}>
                    </Button>
                    <Button style={{...pieceButton, ...style27}}>
                    </Button>
                    <Button style={{...pieceButton, ...style28}}>
                    </Button>
                    <Button style={{...pieceButton, ...style29}}>
                    </Button>
                    <Button style={{...pieceButton, ...style30}}>
                    </Button>
                    <Button style={{...pieceButton, ...style31}}>
                    </Button>
                    <Button style={{...pieceButton, ...style32}}>
                    </Button>
                    <Button style={{...pieceButton, ...style33}}>33
                    </Button>
                    <Button style={{...pieceButton, ...style34}}>
                    </Button>
                    <Button style={{...pieceButton, ...style35}}>
                    </Button>
                    <Button style={{...pieceButton, ...style36}}>
                    </Button>
                    <Button style={{...pieceButton, ...style37}}>
                    </Button>
                    <Button style={{...pieceButton, ...style38}}>
                    </Button>
                    <Button style={{...pieceButton, ...style39}}>
                    </Button>
                    <Button style={{...pieceButton, ...style40}}>
                    </Button>
                    <Button style={{...pieceButton, ...style41}}>
                    </Button>
                    <Button style={{...pieceButton, ...style42}}>
                    </Button>
                    <Button style={{...pieceButton, ...style43}}>
                    </Button>
                    <Button style={{...pieceButton, ...style44}}>
                    </Button>
                    <Button style={{...pieceButton, ...style45}}>
                    </Button>
                    <Button style={{...pieceButton, ...style46}}>
                    </Button>
                    <Button style={{...pieceButton, ...style47}}>
                    </Button>
                    <Button style={{...pieceButton, ...style48}}>
                    </Button>
                    <Button style={{...pieceButton, ...style49}}>49
                    </Button>
                    <Button style={{...pieceButton, ...style50}}>
                    </Button>
                    <Button style={{...pieceButton, ...style51}}>
                    </Button>
                    <Button style={{...pieceButton, ...style52}}>
                    </Button>
                    <Button style={{...pieceButton, ...style53}}>
                    </Button>
                    <Button style={{...pieceButton, ...style54}}>
                    </Button>
                    <Button style={{...pieceButton, ...style55}}>
                    </Button>
                    <Button style={{...pieceButton, ...style56}}>
                    </Button>
                    <Button style={{...pieceButton, ...style57}}>
                    </Button>
                    <Button style={{...pieceButton, ...style58}}>
                    </Button>
                    <Button style={{...pieceButton, ...style59}}>
                    </Button>
                    <Button style={{...pieceButton, ...style60}}>
                    </Button>
                    <Button style={{...pieceButton, ...style61}}>
                    </Button>
                    <Button style={{...pieceButton, ...style62}}>
                    </Button>
                    <Button style={{...pieceButton, ...style63}}>63
                    </Button>
                    <Button style={{...pieceButton, ...style64}}>64
                    </Button>
                    <Button style={{...pieceButton, ...style65}}>
                    </Button>
                    <Button style={{...pieceButton, ...style66}}>
                    </Button>
                    <Button style={{...pieceButton, ...style67}}>
                    </Button>
                    <Button style={{...pieceButton, ...style68}}>
                    </Button>
                    <Button style={{...pieceButton, ...style69}}>
                    </Button>
                    <Button style={{...pieceButton, ...style70}}>
                    </Button>
                    <Button style={{...pieceButton, ...style71}}>
                    </Button>
                    <Button style={{...pieceButton, ...style72}}>
                    </Button>
                    <Button style={{...pieceButton, ...style73}}>
                    </Button>
                    <Button style={{...pieceButton, ...style74}}>
                    </Button>
                    <Button style={{...pieceButton, ...style75}}>
                    </Button>
                    <Button style={{...pieceButton, ...style76}}>
                    </Button>
                    <Button style={{...pieceButton, ...style77}}>
                    </Button>
                    <Button style={{...pieceButton, ...style78}}>
                    </Button>
                    <Button style={{...pieceButton, ...style79}}>
                    </Button>
                    <Button style={{...pieceButton, ...style80}}>
                    </Button>
                    <Button style={{...pieceButton, ...style81}}>
                    </Button>
                    <Button style={{...pieceButton, ...style82}}>
                    </Button>
                    <Button style={{...pieceButton, ...style83}}>
                    </Button>
                    <Button style={{...pieceButton, ...style84}}>
                    </Button>
                    <Button style={{...pieceButton, ...style85}}>
                    </Button>
                    <Button style={{...pieceButton, ...style86}}>
                    </Button>
                    <Button style={{...pieceButton, ...style87}}>
                    </Button>
                    <Button style={{...pieceButton, ...style88}}>
                    </Button>
                    <Button style={{...pieceButton, ...style89}}>
                    </Button>
                    <Button style={{...pieceButton, ...style90}}>
                    </Button>
                    <Button style={{...pieceButton, ...style91}}>
                    </Button>
                    <Button style={{...pieceButton, ...style92}}>
                    </Button>
                    <Button style={{...pieceButton, ...style93}}>
                    </Button>
                    <Button style={{...pieceButton, ...style94}}>
                    </Button>
                    <Button style={{...pieceButton, ...style95}}>
                    </Button>
                    <Button style={{...pieceButton, ...style96}}>
                    </Button>

                </div>

            </div>
        )
    }
}

export default withRouter(/**withStyles(styles)





 */(Gameboard));



