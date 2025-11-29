import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Message } from "../../types/type";
import { api } from "../../api/axios";

export const sendMessageThunk = createAsyncThunk(
  "user/sendMessage",
  async ({ receiverId, message }: Message, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/user/send/${receiverId}`, {
        message,
      });
      console.log(response, "sendMessageThunk");
      return response.data;
    } catch (error: any) {
      console.error(error);
      const errorOutput = error?.response?.data?.message;
      return rejectWithValue(errorOutput);
    }
  }
);

export const getMessageThunk = createAsyncThunk(
  "user/getMessage",
  async ({ receiverId }: Message, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/user/getMessage/${receiverId}`);
      //   console.log(response, "getMessageThunk");
      return response.data;
    } catch (error: any) {
      console.error(error);
      const errorOutput = error?.response?.data?.message;
      return rejectWithValue(errorOutput);
    }
  }
);
