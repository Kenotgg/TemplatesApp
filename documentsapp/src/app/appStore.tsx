// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import {createStore} from 'redux';

// const defaultState = {
//     cash: 0,
// }
// export default function Store(){
// // action = {type: "", payload: "?"}
// const reducer = (state = defaultState, action: any) => {
//     switch (action.type){
//         case "ADD_CASH":
//             return{...state, cash: state.cash + action.payload}
//         case "GET_CASH":
//             return { ...state, cash: state.cash - action.payload}
//         default:
//             return state;
//     }
// }

// const store = createStore(reducer);


//     return(
//         <Provider store={store}></Provider> // Почему здесь такая конструкция и зачем она?
//     )
// }

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/features/counter/counterslice";
export default configureStore({
    reducer: {
        counter: counterReducer,
    },
})
