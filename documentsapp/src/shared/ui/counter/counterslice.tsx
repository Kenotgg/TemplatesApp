import { createSlice } from "@reduxjs/toolkit";
export const counterSlice = createSlice({ //Reducer
    name: 'counter',
    initialState:{//Bank - по аналогии с реальным банком
        value: 0,
    },
    reducers:{
        increment: (state) => { //Исполнение комманды by Reducer
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

export const {increment, decrement, incrementByAmount} = counterSlice.actions
export default counterSlice.reducer;