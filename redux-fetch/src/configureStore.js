"use strict";
/**
 * Created by maxim on 12.08.18.
 */
import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import rootReducer from "./reducers";

const loggerMiddleware = createLogger();

export default function configureStore (preloadedState) {
	return createStore(
		rootReducer,
		preloadedState,
		applyMiddleware(
			thunkMiddleware,
			loggerMiddleware
		)
	)
}