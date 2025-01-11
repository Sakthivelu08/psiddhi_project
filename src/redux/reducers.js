import { counterSlice } from "./counterSlice";

const rootReducer = {
    counter: counterSlice.reducer
}

export default rootReducer;