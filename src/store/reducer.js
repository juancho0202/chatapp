import * as actionTypes from './actions';
import { stat } from 'fs';

const initialState = {
    username: 'guest0001',
    message: '',
    messages: [],
    settings:{
        color: 'light',
        clock24: true,
        onenter: true,
    }
}

const reducer = (state= initialState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_COLOR: 
            return {
                ...state,
                settings: {
                    ... state.settings,
                    color: action.color
                }
            };
        case actionTypes.CHANGE_ON_ENTER_PROP:
            return {
                ...state,
                settings: {
                    ... state.settings,
                    onenter: action.onenter
                }
            };
        case actionTypes.CHANGE_TIME_FORMAT:
            return {
                ...state,
                settings: {
                    ... state.settings,
                    clock24: action.clock24
                }
            };
        case actionTypes.CHANGE_USERNAME:
            return {
                ...state,
                username: action.username
            };
        case actionTypes.RESET_DEFAULT:
            return {
                ...state,
                username: 'guest0001',
                settings: {
                    color: 'light',
                    clock24: true,
                    onenter: true,
                }
            };
        case actionTypes.ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.data]
            };
        case actionTypes.SET_CURRENT_MESSAGE:
            return {
                ...state,
                message: action.message
            };
        default: 
            return state;
    }
};

export default reducer;