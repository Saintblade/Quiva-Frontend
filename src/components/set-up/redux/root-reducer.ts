"use client";
import { combineReducers } from "redux";
// import ToogleModalReducer from "../../Redux/ToggleModal";

export const rootReducer = combineReducers({
	// toggleModal: ToogleModalReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
