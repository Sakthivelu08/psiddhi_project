import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
    isEven: true
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
            state.isEven = state.value % 2 === 0;
        },
        decrement: (state) => {
            state.value -= 1;
            state.isEven = state.value % 2 === 0;
        },
        reset: (state) => {
            state.value = 0;
            state.isEven = true;
        },
        setValue: (state, action) => {
            state.value = action.payload;
            state.isEven = state.value % 2 === 0;
        }
    }
});

export const { increment, decrement, reset, setValue } = counterSlice.actions;

export const selectCount = state => state.counter.value;
export const selectIsEven = (state) => state.counter.isEven;