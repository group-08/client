import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SnackbarProvider } from 'notistack';

/**
 * This is the entry point of your React application where the root element is in the public/index.html.
 * We call this a “root” DOM node because everything inside it will be managed by React DOM.
 * Applications built with just React usually have a single root DOM node.
 * More: https://reactjs.org/docs/rendering-elements.html
 */
ReactDOM.render(
	<SnackbarProvider
		maxSnack={1}
		autoHideDuration={5000}
		anchorOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
	>
		<App />
	</SnackbarProvider>
	, document.getElementById("root"));
