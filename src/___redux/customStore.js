import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { MakeStore, createWrapper } from "next-redux-wrapper";
import { reducer, State } from "./customReducer";

export const makeStore = (context) =>
  createStore(reducer, applyMiddleware(logger));

export const wrapper = createWrapper(makeStore, { debug: true });
