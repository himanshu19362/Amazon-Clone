import React , { createContext , useContext , useReducer } from "react";

//Prepares the data layer . 
export const StateContext = createContext()

//Wrap the app component so that all components inside it can access data from data layer .
export const StateProvider = ({reducer , initialState , children}) => (
    <StateContext.Provider value={useReducer(reducer , initialState)} >
        {children}
    </StateContext.Provider>
)

//
export const useStateValue = () => useContext(StateContext)