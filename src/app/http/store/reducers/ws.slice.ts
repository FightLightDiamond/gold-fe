import {createSlice, PayloadAction} from "@reduxjs/toolkit";
interface IInitialState {
  socket: any,
}

const initialState: IInitialState = {
  socket: null
}

export const wsSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    connect(state, action: PayloadAction<string>) {
      alert('Cn' + action.payload)
    },
    wsDisconnect(state, action: PayloadAction<string>) {
      alert('Ds' + action.payload)
    },
  }
})

export const {
  connect,
  wsDisconnect,
} = wsSlice.actions

export default wsSlice.reducer
