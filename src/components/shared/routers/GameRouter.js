import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Lobby from "../../game/Lobby";
import GameLobby from "../../game/GameLobby";
import Gameboard from "../../game/Gameboard";
import {LoginGuard} from "../routeProtectors/LoginGuard";
import Leaderboard from "../../game/Leaderboard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class GameRouter extends React.Component {
  render() {
    /**
     * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    return (
      <Container>
        <Route
          exact
          path={`${this.props.base}/lobby`}
          render={() => <Lobby />}
        />

        <Route
          exact
          path={`${this.props.base}`}
          render={() => <Redirect to={`${this.props.base}/lobby`} />}
        />
        <Route
            exact
            path={`${this.props.base}/game/lobby`}
            render={() => <GameLobby />}
        />
          <Route
              exact
              path={`${this.props.base}/game`}
              render={() => (
                      <Gameboard />
              )}
          />
          <Route
              exact
              path={`${this.props.base}/leaderboard`}
              render={() => (
                      <Leaderboard />
              )}
          />
      </Container>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default GameRouter;
