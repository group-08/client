import React, { Component } from "react";
import AppRouter from "./components/shared/routers/AppRouter";
import HttpsRedirect from 'react-https-redirect';

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 */
class App extends Component {
  render() {
    return (
      <div>
        <HttpsRedirect>
            <AppRouter />
        </HttpsRedirect>
      </div>
    );
  }
}

export default App;
