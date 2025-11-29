import { createSlice } from "@reduxjs/toolkit";
import type { Message } from "../../types/type";
import { getMessageThunk, sendMessageThunk } from "./message.thunk";
// import { getMessageThunk, sendMessageThunk } from "./message.thunk";

export interface MessageState {
  buttonLoading: boolean;
  screenLoading: boolean;
  messages: Message[] | null;
}

const initialState: MessageState = {
  buttonLoading: false,
  screenLoading: false,
  messages: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setNewMessage: (state, action) => {
      const oldMessages = state.messages ?? [];
      state.messages = [...oldMessages, action.payload];
    },
  },
  extraReducers: (builder) => {
    // send Messages
    // send message
    builder.addCase(sendMessageThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      console.log(action.payload, "sendMessageSlice");

      const oldMessages = state.messages ?? [];
      state.messages = [...oldMessages, action.payload?.responseData];
      state.buttonLoading = false;
    });
    builder.addCase(sendMessageThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    // get Messages
    builder.addCase(getMessageThunk.pending, (state) => {
      state.buttonLoading = true;
      state.screenLoading = true;
    });
    builder.addCase(getMessageThunk.fulfilled, (state, action) => {
      //   console.log(action.payload.responseData, "getMessageSlice");
      state.messages = action.payload?.responseData?.messages;
      state.screenLoading = false;
      state.buttonLoading = false;
    });
    builder.addCase(getMessageThunk.rejected, (state) => {
      state.buttonLoading = false;
      state.screenLoading = false;
    });
  },
});

export const { setNewMessage } = messageSlice.actions;

export default messageSlice.reducer;
